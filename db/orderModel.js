const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash on Delivery'],
  },
  deliveryAddress: {
    type: String, 
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'pending',
    enum: ['pending', 'processing', 'completed'],
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
