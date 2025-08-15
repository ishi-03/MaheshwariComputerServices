import fs from "fs-extra";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

/*──────────────────────────
  ➕ ADD PRODUCT
──────────────────────────*/
import asyncHandler from "express-async-handler";
import fs from "fs-extra";
import cloudinary from "../config/cloudinary.js"; // Make sure you have cloudinary config imported
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  const fields = req.fields;
  const {
    name,
    description,
    price,
    purchasePrice,
    category,
    brand,
    originalPrice,
    vendorId,
    screenSize,
    weight,
    s_type,
    storage,
    RAM,
    processor,
    color,
    keyboard,
    adapter,
    warranty,
    fingerprint,
    dimensions,
    detailedDescription,
    stock,
    portCount
  } = fields;

  // Parse portCount safely
  let parsedPorts = {};
  if (portCount) {
    try {
      parsedPorts = typeof portCount === "string" ? JSON.parse(portCount) : portCount;
    } catch {
      return res.status(400).json({ error: "Invalid port count format" });
    }
  }
  const { C_Type, HDMI, USB } = parsedPorts;

  // Collect tmp file paths
  let tmpPaths = [];
  if (req.files?.images) {
    tmpPaths = Array.isArray(req.files.images)
      ? req.files.images.map((f) => f.path)
      : [req.files.images.path];
  }

  // Upload to Cloudinary
  const imageUrls = await Promise.all(
    tmpPaths.map(async (tmp) => {
      const result = await cloudinary.uploader.upload(tmp, {
        folder: "products",
        use_filename: true,
        unique_filename: false,
        overwrite: true
      });
      await fs.remove(tmp); // Clean up temp file
      return result.secure_url;
    })
  );

  // Validation
  if (
    !name || !brand || !description || !detailedDescription ||
    !price || !originalPrice || !category || !vendorId ||
    !purchasePrice || imageUrls.length === 0 || !screenSize ||
    !RAM || !storage || !weight || !s_type || dimensions === undefined ||
    C_Type === undefined || HDMI === undefined || USB === undefined
  ) {
    return res.status(400).json({ error: "Required fields missing or invalid" });
  }

  // Create product
  const product = new Product({
    name,
    description,
    detailedDescription,
    price: Number(price),
    purchasePrice: Number(purchasePrice),
    originalPrice: Number(originalPrice),
    brand,
    category,
    vendor: vendorId,
    images: imageUrls,
    screenSize,
    weight: Number(weight),
    s_type,
    storage,
    RAM,
    processor,
    color,
    keyboard,
    adapter,
    warranty,
    fingerprint,
    dimensions: Number(dimensions),
    C_Type: Number(C_Type) || 0,
    HDMI: Number(HDMI) || 0,
    USB: Number(USB) || 0,
    stock: Number(stock) || 0,
  });

  await product.save();
  res.status(201).json(product);
});



/*──────────────────────────
  ✏️ UPDATE PRODUCT
──────────────────────────*/

/*──────────────────────────*/
const updateProductDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ error: "Invalid or missing product ID" });
  }

  const fields = req.fields;
  const {
    name,
    description,
    detailedDescription,
    price,
    purchasePrice,
    category,
    brand,
    originalPrice,
    screenSize,
    weight,
    s_type,
    storage,
    RAM,
    processor,
    color,
    keyboard,
    adapter,
    warranty,
    fingerprint,
    dimensions,
    stock,
    images,
    portCount
  } = fields;

  // Parse portCount if provided
  let parsedPorts = {};
  if (portCount) {
    try {
      parsedPorts = typeof portCount === "string" ? JSON.parse(portCount) : portCount;
    } catch {
      return res.status(400).json({ error: "Invalid port count format" });
    }
  }
  const { C_Type, HDMI, USB } = parsedPorts;

  // Keep existing images
  let updatedImages = Array.isArray(images) ? images : images ? [images] : [];

  // Upload new images if provided
  if (req.files?.images) {
    const tmpPaths = Array.isArray(req.files.images)
      ? req.files.images.map((f) => f.path)
      : [req.files.images.path];

    const uploadedUrls = await Promise.all(
      tmpPaths.map(async (tmp) => {
        const result = await cloudinary.uploader.upload(tmp, { folder: "products" });
        await fs.remove(tmp); // remove local temp file
        return result.secure_url;
      })
    );

    updatedImages = [...updatedImages, ...uploadedUrls];
  }

  // Prepare update object
  const updateData = {
    name,
    description,
    detailedDescription,
    price: price ? Number(price) : undefined,
    purchasePrice: purchasePrice ? Number(purchasePrice) : undefined,
    originalPrice: originalPrice ? Number(originalPrice) : undefined,
    brand,
    category,
    screenSize,
    weight: weight ? Number(weight) : undefined,
    s_type,
    storage,
    RAM,
    processor,
    color,
    keyboard,
    adapter,
    warranty,
    fingerprint,
    dimensions: dimensions ? Number(dimensions) : undefined,
    C_Type: C_Type !== undefined ? Number(C_Type) : undefined,
    HDMI: HDMI !== undefined ? Number(HDMI) : undefined,
    USB: USB !== undefined ? Number(USB) : undefined,
    stock: stock ? Number(stock) : undefined,
    images: updatedImages
  };

  // Remove undefined fields so they won't overwrite existing values
  Object.keys(updateData).forEach(
    (key) => updateData[key] === undefined && delete updateData[key]
  );

  const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});


/*──────────────────────────
  ❌ REMOVE PRODUCT
──────────────────────────*/
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // If product has Cloudinary images
    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        // image can be either a string URL or { url, public_id }
        let publicId;

        if (typeof image === "string") {
          // Fallback for old data without public_id
          const urlParts = image.split("/");
          const fileName = urlParts[urlParts.length - 1]; // last part after slash
          const folderName = urlParts[urlParts.length - 2]; // second last part
          publicId = `${folderName}/${fileName.split(".")[0]}`;
        } else if (image.public_id) {
          // Preferred method for new products
          publicId = image.public_id;
        }

        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
            console.log(`✅ Deleted from Cloudinary: ${publicId}`);
          } catch (err) {
            console.error(`❌ Error deleting from Cloudinary (${publicId}):`, err);
          }
        }
      }
    }

    // Delete product from DB
    await product.deleteOne();
    res.json({ message: "Product and images deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});




const restockProduct = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  product.stock += quantity;
  await product.save();

  res.json({ message: "Product restocked", product });
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error?.message || "Something went wrong"
 || "Something went wrong"
);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error?.message || "Something went wrong"
 || "Something went wrong"
);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error?.message || "Something went wrong"
 || "Something went wrong"
);
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export {
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
};
