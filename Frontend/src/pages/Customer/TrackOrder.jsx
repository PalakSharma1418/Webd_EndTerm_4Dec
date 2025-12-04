// frontend/src/pages/Customer/TrackOrder.jsx
import React, { useEffect, useState, useRef } from "react";
import { listenToOrderStatus, listenToDriverLocation } from "../../listeners/listeners";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./TrackOrder.css"; // optional for basic styles

// Fix default marker icons (Leaflet + webpack issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// small helper component to move map view when new position arrives
function Recenter({ position, pan = true }) {
  const map = useMap();
  useEffect(() => {
    if (!position) return;
    if (pan) map.panTo(position);
  }, [position, map, pan]);
  return null;
}

export default function TrackOrder({ orderId = 101, followDriver = true }) {
  // orderId can be passed as prop or extracted from route/URL
  const [status, setStatus] = useState("Waiting for updates...");
  const [driverPos, setDriverPos] = useState(null); // {lat, lng}
  const [history, setHistory] = useState([]); // optional past positions
  const markerRef = useRef();

  // subscribe to order status updates
  useEffect(() => {
    const handleStatus = (data) => {
      // optionally filter by orderId
      if (data.orderId && data.orderId !== orderId) return;
      setStatus(data.status);
    };

    listenToOrderStatus(handleStatus);

    // cleanup: remove listener on unmount
    return () => {
      // socket.off is in the listener file only if you exported socket; we'll call directly via socket
      // But safer: remove using exact handler if you have a reference to socket.
      // If you used socket.on in listeners.js, you can add a corresponding off there.
    };
  }, [orderId]);

  // subscribe to driver location updates
  useEffect(() => {
    const handleLocation = (data) => {
      if (!data) return;
      if (data.orderId && data.orderId !== orderId) return; // ensure update is for current order
      const pos = { lat: Number(data.lat), lng: Number(data.lng) };
      setDriverPos(pos);
      setHistory((h) => [...h.slice(-50), pos]); // keep last 50 points
    };

    listenToDriverLocation(handleLocation);

    return () => {
      // similarly cleanup if you added off handlers in listeners
    };
  }, [orderId]);

  // initial center for map (fallback)
  const startCenter = driverPos || { lat: 28.6139, lng: 77.2090 };

  // map marker element
  const markerElement = driverPos ? (
    <Marker position={driverPos} ref={markerRef}>
      <Popup>
        Rider <br /> {driverPos.lat.toFixed(5)}, {driverPos.lng.toFixed(5)}
      </Popup>
    </Marker>
  ) : null;

  // a simple visual progress bar for status
  const steps = ["accepted", "preparing", "ready", "picked_up", "on_the_way", "delivered"];
  const activeStepIndex = Math.max(0, steps.indexOf(status));

  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      <div style={{ flex: "0 0 360px" }}>
        <h2>Order No: {orderId}</h2>
        <p><strong>Status:</strong> {status}</p>

        <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", gap: 6, flexDirection: "column" }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: i <= activeStepIndex ? "#2b8a3e" : "#ddd"
                }} />
                <div style={{ textTransform: "capitalize" }}>{s.replace("_", " ")}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <h4>Driver Coordinates</h4>
          <div>Lat: {driverPos?.lat ?? "-"}</div>
          <div>Lng: {driverPos?.lng ?? "-"}</div>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <MapContainer
          center={[startCenter.lat, startCenter.lng]}
          zoom={13}
          style={{ height: 500, width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markerElement}
          {/* Recenter map when driver position changes (followDriver prop) */}
          <Recenter position={driverPos ? [driverPos.lat, driverPos.lng] : null} pan={followDriver} />
        </MapContainer>
      </div>
    </div>
  );
}
