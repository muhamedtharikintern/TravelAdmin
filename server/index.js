import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import app from "./src/app.js";
import { connectToDatabase } from "./db.js";
import { notifyCaptainsOfNewOrder } from "./src/utils/notifyCaptains.js";

dotenv.config();

const port = parseInt(process.env.PORT || "4000", 10);
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.set("io", io);

// ---- Redis clients ----
const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const pubClient = createClient({ url: redisUrl });
const subClient = pubClient.duplicate();

pubClient.on("error", (err) => console.error("Redis pubClient error:", err));
subClient.on("error", (err) => console.error("Redis subClient error:", err));

async function setupRedis() {
  await Promise.all([pubClient.connect(), subClient.connect()]);
  io.adapter(createAdapter(pubClient, subClient));
  console.log("✅ Redis adapter connected");
}

// ---- Presence keys ----
const CAPTAIN_PREFIX = "captain:";
const USER_PREFIX = "user:";

// ---- Captain presence helpers ----
async function registerCaptain(captainId, socketId, vehicleType) {
  await pubClient.hSet(`${CAPTAIN_PREFIX}${captainId}`, {
    socketId,
    vehicleType,
  });
}

async function getCaptain(captainId) {
  const data = await pubClient.hGetAll(`${CAPTAIN_PREFIX}${captainId}`);
  return Object.keys(data).length ? data : null;
}

async function removeCaptainBySocketId(socketId) {
  const keys = await pubClient.keys(`${CAPTAIN_PREFIX}*`);
  for (const key of keys) {
    const data = await pubClient.hGetAll(key);
    if (data.socketId === socketId) {
      await pubClient.del(key);
      return key.replace(CAPTAIN_PREFIX, "");
    }
  }
  return null;
}

async function getAllCaptains() {
  const keys = await pubClient.keys(`${CAPTAIN_PREFIX}*`);
  const result = {};
  for (const key of keys) {
    const captainId = key.replace(CAPTAIN_PREFIX, "");
    result[captainId] = await pubClient.hGetAll(key);
  }
  return result;
}

// ---- User presence helpers ----
async function registerUser(userId, socketId) {
  await pubClient.set(`${USER_PREFIX}${userId}`, socketId);
}

async function getUserSocketId(userId) {
  return await pubClient.get(`${USER_PREFIX}${userId}`);
}

async function removeUserBySocketId(socketId) {
  const keys = await pubClient.keys(`${USER_PREFIX}*`);
  for (const key of keys) {
    const val = await pubClient.get(key);
    if (val === socketId) {
      await pubClient.del(key);
      return key.replace(USER_PREFIX, "");
    }
  }
  return null;
}

// expose helpers so other files (routes/controllers) can use them via req.app.get(...)
app.set("redis", pubClient);
app.set("getAllCaptains", getAllCaptains);
app.set("getCaptain", getCaptain);
app.set("getUserSocketId", getUserSocketId);

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("user:register", async (userId) => {
    try {
      await registerUser(userId, socket.id);
      console.log("User registered:", userId);
    } catch (err) {
      console.error("user:register error:", err);
    }
  });

  socket.on("captain:register", async ({ captainId, vehicleType }) => {
    try {
      await registerCaptain(captainId, socket.id, vehicleType);
      console.log(`✅ Captain registered: ${captainId} | vehicleType: ${vehicleType}`);
    } catch (err) {
      console.error("captain:register error:", err);
    }
  });

  socket.on("join_order", (orderId) => {
    socket.join(`order:${orderId}`);
    console.log("Joined order room:", orderId);
  });

  socket.on("user:book_order", async (orderData) => {
    try {
      const { customerId, pickupLocation, dropLocation, vehicleType, amount, distance } = orderData;
      const Order = (await import("./src/models/order.js")).default;
      const order = await Order.create({
        userId: customerId,
        pickupLocation,
        dropLocation,
        vehicleType,
        amount,
        distance,
        status: "pending",
      });

      const allCaptains = await getAllCaptains();
      notifyCaptainsOfNewOrder(io, allCaptains, order);

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
        orderId,
        { captainId, status: "accepted" },
        { new: true }
      );
      io.to(`order:${orderId}`).emit("user:order_accepted", {
        orderId,
        captainId,
        status: "accepted",
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

  socket.on("disconnect", async () => {
    try {
      const captainId = await removeCaptainBySocketId(socket.id);
      if (captainId) console.log("Captain disconnected:", captainId);

      const userId = await removeUserBySocketId(socket.id);
      if (userId) console.log("User disconnected:", userId);
    } catch (err) {
      console.error("disconnect cleanup error:", err);
    }
  });
});

async function start() {
  try {
    await connectToDatabase(process.env.MONGODB_URI);
    await setupRedis();
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