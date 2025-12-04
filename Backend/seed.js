require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Restaurant = require("./models/Restaurant");
const MenuItem = require("./models/MenuItem");

(async () => {
  try {
    await connectDB();

    console.log("🌱 Starting database seeding...");

    await User.deleteMany();
    await Restaurant.deleteMany();
    await MenuItem.deleteMany();

    // ✅ Plain text passwords; pre-save hook will hash them
    const userData = [
      { name: "John Customer", email: "customer@example.com", password: "123456", role: "customer" },
      { name: "Mary Vendor", email: "vendor@example.com", password: "123456", role: "vendor" },
      { name: "Dave Delivery", email: "delivery@example.com", password: "123456", role: "delivery" },
      { name: "Alice Admin", email: "admin@example.com", password: "123456", role: "admin" },
    ];

    // Save users manually to trigger pre-save hooks
    const users = [];
    for (const data of userData) {
      const user = new User(data);
      await user.save();
      users.push(user); // ✅ store for later reference
    }

    console.log("✅ Users created");

    // Create a restaurant linked to the vendor
    const restaurant = await Restaurant.create({
      name: "Mary’s Pizza House",
      description: "Authentic Italian pizza",
      address: "123 Food Street, NY",
      cuisine: "Italian",
      vendor: users[1]._id, // ✅ now this exists
    });

    console.log("✅ Restaurant created");

    // Create sample menu items
    await MenuItem.insertMany([
      {
        restaurant: restaurant._id,
        name: "Margherita Pizza",
        price: 299,
        category: "Pizza",
      },
      {
        restaurant: restaurant._id,
        name: "Pepperoni Pizza",
        price: 399,
        category: "Pizza",
      },
      {
        restaurant: restaurant._id,
        name: "Garlic Bread",
        price: 149,
        category: "Sides",
      },
    ]);

    console.log("✅ Menu items created");
    console.log("🌟 Seeding complete!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
})();
