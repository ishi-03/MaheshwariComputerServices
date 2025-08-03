import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount.jsx";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav
      id="navigation-container"
      className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl border-b-2 border-red-800"
      style={{ zIndex: 9999 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Main nav links + search bar */}
          <div className="flex items-center space-x-8 flex-grow">
            <Link
              to="/"
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <AiOutlineHome size={20} className="mr-2 group-hover:animate-pulse" />
              <span className="nav-item-name font-semibold tracking-wide">HOME</span>
            </Link>

            <Link
              to="/shop"
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <AiOutlineShopping size={20} className="mr-2 group-hover:animate-pulse" />
              <span className="nav-item-name font-semibold tracking-wide">SHOP</span>
            </Link>

            <Link
              to="/cart"
              className="group relative flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <AiOutlineShoppingCart size={20} className="mr-2 group-hover:animate-pulse" />
              <span className="nav-item-name font-semibold tracking-wide">CART</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-red-600 rounded-full text-xs px-2 py-0.5 font-bold min-w-[20px] text-center shadow-lg animate-bounce">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>

            <Link
              to="/favorite"
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <FaHeart size={18} className="mr-2 group-hover:text-red-200 transition-colors duration-200" />
              <span className="nav-item-name font-semibold tracking-wide">FAVORITES</span>
              <FavoritesCount />
            </Link>

            {/* Search Bar */}
            <div className="flex items-center ml-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-80 rounded-full px-4 py-2 text-gray-800 bg-white border-2 border-transparent focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-200 transition-all duration-200 shadow-md placeholder-gray-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Username/Login Section */}
          {userInfo ? (
            <div className="relative ml-6">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 ease-in-out border border-white border-opacity-20"
              >
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">{userInfo.username.charAt(0).toUpperCase()}</span>
                </div>
                <span className="font-medium">{userInfo.username}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  {userInfo.isAdmin && (
                    <>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        Admin Panel
                      </div>
                      <Link to="/admin/vendor" onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                          Vendor Management
                        </span>
                      </Link>
                      <Link to="/admin/dashboard" onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                          Dashboard
                        </span>
                      </Link>
                      <Link to="/admin/productlist" onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                          Products
                        </span>
                      </Link>
                      <Link to="/admin/allproductslist" onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                          All Products
                        </span>
                      </Link>
                      <Link to="/admin/categorylist" onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                          Categories
                        </span>
                      </Link>
                      <Link to="/admin/orderlist" onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                          Orders
                        </span>
                      </Link>
                      <Link to="/admin/userlist" onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 border-b border-gray-100">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                          Users
                        </span>
                      </Link>
                    </>
                  )}
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile Settings
                    </span>
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 border-t border-gray-100"
                  >
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-3 ml-6">
              <Link
                to="/login"
                className="group flex items-center px-4 py-2 rounded-full bg-white text-red-600 hover:bg-red-50 transition-all duration-200 ease-in-out transform hover:scale-105 font-medium border-2 border-white"
              >
                <AiOutlineLogin size={18} className="mr-2 group-hover:animate-pulse" />
                <span className="nav-item-name font-semibold">LOGIN</span>
              </Link>
              <Link
                to="/register"
                className="group flex items-center px-4 py-2 rounded-full bg-transparent border-2 border-white hover:bg-white hover:text-red-600 transition-all duration-200 ease-in-out transform hover:scale-105 font-medium"
              >
                <AiOutlineUserAdd size={18} className="mr-2 group-hover:animate-pulse" />
                <span className="nav-item-name font-semibold">REGISTER</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;