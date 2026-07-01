import Order from "../models/order.js";
import { notifyCaptainsOfNewOrder } from "../utils/notifyCaptains.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    const io = req.app.get("io");

    const getAllCaptains = req.app.get("getAllCaptains");
    const connectedCaptains = await getAllCaptains(); // fetch fresh from Redis

    notifyCaptainsOfNewOrder(io, connectedCaptains, order);
    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error("❌ createOrder error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addTip = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { tip } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { tip }, { new: true });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error("❌ addTip error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error("❌ getOrder error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const { orderId, captainId } = req.body;
    if (!orderId || !captainId) {
      return res.status(400).json({ success: false, message: "orderId and captainId required" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (order.status !== "pending") {
      return res.status(409).json({ success: false, message: "Order already taken" });
    }

    order.captainId = captainId;
    order.status = "accepted";
    await order.save();

    const io = req.app.get("io");

    const getUserSocketId = req.app.get("getUserSocketId");
    const userSocketId = await getUserSocketId(String(order.userId)); // fetch from Redis

    if (userSocketId) {
      io.to(userSocketId).emit("user:order_accepted", {
        orderId: order._id,
        captainId,
        status: "accepted",
      });
    }

    io.to(`order:${orderId}`).emit("user:order_accepted", {
      orderId: order._id,
      captainId,
      status: "accepted",
    });

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("❌ acceptOrder error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};