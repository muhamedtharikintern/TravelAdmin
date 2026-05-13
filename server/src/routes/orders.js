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

export default router;