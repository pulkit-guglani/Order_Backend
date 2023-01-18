const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
    },
  ],
  orderStatus: { type: String, required: true },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      isAvailable: { type: Boolean, required: true },
    },
  ],
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true, unique: true },
  credentials: { type: { chef: String, operator: String }, required: true },
  orders: { type: [orderSchema] },
  menu: [categorySchema],
  latestOrderNumber: { type: Number, default: 1 },
});

module.exports = mongoose.model("restaurant", restaurantSchema);
