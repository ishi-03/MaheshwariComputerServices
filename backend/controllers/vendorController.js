import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import Vendor from "../models/vendorModel.js";
// CREATE vendor
const createVendor = asyncHandler(async (req, res) => {
const { username, email } = req.body;

if (!username || !email) {
  return res.status(400).json({ error: "Please fill all inputs" });
}

const existingVendor = await Vendor.findOne({ email });
if (existingVendor) {
  return res.status(400).json({ error: "Vendor already exists with this email" });
}

const vendor = await Vendor.create({ username, email });
res.status(201).json(vendor);

});

// GET all vendors
const getAllVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({});
res.json(vendors);

});

// GET vendor by ID with products
const getVendorByIdWithProducts = asyncHandler(async (req, res) => {
const vendor = await Vendor.findById(req.params.id);
if (!vendor) return res.status(404).json({ message: "Vendor not found" });

const products = await Product.find({ vendor: vendor._id }).populate("category", "name");

res.json({ vendor, products });

});


// UPDATE vendor
const updateVendor = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
const vendor = await Vendor.findById(req.params.id);
if (!vendor) return res.status(404).json({ message: "Vendor not found" });

vendor.username = username;
vendor.email = email;

const updatedVendor = await vendor.save();
res.json(updatedVendor);

});

// DELETE vendor
const deleteVendor = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) return res.status(404).json({ message: "Vendor not found" });

  await vendor.deleteOne();
  res.json({ message: "Vendor deleted" });
});

export {
  createVendor,
  getAllVendors,
  getVendorByIdWithProducts,
  updateVendor,
  deleteVendor,
};
