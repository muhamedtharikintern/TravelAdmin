import express from "express";
import Order from "../models/order.js";

const router = express.Router();

// CREATE ORDER
router.post("/create-order", async (req, res) => {
  try {
    const { customerId, pickupLocation, dropLocation, vehicleType, amount, distance } = req.body;

    if (!pickupLocation || !dropLocation) {
      return res.status(400).json({ success: false, message: "Location details required" });
    }

    const newOrder = await Order.create({
      customerId, pickupLocation, dropLocation,
      vehicleType, amount, distance, status: "pending",
    });

    const io = req.app.get("io");
    if (io) {
      io.emit("captain:new_order", {
        orderId: newOrder._id,
        customerId, pickupLocation, dropLocation,
        vehicleType, amount, distance,
      });
    }

    return res.status(201).json({ success: true, message: "Order created", order: newOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// PENDING ORDERS
router.get("/pending-orders", async (req, res) => {
  try {
    const orders = await Order.find({ status: "pending" }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ACCEPT ORDER
router.post("/accept-order", async (req, res) => {
  try {
    const { orderId, captainId } = req.body;

    if (!orderId || !captainId) {
      return res.status(400).json({ success: false, message: "orderId and captainId required" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    if (order.status !== "pending") return res.status(400).json({ success: false, message: "Order already accepted" });

    order.status = "accepted";
    order.captainId = captainId;
    await order.save();

    const io = req.app.get("io");
    if (io) {
      io.to(`order:${orderId}`).emit("user:order_accepted", {
        orderId, captainId, status: "accepted",
      });
    }

    return res.status(200).json({ success: true, message: "Order accepted", order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// UPDATE STATUS
router.post("/update-status", async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "orderId and status required" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status, ...(status === "completed" ? { completedAt: new Date() } : {}) },
      { new: true }
    );

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    const io = req.app.get("io");
    if (io) {
      io.to(`order:${orderId}`).emit("user:order_status", { orderId, status });
    }

    return res.status(200).json({ success: true, message: "Status updated", order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;