import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import bgimage from "../../assets/bgimage.png";
import sideimage from "../../assets/sideimage.png"; // Your uploaded image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 relative overflow-hidden">
      <img
        src={bgimage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative flex items-center w-full max-w-4xl bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-lg p-8">
        {/* Left Image */}
        <div className="hidden md:flex items-center justify-center w-1/2">
          <img src={sideimage} alt="Side Illustration" className="max-w-xs" />
        </div>
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required

              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#B59F78] text-white font-semibold py-2 rounded-lg shadow-md hover:bg-[#AB886D] transition duration-300"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {isLoading && <Loader />}
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account? {" "}
              <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="text-[#B59F78] hover:underline">
                Register for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;