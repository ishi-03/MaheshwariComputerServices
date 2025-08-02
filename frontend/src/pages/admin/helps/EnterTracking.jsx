import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterTracking = () => {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      navigate(`/track/${orderId}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg border">
      <h2 className="text-2xl font-semibold mb-4 text-center">Track Your Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter your Order ID"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 ring-red-400"
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200"
        >
          Track Order
        </button>
      </form>
    </div>
  );
};

export default EnterTracking;
