import React from "react";

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Refund & Return Policy</h1>

      <p className="mb-4">
        We want you to love your purchase, but if something goes wrong, we’re here to help.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Return Eligibility</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>The item is defective.</li>
        <li>You received the wrong product.</li>
        <li>The item is significantly different from the product description.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Non-Returnable Products</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>Items returned without original packaging or in used condition.</li>
        <li>Products damaged due to customer mishandling.</li>
        <li>Items marked as “Final Sale” or “Clearance.”</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. How to Initiate a Return</h2>
      <ol className="list-decimal ml-6 space-y-2">
        <li>
          <strong>Contact Us:</strong>  
          <ul className="ml-4 list-disc">
            <li>WhatsApp: <a href="tel:9414173244" className="text-blue-600 underline">9414173244</a></li>
            <li>Email: <a href="mailto:maheshwaricmp@gmail.com" className="text-blue-600 underline">maheshwaricmp@gmail.com</a></li>
          </ul>
        </li>
        <li>
          <strong>Submit Evidence:</strong> Click clear photos of the product showing the issue. Mention your Order ID and the problem.
        </li>
        <li>
          <strong>Wait for Resolution:</strong> Our team will respond within 1–2 business days. If not, you may call us directly.
        </li>
        <li>
          <strong>Shipping the Return:</strong> If approved, ship the product within 3 days in original packaging with all accessories.
        </li>
      </ol>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Refund Process</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>Refunds are initiated after the returned product is received and inspected.</li>
        <li>Refunds will be made to the original payment method within 7–10 working days.</li>
        <li>Shipping charges are non-refundable unless the error is on our side.</li>
      </ul>

      <div className="mt-8">
        <p className="font-semibold">Managed by – Maheshwari Computer Services</p>
       
      </div>
    </div>
  );
};

export default RefundPolicy;
