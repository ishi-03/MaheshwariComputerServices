import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useCreateProductMutation,
  useGetProductEnumsQuery,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { useFetchVendorsQuery } from "../../redux/api/vendorApiSlice";

const ProductList = () => {
  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const { data: vendors = [] } = useFetchVendorsQuery();
  const { data: enums = {} } = useGetProductEnumsQuery();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [selectedVendorId, setSelectedVendorId] = useState("");

  const [screenSize, setScreenSize] = useState("");
  const [RAM, setRAM] = useState("");
  const [storage, setStorage] = useState("");
  const [processor, setProcessor] = useState("");
  const [color, setColor] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [adapter, setAdapter] = useState("");
  const [warranty, setWarranty] = useState("");
  const [fingerprint, setFingerprint] = useState("");
  const [s_type, setSType] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [ports, setPorts] = useState([]);
  const [portCount, setPortCount] = useState({});
  const [detailedDescription, setDetailedDescription] = useState("");

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewUrls(files.map((f) => URL.createObjectURL(f)));
  };

  const enumState = {
    brand: [brand, setBrand, "brands"],
    screenSize: [screenSize, setScreenSize, "screenSizes"],
    RAM: [RAM, setRAM, "RAM"],
    storage: [storage, setStorage, "storage"],
    color: [color, setColor, "colors"],
    keyboard: [keyboard, setKeyboard, "keyboards"],
    adapter: [adapter, setAdapter, "adapters"],
    fingerprint: [fingerprint, setFingerprint, "fingerprints"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    try {
      const fd = new FormData();
      images.forEach((img) => fd.append("images", img));

      fd.append("name", name);
      fd.append("description", description);
      fd.append("detailedDescription", detailedDescription);
      fd.append("processor", processor);
      fd.append("warranty", warranty);

      fd.append("category", category);
      fd.append("vendorId", selectedVendorId);

      fd.append("price", Number(price));
      fd.append("purchasePrice", Number(purchasePrice));
      fd.append("originalPrice", Number(originalPrice));
      fd.append("stock", Number(stock));
      fd.append("weight", Number(weight));
      fd.append("dimensions", Number(dimensions));

      Object.entries(enumState).forEach(([field, [value]]) => {
        if (value) fd.append(field, value);
      });

      if (s_type) fd.append("s_type", s_type);

      fd.append("ports", JSON.stringify(ports));

      const numericPortCount = {};
      Object.entries(portCount).forEach(([key, val]) => {
        numericPortCount[key] = Number(val);
      });

      console.log("🔧 Final Port Count:", numericPortCount);
      fd.append("portCount", JSON.stringify(numericPortCount));

      const data = await createProduct(fd).unwrap();
      toast.success(`${data.name} created`);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Product creation failed");
    }
  };

  const renderEnumSelects = () =>
    Object.entries(enumState).map(([field, [value, setter, key]]) => (
      <div key={field} className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 capitalize">
          {field.replace(/([A-Z])/g, " $1").trim()}
        </label>
        <select
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-white text-gray-700"
          value={value}
          onChange={(e) => setter(e.target.value)}
        >
          <option value="">Select {field.replace(/([A-Z])/g, " $1").trim()}</option>
          {enums[key]?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">Create New Product</h1>
          <p className="text-gray-600">Add a new product to your inventory</p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Product Information</h2>
          </div>

          <div className="p-8">
            {/* Image Preview Section */}
            {previewUrls.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Image Preview</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {previewUrls.map((src, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={src}
                        alt={`preview-${idx}`}
                        className="w-24 h-24 object-cover rounded-lg border-2 border-red-200 shadow-md group-hover:shadow-lg transition-shadow duration-200"
                      />
                      <div className="absolute inset-0 bg-red-600 bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* File Upload Section */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Product Images</label>
              <div className="relative">
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-red-300 rounded-lg cursor-pointer bg-red-50 hover:bg-red-100 transition-colors duration-200"
                >
                  <div className="text-center">
                    <svg className="w-8 h-8 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <p className="text-sm font-medium text-red-600">
                      {images.length > 0
                        ? `${images.length} image${images.length > 1 ? "s" : ""} selected`
                        : "Click to upload images"}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Product Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter product name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Category</label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-white"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 resize-none"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                  />
                </div>

                <div className="mt-6 space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Detailed Description</label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 resize-none"
                    rows="3"
                    value={detailedDescription}
                    onChange={(e) => setDetailedDescription(e.target.value)}
                    placeholder="Enter detailed product description"
                  />
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Pricing & Inventory</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Purchase Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Original Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Stock Quantity</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Vendor</label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-white"
                      value={selectedVendorId}
                      onChange={(e) => setSelectedVendorId(e.target.value)}
                    >
                      <option value="">Select Vendor</option>
                      {vendors.map((v) => (
                        <option key={v._id} value={v._id}>
                          {v.username}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderEnumSelects()}
                </div>
              </div>

              {/* Additional Details */}
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Additional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Processor</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                      value={processor}
                      onChange={(e) => setProcessor(e.target.value)}
                      placeholder="Enter processor details"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Warranty</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                      value={warranty}
                      onChange={(e) => setWarranty(e.target.value)}
                      placeholder="Enter warranty period"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="0.0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Dimensions (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="0.0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">S-Type</label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-white"
                      value={s_type}
                      onChange={(e) => setSType(e.target.value)}
                    >
                      <option value="">Select S-Type</option>
                      {enums.s_types?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Ports Configuration */}
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Ports Configuration</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Select port type and specify the number of each port available
                  </p>

                  <div className="space-y-4">
                    {ports.map((port, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center bg-white p-4 rounded-lg border border-gray-200">
                        {/* Port Type Select */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Port Type</label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-200 transition-all duration-200 bg-white"
                            value={port.type}
                            onChange={(e) => {
                              const updatedPorts = [...ports];
                              updatedPorts[index].type = e.target.value;
                              setPorts(updatedPorts);
                            }}
                          >
                            <option value="">Select Port</option>
                            {["USB", "HDMI", "C_Type", "Ethernet", "Audio Jack", "VGA"].map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>

                        {/* Port Quantity Input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                          <input
                            type="number"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-200 transition-all duration-200"
                            value={port.quantity}
                            onChange={(e) => {
                              const updatedPorts = [...ports];
                              updatedPorts[index].quantity = Number(e.target.value);
                              setPorts(updatedPorts);

                              setPortCount((prev) => ({
                                ...prev,
                                [port.type]: Number(e.target.value),
                              }));
                            }}
                          />
                        </div>

                        {/* Remove Button */}
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="bg-red-100 text-red-600 px-3 py-2 rounded-md hover:bg-red-200 transition-all"
                            onClick={() => {
                              const updatedPorts = ports.filter((_, i) => i !== index);
                              setPorts(updatedPorts);

                              setPortCount((prev) => {
                                const newPortCount = { ...prev };
                                delete newPortCount[port.type];
                                return newPortCount;
                              });
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Add New Port Button */}
                    <button
                      type="button"
                      className="bg-green-100 text-green-600 px-4 py-2 rounded-md hover:bg-green-200 transition-all"
                      onClick={() =>
                        setPorts((prev) => [...prev, { type: "", quantity: 0 }])
                      }
                    >
                      + Add Port
                    </button>
                  </div>
                </div>
              </div>


              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Product
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;