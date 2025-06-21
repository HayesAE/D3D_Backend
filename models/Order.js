const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  createdAt: { type: Date, default: Date.now },
  customerEmail: String
});
module.exports = mongoose.model('Order', orderSchema);