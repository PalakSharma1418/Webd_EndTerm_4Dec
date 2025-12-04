import { socket } from "../../socket";

function OrderDetails() {
  return (
    <div>
      <button onClick={() => {
        socket.emit("order_status_update", {
          orderId: 101,
          status: "preparing"
        });
      }}>
        Mark as Preparing
      </button>

      <button onClick={() => {
        socket.emit("order_status_update", {
          orderId: 101,
          status: "completed"
        });
      }}>
        Mark as Completed
      </button>
    </div>
  );
}

export default OrderDetails;
