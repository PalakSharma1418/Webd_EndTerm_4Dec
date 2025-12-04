const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    address: String,
    cuisine: String,
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
    avgRating: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
