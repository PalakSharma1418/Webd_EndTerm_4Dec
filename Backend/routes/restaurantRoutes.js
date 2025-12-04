const express = require("express");
const Restaurant = require("../models/Restaurant");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Create restaurant (vendor or admin)
router.post("/", protect, authorize("vendor", "admin"), async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      vendor: req.user._id
    };
    const restaurant = await Restaurant.create(data);
    res.status(201).json(restaurant);
  } catch (err) {
    next(err);
  }
});

// Get all active restaurants
router.get("/", async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({ isActive: true });
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
});

// Get single restaurant
router.get("/:id", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    next(err);
  }
});

// Update restaurant (owner vendor or admin)
router.put("/:id", protect, authorize("vendor", "admin"), async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Not found" });

    // if vendor, ensure owns this restaurant
    if (req.user.role === "vendor" && restaurant.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your restaurant" });
    }

    Object.assign(restaurant, req.body);
    await restaurant.save();
    res.json(restaurant);
  } catch (err) {
    next(err);
  }
});

// Delete restaurant (admin only)
router.delete("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: "Restaurant deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
