const express = require("express");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Delivery = require("../models/Delivery");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Create order from cart
router.post("/", protect, authorize("customer"), async (req, res, next) => {
  try {
    const { deliveryAddress } = req.body;
    const cart = await Cart.findOne({ customer: req.user._id }).populate("items.menuItem");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = cart.items.map((ci) => ({
      menuItem: ci.menuItem._id,
      quantity: ci.quantity,
      price: ci.menuItem.price
    }));

    const totalPrice = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const order = await Order.create({
      customer: req.user._id,
      restaurant: cart.restaurant,
      items,
      totalPrice,
      deliveryAddress
    });

    // clear cart after order
    await Cart.deleteOne({ _id: cart._id });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// Get customer orders
router.get("/my", protect, authorize("customer"), async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate("restaurant")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// Vendor: get orders for their restaurant(s)
router.get("/vendor", protect, authorize("vendor"), async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("restaurant")
      .populate("customer");

    const filtered = orders.filter(
      (o) => o.restaurant.vendor.toString() === req.user._id.toString()
    );

    res.json(filtered);
  } catch (err) {
    next(err);
  }
});

// Delivery: accept order (very basic)
router.post("/:id/assign", protect, authorize("delivery"), async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const delivery = await Delivery.create({
      order: order._id,
      deliveryPerson: req.user._id
    });

    order.status = "out_for_delivery";
    order.deliveryPerson = req.user._id;
    await order.save();

    res.json({ order, delivery });
  } catch (err) {
    next(err);
  }
});


// Payment placeholder route – simulate payment success
router.post("/:id/pay", protect, authorize("customer"), async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your order" });
    }

    // Here you’d integrate Stripe/Razorpay etc.
    order.paymentStatus = "paid";
    order.status = "confirmed";
    await order.save();

    res.json({ message: "Payment simulated as successful", order });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
