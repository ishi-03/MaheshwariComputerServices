import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
}, { timestamps: true });

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  images: { type: [String], required: true },
  price: { type: Number, required: true, default: 0 },
  originalPrice: { type: Number, required: true, default: 0 },
  brand: { type: String, required: true, enum: ['Lenovo', 'Dell', 'HP', 'Apple'] },
  description: { type: String, required: true },
  detailedDescription: { type: String, required: true },
  screenSize: { type: String, required: true, enum: ["13", "13.3", "14", "15.5"] },
  weight: { type: Number, required: true },
  s_type: { type: String, required: true, enum: ['Touch', 'Non-Touch'] },
  storage: { type: String, required: true, enum: ["256", "512"] },
  RAM: { type: String, required: true, enum: ["8", "16", "32"] },
  processor: { type: String, required: true },
  color: { type: String, required: true, enum: ['Black', 'Silver', 'Grey'] },
  keyboard: { type: String, required: true, enum: ['Backlit', 'Normal'] },
  adapter: { type: String, required: true, enum: ['Original', 'Compatible'] },
  warranty: { type: String, required: true },
  fingerprint: { type: String, required: true, enum: ['Yes', 'No'] },
  dimensions: { type: Number, required: true },
  C_Type:{type: Number, default: 0},
  HDMI:{type: Number, default: 0},
  USB:{type: Number, default: 0},
  // numReviews: { type: Number, required: true, default: 0 },
  purchasePrice: { type: Number },
  vendor: { type: ObjectId, ref: "Vendor", required: true },
  category: { type: ObjectId, ref: "Category", required: true },
  stock: { type: Number, required: true, default: 0 },
  // rating: { type: Number, required: true, default: 0 },
  reviews: [reviewSchema],
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
