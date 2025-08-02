import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-red-50 to-white text-gray-700 border-t border-red-100">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Logo and selling note */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
              Maheshwari Computer Services
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4"></div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600 font-medium">We sell - Old n Used Laptops</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Dell, HP, Lenovo, Apple, Asus, Acer
            </p>
          </div>
        </div>

        {/* Get help */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-800 mb-4 relative">
            Get Help
            <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-500 rounded-full"></div>
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/privacy-policy"
                className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block transform"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/enter-tracking"
                className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block transform"
              >
                Tracking Info
              </Link>
            </li>
            <li>
              <Link
                to="/refund-policy"
                className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block transform"
              >
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link
                to="/shipping-policy"
                className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block transform"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block transform"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-800 mb-4 relative">
            Customer Care
            <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-500 rounded-full"></div>
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="/cart" className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block transform">
                Cart
              </a>
            </li>
            <li>
              <a href="/shop" className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block transform">
                Shop
              </a>
            </li>
            <li>
              <a href="/favorite" className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block transform">
                Wishlist
              </a>
            </li>
            <li>
              <a href="/profile" className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block transform">
                My Account
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block transform">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-800 mb-4 relative">
            Contact
            <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-500 rounded-full"></div>
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700">Maheshwari Computer Services</p>
              <p className="text-gray-600 leading-relaxed">Gori Kunj, Below United India Insurance</p>
              <p className="text-gray-600 leading-relaxed">Opp IDBI Bank, Kankroli, Rajsamand, Rajasthan 313324</p>
            </div>
            <div className="space-y-2 pt-2">
              <p className="flex items-center text-gray-600">
                <span className="mr-2">📞</span>
                <a href="tel:9414173244" className="hover:text-red-600 transition-colors duration-200 font-medium">9414173244</a>
              </p>
              <p className="flex items-center text-gray-600">
                <span className="mr-2">✉️</span>
                <a href="mailto:maheshwaricmp@gmail.com" className="hover:text-red-600 transition-colors duration-200 font-medium break-all">maheshwaricmp@gmail.com</a>
              </p>
            </div>
            <div className="pt-3">
              <div className="rounded-lg overflow-hidden shadow-sm border border-red-100">
                <iframe
                  src="https://www.google.com/maps?q=Maheshwari%20Computer,%20%20united%20India%20Insurance,%20Opp%20IDBI%20Bank,%20Kankroli,%20Rajsamand,%20Rajasthan&output=embed"
                  width="100%"
                  height="160"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Map Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Broadcast Invite */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white py-8 border-t border-red-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-xl font-semibold mb-2 flex items-center justify-center md:justify-start">
              <FontAwesomeIcon icon={faWhatsapp} className="mr-2 text-2xl text-white" />
              Join our WhatsApp Broadcast List
            </p>
            <p className="text-red-100 text-sm">
              Get the latest laptop deals and updates directly on WhatsApp
            </p>
          </div>
          <div>
            <a
              href="https://wa.me/919414173244?text=Hi%2C%20please%20add%20me%20to%20your%20broadcast%20list"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
              Join on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Socials and copyright */}
      <div className="bg-white py-6 border-t border-red-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex justify-center space-x-6 text-2xl">
              <a
                href="https://www.facebook.com/profile.php?id=1743487109&mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.instagram.com/maheshwari_computers?igsh=MThlampnYnYxdmlnbw==&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="mailto:maheshwaricmp@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://wa.me/919414173244"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-200 to-transparent"></div>

            <p className="text-sm text-gray-500 text-center">
              © 2025. All rights reserved - Designed by{' '}
              <span className="text-red-600 font-semibold hover:text-red-700 transition-colors duration-200">
                Maheshwari Computer Services
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
