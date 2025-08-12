import express from "express";
const router = express.Router();
import expressFormidable from 'express-formidable';

import {
    createCategory,
    updateCategory,
    removeCategory,
    listCategory,
    readCategory,
  } from "../controllers/categoryController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route('/').post(authenticate, authorizeAdmin,expressFormidable(), createCategory);

router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);

router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);
  
export default router;