import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({

  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  vehicleType:{
    type:String,
    required: true,
  },

  serviceType:{
    type:String,
    required: true,
  },

  drivingLicenceFront:{
    type: String,
    default: null,

  },

  drivingLicenceBack:{
    type: String,
    default: null,

  },

  drivingLicenceNo:{
    type:String
  },

  name:{
    type: String,
  },
},
 {
  timestamps: true,
});

export default mongoose.model(
  "Captain",
  captainSchema
);