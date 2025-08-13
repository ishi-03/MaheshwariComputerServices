// packages
import dotenv from "dotenv";
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import restockRoutes from "./routes/restockRoutes.js";
import configRoutes from "./routes/configRoutes.js";

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Create express app first
const app = express();

// CORS config — must be before routes
app.use(cors({
  origin: "https://wholesalefrontend-w0sm.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));
app.options("*", cors({
  origin: "https://wholesalefrontend-w0sm.onrender.com",
  credentials: true
}));

// Parse cookies before routes
app.use(cookieParser());

// Debug incoming cookies
app.use((req, res, next) => {
  console.log("Incoming cookies:", req.cookies);
  next();
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/restock", restockRoutes);
app.use("/api/config", configRoutes);

// Static uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
}

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
