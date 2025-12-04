const express = require("express");
const MenuItem = require("../models/MenuItem");
const Restaurant = require("../models/Restaurant");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Create menu item (vendor/admin)
router.post("/", protect, authorize("vendor", "admin"), async (req, res, next) => {
  try {
    const { restaurant, name, description, price, category } = req.body;
    const rest = await Restaurant.findById(restaurant);
    if (!rest) return res.status(404).json({ message: "Restaurant not found" });

    // vendor must own restaurant
    if (req.user.role === "vendor" && rest.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your restaurant" });
    }

    const item = await MenuItem.create({ restaurant, name, description, price, category });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

// Get menu for a restaurant
router.get("/restaurant/:restaurantId", async (req, res, next) => {
  try {
    const items = await MenuItem.find({
      restaurant: req.params.restaurantId,
      isAvailable: true
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// Update menu item
router.put("/:id", protect, authorize("vendor", "admin"), async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id).populate("restaurant");
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (req.user.role === "vendor" &&
        item.restaurant.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your restaurant" });
    }

    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// Delete menu item
router.delete("/:id", protect, authorize("vendor", "admin"), async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id).populate("restaurant");
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (req.user.role === "vendor" &&
        item.restaurant.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your restaurant" });
    }

    await item.deleteOne();
    res.json({ message: "Item deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
