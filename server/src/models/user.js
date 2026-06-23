import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

  {

    username: {

      type: String,

      required: true,

      unique: true,

      trim: true,

    },

    email:{
        type : String,
        required: null,
    },


    password: {

      type: String,

      required: true,

    },

  },

  {

    timestamps: true,

  }

);



export default mongoose.model('users', userSchema);