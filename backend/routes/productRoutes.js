import express from "express";
import formidable from "express-formidable";
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  restockProduct,
  getProductEnums, 
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

const router = express.Router();

const uploadForm = formidable({
  multiples: true,
  keepExtensions: true,
});

app.use((req, res, next) => {
  console.log("Incoming cookies:", req.cookies);
  next();
});


router.route("/enums").get(getProductEnums); // ✅ New route

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router.route("/filtered-products").post(filterProducts);
router.put("/restock/:id", authenticate, authorizeAdmin, restockProduct);
router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, uploadForm, addProduct);
router

  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, uploadForm, updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);



export default router;
