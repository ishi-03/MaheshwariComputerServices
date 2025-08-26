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

// Create express app
const app = express();

// CORS config — must be before routes
const allowedOrigins = [
  "https://www.refurbbazar.com",  // ✅ your Namecheap domain
  "https://refurbbazar.com",      // ✅ non-www version (optional, good to add)
  "http://localhost:3000"         // ✅ local dev (optional)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));

app.options("*", cors({
  origin: allowedOrigins,
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

// Force HTTPS middleware (Render/Heroku)
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
