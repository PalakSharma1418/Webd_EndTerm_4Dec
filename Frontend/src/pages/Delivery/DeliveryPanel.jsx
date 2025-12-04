import { socket } from "../../socket";

function DeliveryPanel() {

  // Send pickup message
  const pickupOrder = () => {
    socket.emit("order_status_update", {
      orderId: 101,
      status: "picked_up"
    });
  };

  // Send location every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("delivery_location_update", {
        orderId: 101,
        lat: 28.61,   // replace with real GPS
        lng: 77.209
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <button onClick={pickupOrder}>Pick Order</button>
    </div>
  );
}

export default DeliveryPanel;
