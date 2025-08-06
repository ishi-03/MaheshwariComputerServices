import path from "path";
import fs from "fs-extra";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

/*──────────────────────────
  ⬆️ IMAGE UPLOAD HELPER
──────────────────────────*/
const persistImages = async (tmpPaths) => {
  const uploadDir = path.join(path.resolve(), "uploads");
  await fs.ensureDir(uploadDir);

  return Promise.all(
    tmpPaths.map(async (tmp) => {
      const ext = path.extname(tmp);
      const fileName = `image-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
      const dest = path.join(uploadDir, fileName);
      await fs.move(tmp, dest, { overwrite: true });
      return `/uploads/${fileName}`;
    })
  );
};

/*──────────────────────────
  ➕ ADD PRODUCT
──────────────────────────*/
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
  } = fields;

let portCount = {};
if (fields.portCount) {
  try {
    portCount =
      typeof fields.portCount === "string"
        ? JSON.parse(fields.portCount)
        : fields.portCount;
  } catch (err) {
    return res.status(400).json({ error: "Invalid port count format" });
  }
}

console.log("🔧 PORTCOUNT RAW:", fields.portCount);
console.log("🔧 PORTCOUNT PARSED:", portCount);

const { C_Type, HDMI, USB } = portCount;

console.log("🔧 C_Type:", C_Type);
console.log("🔧 HDMI:", HDMI);
console.log("🔧 USB:", USB);


  let tmpPaths = [];
  if (req.files?.images) {
    tmpPaths = Array.isArray(req.files.images)
      ? req.files.images.map((f) => f.path)
      : [req.files.images.path];
  }

  const imageUrls = await persistImages(tmpPaths);

  switch (true) {
    case !name:
    case !brand:
    case !description:
    case !detailedDescription:
    case !price:
    case !originalPrice:
    case !category:
    case !vendorId:
    case !purchasePrice:
    case imageUrls.length === 0:
    case !screenSize:
    case !RAM:
    case !storage:
    case !weight:
    case !s_type:
    case dimensions === undefined || dimensions === null || dimensions === "":
    case C_Type === undefined || C_Type === null || C_Type === "":
    case HDMI === undefined || HDMI === null || HDMI === "":
    case USB === undefined || USB === null || USB === "":
      return res.status(400).json({ error: "Required fields missing or invalid" });
  }

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
    stock: Number(stock),
  });

  await product.save();
  res.json(product);
});


/*──────────────────────────
  ✏️ UPDATE PRODUCT
──────────────────────────*/
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
    C_type,
    HDMI,
    USB,
    stock,
    images,
  } = fields;

  const updateData = {
    name,
    description,
    detailedDescription,
    price: Number(price),
    purchasePrice: Number(purchasePrice),
    originalPrice: Number(originalPrice),
    brand,
    category,
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
    C_type: Number(C_type),
    HDMI: Number(HDMI),
    USB: Number(USB),
    stock: Number(stock),
     images:
    typeof images === "string"
      ? [images]
      : Array.isArray(images)
      ? images
      : [],
};

  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});





/*──────────────────────────
  ENUMS, CRUD, REVIEWS (UNCHANGED)
──────────────────────────*/
const getProductEnums = asyncHandler(async (req, res) => {
  try {
    res.json({
      brands: Product.schema.path("brand").enumValues,
      screenSizes: Product.schema.path("screenSize").enumValues,
      s_types: Product.schema.path("s_type").enumValues,
      storage: Product.schema.path("storage").enumValues,
      RAM: Product.schema.path("RAM").enumValues,
      colors: Product.schema.path("color").enumValues,
      keyboards: Product.schema.path("keyboard").enumValues,
      adapters: Product.schema.path("adapter").enumValues,
      fingerprints: Product.schema.path("fingerprint").enumValues,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enums" });
  }
});


const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.images && product.images.length > 0) {
      for (const imgPath of product.images) {
        const fullPath = path.join(path.resolve(), imgPath);

        try {
          if (await fs.pathExists(fullPath)) {
            await fs.remove(fullPath);
            console.log(`Deleted image: ${fullPath}`);
          }
        } catch (err) {
          console.error(`Error deleting image ${fullPath}:`, err);
        }
      }
    }

    // Delete product from database
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
