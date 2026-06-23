import express from "express";
import jwt from "jsonwebtoken";
import users from "../models/users.js";
import authMiddleware from "../middleware/authMiddleware.js";
import bcrypt from "bcrypt";  

const router = express.Router();



router.post('/user-register', async (req, res) => {

  try {

    const { usersname, password } = req.body;

    if (!usersname || !password) {

      return res.status(400).json({

        success: false,

        message: 'usersname and Password are required',

      });

    }



    const existingusers = await users.findOne({ usersname });



    if (existingusers) {

      return res.status(409).json({

        success: false,

        message: 'users already exists',

      });

    }



    const hashedPassword = await bcrypt.hash(password, 10);



    const users = await users.create({

      usersname,

      password: hashedPassword,

    });



    res.status(201).json({

      success: true,

      message: 'users registered successfully',

      users: {

        id: users._id,

        usersname: users.usersname,

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

    const { usersname, password } = req.body;


    const users = await users.findOne({ usersname });



    if (!users) {

      return res.status(401).json({

        success: false,

        message: 'Invalid usersname',

      });

    }



    const isMatch = await bcrypt.compare(

      password,

      users.password

    );



    if (!isMatch) {

      return res.status(401).json({

        success: false,

        message: 'Invalid Password',

      });

    }



     const token = jwt.sign(
       { usersId: users._id },
       process.env.JWT_SECRET,
       { expiresIn: "7d" }
     );



    res.status(200).json({

      success: true,
      message: 'Login Successful',
      token,
      users: {
        id: users._id,
        usersname: users.usersname,

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