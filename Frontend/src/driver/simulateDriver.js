// frontend/src/driver/DriverSim.jsx
import React, { useEffect, useState } from "react";
import { socket } from "../socket";

export default function DriverSim({ orderId = 101 }) {
  const [running, setRunning] = useState(false);
  // start at some point near Delhi
  const path = [
    { lat: 28.6139, lng: 77.2090 },
    { lat: 28.6146, lng: 77.2105 },
    { lat: 28.6154, lng: 77.2120 },
    { lat: 28.6168, lng: 77.2135 },
    { lat: 28.6182, lng: 77.2148 },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let id;
    if (running) {
      id = setInterval(() => {
        const pos = path[index % path.length];
        socket.emit("delivery_location_update", {
          orderId,
          lat: pos.lat,
          lng: pos.lng
        });
        setIndex((i) => i + 1);
      }, 3000);
    }
    return () => clearInterval(id);
  }, [running, index, orderId]);

  return (
    <div style={{ padding: 20 }}>
      <h3>Driver Simulator (order {orderId})</h3>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? "Stop" : "Start"} simulation
      </button>
      <button onClick={() => {
        socket.emit("order_status_update", { orderId, status: "picked_up" });
      }}>
        Emit Picked Up
      </button>
      <button onClick={() => {
        socket.emit("order_status_update", { orderId, status: "delivered" });
      }}>
        Emit Delivered
      </button>
    </div>
  );
}
