const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

// -----------------------------
// CONNECTION EVENT
// -----------------------------
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// --------------------------------------------------
// STEP 2: REAL-TIME EVENTS (Order status + location)
// --------------------------------------------------

// 🔸 1: Send order status update
function sendOrderStatus(orderId, status) {
  io.emit("order_status_update", { orderId, status });
}
module.exports.sendOrderStatus = sendOrderStatus;

// 🔸 2: Send driver location update
function sendDriverLocation(orderId, lat, lng) {
  io.emit("delivery_location_update", { orderId, lat, lng });
}
module.exports.sendDriverLocation = sendDriverLocation;

// --------------------------------------------------

server.listen(5000, () => console.log("Server running on port 5000"));
