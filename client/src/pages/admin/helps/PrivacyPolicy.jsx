import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        Privacy Policy
      </h1>

      <section className="space-y-4">
        <p>
          <strong>Introduction</strong>
          <br />
          Welcome to <strong>Maheshwari Computer Services</strong>. We provide
          laptops, desktops, printers, software, ERP systems, CCTV, and other
          accessories at wholesale prices for businesses (**B2B**) and also
          retail services for individual customers (**B2C**). Your privacy is
          important to us, and this Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you use our platform or
          services.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-red-500 mt-6">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Business Information (for B2B):</strong> Company name,
              business type, registration details, and tax identification
              number.
            </li>
            <li>
              <strong>Personal Information (for B2C):</strong> Name, email,
              phone number, and address.
            </li>
            <li>
              <strong>Payment Information:</strong> Billing details, transaction
              history, and payment method details (processed through third-party
              payment providers).
            </li>
            <li>
              <strong>Order Details:</strong> Products purchased, order
              frequency, and purchase history.
            </li>
            <li>
              <strong>Technical Information:</strong> IP address, device type,
              browser type, and cookies (for analytical purposes).
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-red-500 mt-6">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside ml-4">
            <li>
              To verify business identity (B2B) or customer details (B2C) and
              maintain account security.
            </li>
            <li>To process and fulfill orders efficiently.</li>
            <li>
              To improve user experience and provide customer support.
            </li>
            <li>
              To communicate updates, promotional offers, and relevant product
              insights.
            </li>
            <li>To prevent fraud and comply with legal obligations.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-red-500 mt-6">
            3. Information Sharing and Disclosure
          </h2>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Service Providers:</strong> Payment processors, shipping
              partners, and IT support providers.
            </li>
            <li>
              <strong>Legal Authorities:</strong> If required by law, to enforce
              agreements, or to protect rights and security.
            </li>
            <li>
              <strong>Business Transfers:</strong> In case of a merger,
              acquisition, or sale of assets.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-red-500 mt-6">
            4. Data Security
          </h2>
          <p>
            We implement industry-standard security measures to protect your
            data. However, no method of transmission over the internet is 100%
            secure. We encourage businesses and customers to use strong
            passwords and keep their account credentials confidential.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-red-500 mt-6">
            5. Cookies and Tracking Technologies
          </h2>
          <p>
            We use cookies and analytics tools to enhance your browsing
            experience, track user activity, and improve platform functionality.
            You can manage your cookie preferences in your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-red-500 mt-6">
            6. Your Rights and Choices
          </h2>
          <p>As a user, you have the right to:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Access, update, or delete your account information.</li>
            <li>Opt-out of marketing communications.</li>
            <li>Request data portability where applicable.</li>
          </ul>
          <p>
            To exercise these rights, contact us at{" "}
            <a
              href="mailto:maheshwaricmp@gmail.com"
              className="text-blue-600 underline"
            >
              maheshwaricmp@gmail.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-red-500 mt-6">
            7. Third-Party Links
          </h2>
          <p>
            Our platform may contain links to third-party websites. We are not
            responsible for their privacy practices and encourage you to review
            their policies.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-red-500 mt-6">
            8. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this policy periodically. We will notify users of
            significant changes through email or platform notifications.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-red-500 mt-6">
            9. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p>
            <strong>Maheshwari Computer Services</strong>
            <br />
            Gori Kunj, Below United India Insurance
            <br />
            Opp IDBI Bank, Kankroli, Rajsamand, Rajasthan 313324
            <br />
            📞 9414173244
            <br />
            ✉️{" "}
            <a
              href="mailto:maheshwaricmp@gmail.com"
              className="text-blue-600 underline"
            >
              maheshwaricmp@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
