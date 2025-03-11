import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import sidekitchen from "../../assets/kitchenside.jpg";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex relative">
      {/* Left Section - Form */}
      <div
        className="w-1/2 flex items-center justify-center bg-[#8f6b49] bg-opacity-80"
        style={{ marginRight: "120px", backdropFilter: "blur(6px)" }}
      >
        <div className="bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg w-full max-w-lg p-10">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Update Profile
          </h2>
          <form onSubmit={submitHandler} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b5e3c] focus:outline-none"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b5e3c] focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b5e3c] focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b5e3c] focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-[#AB886D] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#7a5235] transition-all"
              >
                Update
              </button>
              <Link
                to="/user-orders"
                className="bg-[#AB886D] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#7a5235] transition-all"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Fixed Image */}
      <div className="w-1/2 h-full fixed right-0 top-0">
        <img
          src={sidekitchen}
          alt="Side Kitchen"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Profile;
