import { socket } from "../socket";

// Listen to order status updates from backend
export function listenToOrderStatus(callback) {
  socket.on("order_status_update", callback);
}

// Listen to delivery boy location updates
export function listenToDriverLocation(callback) {
  socket.on("delivery_location_update", callback);
}
