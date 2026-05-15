import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/captain.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { mobileNo, name } = req.body;

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

    const user = await User.create({ mobileNo, name });

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

// LOGIN
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

// ✅ UPLOAD LICENSE - single route for both images + license number
router.post("/upload-license", async (req, res) => {
  try {
    const {
      mobileNo,
      drivingLicenceFront,
      drivingLicenceBack,
      drivingLicenceNo,
    } = req.body;

    // validate
    if (!mobileNo) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    // find captain by mobileNo and update
    const user = await User.findOneAndUpdate(
      { mobileNo: mobileNo },           // ✅ correct field name
      {
        drivingLicenceFront: drivingLicenceFront,  // ✅ matches schema
        drivingLicenceBack: drivingLicenceBack,    // ✅ matches schema
        drivingLicenceNo: drivingLicenceNo,        // ✅ matches schema
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Captain not found",
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
});

// GET PROFILE
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;