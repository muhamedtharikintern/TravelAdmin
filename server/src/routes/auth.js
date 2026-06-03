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

router.post(
  "/update-city",
  authMiddleware,
  async (req, res) => {
    try {
      const { City } = req.body;

      if (!City) {
        return res.status(400).json({
          success: false,
          message: "City required",
        });
      }

      const user =
        await User.findByIdAndUpdate(
          req.userId, // ✅ use this
          { City },
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
        message: "City updated",
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
        req.userId,
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

router.post("/update-service",authMiddleware,
  async (req,res) =>{
    try{
      const {
        serviceType
      } = req.body;

      const user = await User.findByIdAndUpdate(
        req.userId,
        {
          serviceType
        },
        { new: true}
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Service type updated",
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
)


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
        req.userId,
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

router.post("/upload-selfie",authMiddleware,async (req,res) =>{
      try{
        const {selfieUrl} = req.body;

        const user = await  User.findByIdAndUpdate(
          req.userId,{selfieUrl},{new: true}
        );

        if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
        return res.status(200).json({
        success: true,
        message: "Selfie uploaded successfully",
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

router.post('/edit-profile',authMiddleware,async (req,res)=>{
  try{
    const{
      fullName,
      DOB,
      gender,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        fullName,
        DOB,
        gender,
      },
      {new:true}
    );

     if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
        return res.status(200).json({
        success: true,
        message: "Selfie uploaded successfully",
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

router.post("/upload-rcdetails",authMiddleware, async (req, res) => {
    try {
      const {
        RCFront,
        RCBack,
        vehicleNo,
      } = req.body;

      const user = await User.findByIdAndUpdate(
        req.userId,
        {
          RCFront,
          RCBack,
          vehicleNo,
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
        message: "Vehicle Details uploaded successfully",
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
    // ✅ Disable caching
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');

    const user = await User.findById(req.userId); // ✅ fresh from DB
    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});


export default router;