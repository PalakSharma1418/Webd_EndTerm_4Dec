const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"],
      default: "pending"
    },
    deliveryPerson: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deliveryAddress: { type: String, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
