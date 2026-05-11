import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },

  name:{
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "captain",
  },

}, {
  timestamps: true,
});

export default mongoose.model(
  "User",
  userSchema
);