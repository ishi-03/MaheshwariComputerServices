import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import asyncHandler from "./asyncHandler.js";


const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Not authorized, token invalid" });
  }
});


const authorizeAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  }
  return res.status(403).json({ error: "Not authorized as admin" });
};

export { authenticate, authorizeAdmin };
