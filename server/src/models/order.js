import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  captainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Captain',
  },

  pickupLocation: String,

  dropLocation: String,

  vehicleType : String,

  amount: Number,

  distance: Number,

  status: {
    type: String,
    enum: [
      'pending',
      'accepted',
      'picked_up',
      'completed',
      'cancelled',
    ],
    default: 'pending',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  completedAt: Date,

});

export default mongoose.model(
  'Order',
  orderSchema
);