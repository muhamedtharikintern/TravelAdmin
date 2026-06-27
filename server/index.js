import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import { connectToDatabase } from "./db.js";

dotenv.config();

const port = parseInt(process.env.PORT || "4000", 10);
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.set("io", io);

const connectedCaptains = {};  // { captainId: { socketId, vehicleType } }
const connectedUsers = {};

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("user:register", (userId) => {
    connectedUsers[userId] = socket.id;
    console.log("User registered:", userId);
  });

  // ✅ Fix 1: Store vehicleType with captainId
  socket.on("captain:register", ({ captainId, vehicleType }) => {
    connectedCaptains[captainId] = { socketId: socket.id, vehicleType };
    console.log(`✅ Captain registered: ${captainId} | vehicleType: ${vehicleType}`);
    console.log("All captains:", JSON.stringify(connectedCaptains));
  });

  socket.on("join_order", (orderId) => {
    socket.join(`order:${orderId}`);
    console.log("Joined order room:", orderId);
  });

  socket.on("user:book_order", async (orderData) => {
    try {
      const { customerId, pickupLocation, dropLocation, vehicleType, amount, distance } = orderData;

      console.log(`📦 New order | vehicleType: ${vehicleType}`);
      console.log("Connected captains:", JSON.stringify(connectedCaptains));

      const Order = (await import("./src/models/order.js")).default;
      const order = await Order.create({
        customerId, pickupLocation, dropLocation,
        vehicleType, amount, distance, status: "pending",
      });

      // ✅ Fix 2: Send only to captains with matching vehicleType
      let sentCount = 0;
      for (const [captainId, captain] of Object.entries(connectedCaptains)) {
        console.log(`Checking captain ${captainId}: ${captain.vehicleType} === ${vehicleType}?`);
        if (captain.vehicleType === vehicleType) {
          io.to(captain.socketId).emit("captain:new_order", {
            orderId: order._id,
            customerId,
            pickupLocation,
            dropLocation,
            vehicleType,
            amount,
            distance,
          });
          sentCount++;
          console.log(`✅ Order sent to captain: ${captainId} (${captain.vehicleType})`);
        }
      }

      console.log(`📨 Order sent to ${sentCount} captain(s)`);

      socket.emit("user:order_created", { success: true, orderId: order._id });

    } catch (error) {
      console.log("Order error:", error);
      socket.emit("user:order_created", { success: false, message: "Order failed" });
    }
  });

  socket.on("captain:accept_order", async ({ orderId, captainId }) => {
    try {
      const Order = (await import("./src/models/order.js")).default;
      const order = await Order.findByIdAndUpdate(
        orderId, { captainId, status: "accepted" }, { new: true }
      );
      io.to(`order:${orderId}`).emit("user:order_accepted", {
        orderId, captainId, status: "accepted",
      });
      socket.emit("captain:accept_confirmed", { success: true, order });
    } catch (error) {
      console.log("Accept error:", error);
    }
  });

  socket.on("captain:update_status", async ({ orderId, status }) => {
    try {
      const Order = (await import("./src/models/order.js")).default;
      await Order.findByIdAndUpdate(
        orderId,
        { status, ...(status === "completed" ? { completedAt: new Date() } : {}) },
        { new: true }
      );
      io.to(`order:${orderId}`).emit("user:order_status", { orderId, status });
    } catch (error) {
      console.log("Status update error:", error);
    }
  });

  socket.on("disconnect", () => {
    for (const [captainId, captain] of Object.entries(connectedCaptains)) {
      if (captain.socketId === socket.id) {
        delete connectedCaptains[captainId];
        console.log("Captain disconnected:", captainId);
      }
    }
    for (const [userId, socketId] of Object.entries(connectedUsers)) {
      if (socketId === socket.id) {
        delete connectedUsers[userId];
        console.log("User disconnected:", userId);
      }
    }
  });
});

async function start() {
  try {
    await connectToDatabase(process.env.MONGODB_URI);
    server.listen(port, "0.0.0.0", () => {
      console.log(`API listening on http://0.0.0.0:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== "production") {
  start();
}

export default app;