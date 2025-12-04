const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    deliveryPerson: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["assigned", "picked_up", "on_the_way", "delivered", "failed"],
      default: "assigned"
    },
    location: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);
