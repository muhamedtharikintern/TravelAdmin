import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import authMiddleware from "../middleware/authMiddleware.js";
import bcrypt from "bcrypt";  

const router = express.Router();



router.post('/user-register', async (req, res) => {

  try {

    const { username,email,password } = req.body;

    if (!username || !password || !password) {

      return res.status(400).json({

        success: false,

        message: 'Username, Email and Password are required',

      });

    }



    const existingUser = await User.findOne({ username });



    if (existingUser) {

      return res.status(409).json({

        success: false,

        message: 'User already exists',

      });

    }



    const hashedPassword = await bcrypt.hash(password, 10);



    const user = await User.create({

      username,
      email,
      password: hashedPassword,

    });



    res.status(201).json({

      success: true,

      message: 'User registered successfully',

      user: {

        id: user._id,

        username: user.username,
        email: user.email

      },

    });

  } catch (error) {

    console.log(error);



    res.status(500).json({

      success: false,

      message: 'Server Error',

    });

  }

});





router.post('/user-login', async (req, res) => {

  try {

    const { username, password } = req.body;


    const user = await User.findOne({ username });



    if (!user) {

      return res.status(401).json({

        success: false,

        message: 'Invalid Username',

      });

    }



    const isMatch = await bcrypt.compare(

      password,

      user.password

    );



    if (!isMatch) {

      return res.status(401).json({

        success: false,

        message: 'Invalid Password',

      });

    }



     const token = jwt.sign(
       { userId: user._id },
       process.env.JWT_SECRET,
       { expiresIn: "20d" }
     );



    res.status(200).json({

      success: true,
      message: 'Login Successful',
      token,
      user: {
        id: user._id,
        username: user.username,

      },

    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
});


export default router;