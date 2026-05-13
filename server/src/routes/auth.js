import express from "express";
import jwt from "jsonwebtoken";

import User from "../models/captain.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// REGISTER
router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        mobileNo,
        name,
      } = req.body;

      // CHECK MOBILE NUMBER
      if (!mobileNo) {

        return res.status(400).json({
          success: false,
          message: "Mobile number required",
        });

      }

      // CHECK EXISTING USER
      const existingUser =
      await User.findOne({
        mobileNo,
      });

      // USER ALREADY EXISTS
      if (existingUser) {

        return res.status(400).json({
          success: false,
          message: "User already exists",
        });

      }

      // CREATE USER
      const user = await User.create({

        mobileNo,

        name: name || "",

      });

      // GENERATE JWT TOKEN
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(201).json({

        success: true,

        message: "Registration Success",

        token,

        user,

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


// LOGIN
router.post(
  "/login",
  async (req, res) => {

    try {

      const { mobileNo } = req.body;

      // CHECK MOBILE NUMBER
      if (!mobileNo) {

        return res.status(400).json({
          success: false,
          message: "Mobile number required",
        });

      }

      // FIND USER
      const user = await User.findOne({
        mobileNo,
      });

      // USER NOT FOUND
      if (!user) {

        return res.status(404).json({
          success: false,
          message: "User not found",
        });

      }

      // GENERATE JWT TOKEN
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({

        success: true,

        message: "Login Success",

        token,

        user,

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


// GET PROFILE
router.get(
  "/me",
  authMiddleware,
  async (req, res) => {

    try {

      const user = await User.findById(
        req.userId
      );

      return res.status(200).json({

        success: true,

        user,

      });

    } catch (error) {

      return res.status(500).json({
        success: false,
      });

    }

  }
);

export default router;