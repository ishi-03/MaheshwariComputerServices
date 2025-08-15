import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
  useAllProductsQuery,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { useFetchVendorsQuery } from "../../redux/api/vendorApiSlice";
import { clearFavorites } from "../../redux/features/favorites/favoriteSlice";
import { clearEntireCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { FiBox, FiAlertCircle, FiUpload } from "react-icons/fi";

// Helper for consistent field display
const Field = ({ label, children, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

// Enums
const enumOptions = {
  screenSize: ["13", "13.3", "14", "15.5"],
  s_type: ["Touch", "Non-Touch"],
  storage: ["256", "512"],
  RAM: ["8", "16", "32"],
  brand: ["Lenovo", "Dell", "HP", "Apple"],
  color: ["Black", "Silver", "Grey"],
  keyboard: ["Backlit", "Normal"],
  adapter: ["Original", "Compatible"],
  fingerprint: ["Yes", "No"],
};

const AdminProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: product } = useGetProductByIdQuery(id, { skip: !id });
  const { data: categories = [] } = useFetchCategoriesQuery();
  const { data: allProducts } = useAllProductsQuery();

  const [uploadImage] = useUploadProductImageMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    detailedDescription: "",
    price: "",
    purchasePrice: "",
    originalPrice: "",
    category: "",
    brand: "",
    stock: 0,
    images: [],
    screenSize: "",
    weight: "",
    s_type: "",
    storage: "",
    RAM: "",
    processor: "",
    color: "",
    keyboard: "",
    adapter: "",
    warranty: "",
    fingerprint: "",
    dimensions: "",
    C_Type: 0,
    HDMI: 0,
    USB: 0,
  });

  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        detailedDescription: product.detailedDescription || "",
        price: product.price || "",
        purchasePrice: product.purchasePrice || "",
        originalPrice: product.originalPrice || "",
        category: product.category?._id || "",
        brand: product.brand || "",
        stock: product.stock || 0,
        images: product.images || [],
        screenSize: product.screenSize || "",
        weight: product.weight || "",
        s_type: product.s_type || "",
        storage: product.storage || "",
        RAM: product.RAM || "",
        processor: product.processor || "",
        color: product.color || "",
        keyboard: product.keyboard || "",
        adapter: product.adapter || "",
        warranty: product.warranty || "",
        fingerprint: product.fingerprint || "",
        dimensions: product.dimensions || "",
        C_Type: product.C_Type || 0,
        HDMI: product.HDMI || 0,
        USB: product.USB || 0,
      });
    }
  }, [product]);

  useEffect(() => {
    if (allProducts?.length === 0) {
      dispatch(clearEntireCart());
      dispatch(clearFavorites());
    }
  }, [allProducts, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFileHandler = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    setImageLoading(true);
    try {
      const res = await uploadImage(formData).unwrap();
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...res.images],
      }));
      toast.success("Images uploaded");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name", "description", "detailedDescription", "price", "originalPrice",
      "brand", "category", "images", "screenSize", "weight",
      "s_type", "storage", "RAM", "processor", "color", "keyboard", "adapter",
      "warranty", "fingerprint", "dimensions",
    ];

    for (const field of requiredFields) {
      if (!form[field]) {
        toast.error(`Please fill the "${field}" field`);
        return;
      }
    }

    try {
    const formData = new FormData();

for (const key in form) {
  if (key === "images") {
    form[key].forEach((img) => formData.append("images", img));
  } else {
    formData.append(key, form[key]);
  }
}

      const updated = await updateProduct({ productId: id, formData }).unwrap();
      if (updated?._id) {
        toast.success("Product updated successfully");
        navigate("/admin/allproductslist", { replace: true });
      }
    } catch (err) {
      console.error(err);
      toast.error("Product update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;

    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted");
      navigate("/admin/allproductslist");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8 flex items-center">
          <FiBox className="text-blue-600 mr-2 h-6 w-6" />
          <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white p-6 rounded-lg shadow border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(form).map(([key, value]) => {
              if (key === "images") return null;

              return (
                <Field
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  required={true}
                >
                  {enumOptions[key] ? (
                    <select
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="w-full p-2.5 border rounded-md bg-white"
                    >
                      <option value="">Select {key}</option>
                      {enumOptions[key].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : key === "category" ? (
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full p-2.5 border rounded-md bg-white"
                    >
                      <option value="">Select Category</option>
                      {categories?.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={typeof value === "number" ? "number" : "text"}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="w-full p-2.5 border rounded-md"
                    />
                  )}
                </Field>
              );
            })}
          </div>

          {/* Image Upload */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Product Images
            </h2>
            <div className="flex flex-wrap gap-4">
              {form.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Product-${idx}`}
                  className="w-28 h-28 object-cover border rounded"
                />
              ))}
              {imageLoading && (
                <div className="w-28 h-28 flex items-center justify-center border bg-gray-100 animate-pulse">
                  Uploading...
                </div>
              )}
            </div>
            <label className="block mt-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
              <div className="cursor-pointer flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500">
                <FiUpload className="mr-2" /> Upload Images
              </div>
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Product"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-100 text-red-600 px-6 py-2 rounded hover:bg-red-200"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Product"}
            </button>
          </div>

          <div className="mt-4 flex items-start gap-2 text-amber-700 bg-amber-50 p-3 rounded-md border border-amber-100">
            <FiAlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              Deleting a product is permanent and cannot be undone. Please be
              certain.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
