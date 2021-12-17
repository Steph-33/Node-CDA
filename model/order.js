const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [],
  total: Number,
  deliveryAddress: {}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
