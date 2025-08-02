import express from "express";
import {
  createVendor,
  getAllVendors,
  getVendorByIdWithProducts,
  updateVendor,
  deleteVendor,
} from "../controllers/vendorController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// CRUD for vendors
router
  .route("/")
  .post(authenticate, authorizeAdmin, createVendor)
  .get(authenticate, getAllVendors);

// Single vendor detail + products by category
router
  .route("/:id")
  .get(authenticate, getVendorByIdWithProducts)
  .put(authenticate, authorizeAdmin, updateVendor)
  .delete(authenticate, authorizeAdmin, deleteVendor);

export default router;
