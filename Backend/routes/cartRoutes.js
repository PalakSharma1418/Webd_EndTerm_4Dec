const express = require("express");
const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Get current cart
router.get("/", protect, authorize("customer"), async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ customer: req.user._id }).populate("items.menuItem");
    res.json(cart || { items: [] });
  } catch (err) {
    next(err);
  }
});

// Add item to cart
router.post("/add", protect, authorize("customer"), async (req, res, next) => {
  try {
    const { menuItemId, quantity } = req.body;
    const item = await MenuItem.findById(menuItemId).populate("restaurant");
    if (!item) return res.status(404).json({ message: "Menu item not found" });

    let cart = await Cart.findOne({ customer: req.user._id });

    // If no cart -> create new
    if (!cart) {
      cart = await Cart.create({
        customer: req.user._id,
        restaurant: item.restaurant._id,
        items: [{ menuItem: item._id, quantity }]
      });
    } else {
      // Ensure one restaurant per cart
      if (cart.restaurant.toString() !== item.restaurant._id.toString()) {
        return res.status(400).json({
          message: "Cart already has items from another restaurant"
        });
      }
      const existing = cart.items.find(
        (i) => i.menuItem.toString() === item._id.toString()
      );
      if (existing) existing.quantity += quantity;
      else cart.items.push({ menuItem: item._id, quantity });
      await cart.save();
    }

    const populated = await cart.populate("items.menuItem");
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

// Remove item
router.delete("/item/:menuItemId", protect, authorize("customer"), async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ customer: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.menuItem.toString() !== req.params.menuItemId
    );
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// Clear cart
router.delete("/", protect, authorize("customer"), async (req, res, next) => {
  try {
    await Cart.findOneAndDelete({ customer: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
