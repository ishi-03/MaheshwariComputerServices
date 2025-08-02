import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Terms & Conditions
      </h1>

      <p className="mb-4">
        Welcome to <strong>Digital Guard</strong>, an initiative by <strong>Maheshwari Computer Services</strong>, serving both B2B and B2C customers. By accessing or using our platform, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully before proceeding.
      </p>

      <div className="space-y-6 text-base">

        <div>
          <h2 className="text-xl font-semibold text-gray-900">1. Eligibility</h2>
          <p>
            Digital Guard caters to both B2B (business clients) and B2C (individual consumers).
            By registering or placing an order, you confirm that the information you provide is accurate and you agree to these terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">2. Account Registration</h2>
          <p>
            You must create an account by providing accurate and complete information.
            You are responsible for all activity under your account and must notify us of any unauthorized access.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">3. Product Information</h2>
          <p>
            We aim to provide accurate descriptions, prices, and specifications. However, we do not guarantee error-free listings.
            Product images are for reference and may differ slightly from the actual item.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">4. Pricing and Payment</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>All prices are in INR and exclusive of taxes and shipping unless stated.</li>
            <li>Payment is due in full unless otherwise agreed in writing.</li>
            <li>We may change prices without prior notice.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">5. Order Acceptance and Fulfillment</h2>
          <p>
            Orders are subject to availability and confirmation. We may cancel any order due to pricing errors, stock issues, or suspected fraud. Estimated delivery times may vary.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">6. Shipping and Delivery</h2>
          <p>
            Costs and delivery times depend on your location and items ordered. Ensure correct address details—risk transfers to the buyer upon delivery.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">7. Returns and Replacements</h2>
          <p>
            Refer to our <a href="/refund-policy" className="text-blue-600 underline">Refund & Return Policy</a>. Only mismatched and defective items reported within 24 hours are eligible.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">8. Intellectual Property</h2>
          <p>
            All content belongs to Digital Guard or licensors. Do not copy, use, or distribute without prior written consent.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">9. Limitation of Liability</h2>
          <p>
            We are not liable for indirect or consequential damages. Liability is limited to the purchase amount of the affected product.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">10. Indemnification</h2>
          <p>
            You agree to indemnify Digital Guard from any claims or damages arising from your use of the platform or breach of these terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">11. Termination</h2>
          <p>
            We may suspend or terminate your account at any time for any reason. You may also request account termination at your discretion.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">12. Changes to Terms</h2>
          <p>
            We may update these Terms & Conditions at any time. Continued use of the platform indicates your acceptance of the latest version.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">13. Contact Us</h2>
          <p className="space-y-1">
            <span>Email: <a href="mailto:digitalguard2023@gmail.com" className="text-blue-600 underline">digitalguard2023@gmail.com</a></span><br />
            <span>Phone: <a href="tel:+916367026801" className="text-blue-600 underline">+91 63670 26801</a></span><br />
            <span>Address: 1st Floor, Arsh IT Plaza, Nai Sadak, Churu, Rajasthan-331001</span>
          </p>
        </div>

        <p className="text-sm italic text-gray-600 mt-6">
          By using the Digital Guard platform, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
        </p>

        <p className="text-sm text-gray-500">Powered by Maheshwari Computer Services</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
