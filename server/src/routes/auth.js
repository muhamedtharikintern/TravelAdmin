import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/captain.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ====================== REGISTER ======================
router.post("/register", async (req, res) => {
  try {
    const { mobileNo } = req.body;

    if (!mobileNo) {
      return res.status(400).json({
        success: false,
        message: "Mobile number required",
      });
    }

    const existingUser = await User.findOne({ mobileNo });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      mobileNo,
      name,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
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
});


// ====================== LOGIN ======================
router.post("/login", async (req, res) => {
  try {
    const { mobileNo } = req.body;

    if (!mobileNo) {
      return res.status(400).json({
        success: false,
        message: "Mobile number required",
      });
    }

    const user = await User.findOne({ mobileNo });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
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
});


// ====================== UPDATE VEHICLE ======================
router.post(
  "/update-vehicle",
  authMiddleware,
  async (req, res) => {
    try {
      const { vehicleType } = req.body;

      if (!vehicleType) {
        return res.status(400).json({
          success: false,
          message: "vehicleType required",
        });
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { vehicleType },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Vehicle updated",
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


// ====================== UPLOAD LICENSE ======================
router.post(
  "/upload-license",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        drivingLicenceFront,
        drivingLicenceBack,
        drivingLicenceNo,
      } = req.body;

      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          drivingLicenceFront,
          drivingLicenceBack,
          drivingLicenceNo,
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "License uploaded successfully",
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


// ====================== GET PROFILE ======================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


export default router;