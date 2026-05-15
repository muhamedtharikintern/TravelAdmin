import express from "express";
import jwt from "jsonwebtoken";

import authMiddleware from "../middleware/authMiddleware.js";
import order from "../models/order.js";

const router = express.Router();

router.post(
    "/create-order",
    async(req,res) =>{

        try{
            const{
                pickupLocation,
                dropLocation,
                vehicleType,
            } = req.body

         if (!pickupLocation || ! dropLocation) {
            return res.status(400).json({
            success: false,
            message: "Location details required",
            });
        }
        // create the order

        const newOrder = await order.create({
            pickupLocation,
            dropLocation,
            status: "pending",
        })

        return res.status(201).json({
        success: true,
        message: "Order created successfully",
        order: newOrder,

      });

        }catch (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Server Error",
            });
    }

    }
);

router.get(
  "/pending-orders",
  async (req, res) => {

    try {

      // FIND PENDING ORDERS
      const orders =
        await order.find({
          status: "pending",
        }).sort({
          createdAt: -1,
        });

      return res.status(200).json({

        success: true,

        orders,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message: "Server Error",

      });

    }

  }
);

router.post(
  "/accept-order",
  async (req, res) => {

    try {

      const {
        orderId,
        captainId,
      } = req.body;

      // VALIDATION
      if (
        !orderId ||
        !captainId
      ) {

        return res.status(400).json({

          success: false,

          message: "Order ID and Captain ID required",

        });

      }

      // FIND ORDER
      const order =
        await Order.findById(orderId);

      // CHECK ORDER
      if (!order) {

        return res.status(404).json({

          success: false,

          message: "Order not found",

        });

      }

      // CHECK IF ALREADY ACCEPTED
      if (
        order.status !== "pending"
      ) {

        return res.status(400).json({

          success: false,

          message: "Order already accepted",

        });

      }

      // UPDATE ORDER
      order.status = "accepted";

      order.captainId = captainId;

      await order.save();

      return res.status(200).json({

        success: true,

        message: "Order accepted successfully",

        order,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message: "Server Error",

      });

    }

  }
);

export default router;