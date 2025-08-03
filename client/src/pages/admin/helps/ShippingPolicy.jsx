import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Shipping Policy</h1>

      <p className="mb-6">
        At <strong>Digital Guard</strong>, a unit of <strong>Maheshwari Computer Services</strong>, we ensure that every gadget reaches you safely and on time. Please read our shipping policy carefully before placing an order.
      </p>

      <div className="space-y-6 text-base">

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Order Processing</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Orders are processed and dispatched within <strong>1–2 business days</strong>.</li>
            <li>Orders placed on weekends or public holidays will be processed on the next working day.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Shipping Methods & Timeframes</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Standard delivery time is <strong>3–7 business days</strong>, depending on your location.</li>
            <li>We ship across India using trusted logistics partners such as <strong>Delhivery</strong>, <strong>Blue Dart</strong>, and others.</li>
            <li>You will receive tracking details once your package has been dispatched.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Shipping Charges</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Shipping charges are calculated at checkout based on the delivery location and cart weight.</li>
            <li>We occasionally offer <strong>free shipping</strong> during special promotions or on minimum cart value thresholds.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Delays or Delivery Failures</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Although we strive to deliver on time, delays may occur due to weather conditions, transport strikes, or logistical issues.</li>
            <li>We are not responsible for delivery delays caused by inaccurate or incomplete shipping addresses.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Undelivered Packages</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>If a package is returned to us due to incorrect address or repeated failed delivery attempts, <strong>re-shipping charges will apply</strong>.</li>
            <li>You will be contacted to confirm the updated delivery details before re-shipping.</li>
          </ul>
        </div>

        <p className="text-sm text-gray-600 mt-6 italic">
          If you have any questions regarding your order shipment, feel free to contact on 9414173244/1244.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
