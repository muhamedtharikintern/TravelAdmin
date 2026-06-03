import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({

  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  name:{
    type:String,
    default: null,
  },

  vehicleType:{
    type:String,
    default: null,
  },

  City:{
    type:String,
    default:null,
  },

  serviceType:{
    type:String,
    default: null,
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
    type:String,
    default: null,
  },

  selfie:{
    type:String,
    default: null,
  }

},
 {
  timestamps: true,
});

export default mongoose.model(
  "Captain",
  captainSchema
);