import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({

  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  fullName:{
    type:String,
    default: null,
  },
  DOB:{
    type: String,
    defualt:null,
  },
  gender:{
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

  selfieUrl:{
    type:String,
    default: null,
  },
  RCFront:{
    type:String,
    default:null,
  },
  RCBack:{
    type:String,
    default:null,
  },
  vehicleNo:{
    type:String,
    default:null,
  },
  aadharUrl:{ type: String,
     default: null 
    },
  aadharNo:{ type: String, 
    default: null 
  },
  panUrl:{ type: String,
     default: null 
    },
  panNo:{ type: String, 
    default: null 
  },

},
 {
  timestamps: true,
});

export default mongoose.model(
  "Captain",
  captainSchema
);