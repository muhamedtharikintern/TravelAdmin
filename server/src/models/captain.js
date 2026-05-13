import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({

  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },

  name:{
    type: String,
    required: true,
  },
},
 {
  timestamps: true,
});

export default mongoose.model(
  "Captain",
  userSchema
);