import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "temp/" }); // temp folder before upload

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload to Cloudinary route
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const uploadResults = await Promise.all(
      req.files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "products",
          });
          return { url: result.secure_url, public_id: result.public_id };
        } finally {
          // Always remove temp file
          fs.unlink(file.path, (err) => {
            if (err) console.error("Temp file delete error:", err);
          });
        }
      })
    );

    res.status(200).json({
      message: "Images uploaded to Cloudinary successfully",
      images: uploadResults,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Image upload failed", error: err.message });
  }
});

export default router;
