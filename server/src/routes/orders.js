import express from "express";
import {
  createOrder,
  addTip,
  getOrder,
  acceptOrder,
} from "../controller/orderController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.patch("/:orderId/add-tip", addTip);
router.get("/:orderId", getOrder);
router.post("/accept-order", acceptOrder);

export default router;