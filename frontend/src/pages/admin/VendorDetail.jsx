import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetVendorDetailsQuery } from "../../redux/api/vendorApiSlice.js";
import { useRestockProductMutation } from "../../redux/api/restockApiSlice.js";
import { toast } from "react-toastify";

// Utility to group products by category
const groupProductsByCategory = (products) => {
  return products.reduce((acc, product) => {
    const categoryName = product.category?.name || "Uncategorized";
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(product);
    return acc;
  }, {});
};

const VendorDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetVendorDetailsQuery(id);
  const [restockQuantity, setRestockQuantity] = useState({});
  const [restockProduct] = useRestockProductMutation();

  const handleRestock = async (productId) => {
    const quantity = parseInt(restockQuantity[productId]);
    if (!quantity || quantity <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    const confirm = window.confirm(`Are you sure you want to restock ${quantity} units?`);
    if (!confirm) return;

    try {
      await restockProduct({ productId, vendorId: id, quantity }).unwrap();
      toast.success("Product restocked successfully");
      setRestockQuantity((prev) => ({ ...prev, [productId]: "" }));
      refetch(); // Refresh data after restocking
    } catch (err) {
      toast.error("Failed to restock product");
    }
  };

  if (isLoading) return <p className="text-white pl-60 py-10">Loading...</p>;
  if (error) return <p className="text-red-500 pl-60 py-10">Error loading vendor details</p>;

  const { vendor, products } = data;
  const groupedProducts = groupProductsByCategory(products);

  return (
    <div className="min-h-screen pl-60 py-10 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="px-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-6 border-b border-gray-700 pb-2">Vendor Details</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <p className="text-xl mb-2"><span className="font-semibold text-gray-300">Name:</span> {vendor.username}</p>
          <p className="text-xl"><span className="font-semibold text-gray-300">Email:</span> {vendor.email}</p>
        </div>

        <h3 className="text-3xl font-bold mb-6">Products by Category</h3>
        {products.length === 0 ? (
          <p className="text-gray-400">No products found in this category.</p>
        ) : (
          Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-10">
              <h4 className="text-2xl font-semibold mb-4 text-cyan-400">{category}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((product) => (
                  <div key={product._id} className="bg-white text-black p-4 rounded-lg shadow-md hover:shadow-xl">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover mb-3 rounded"
                      />
                    )}
                    <h4 className="font-bold text-xl mb-1">{product.name}</h4>
                    <p className="text-gray-700 mb-1">Price: ₹{product.price}</p>
                    <p className="text-gray-700 mb-1">Stock: {product.stock}</p>
                    {product.purchasePrice && (
                      <p className="text-gray-600">
                        Purchased Price: ₹{product.purchasePrice}
                      </p>
                    )}
                    <input
                      type="number"
                      min="1"
                      value={restockQuantity[product._id] || ""}
                      onChange={(e) =>
                        setRestockQuantity({ ...restockQuantity, [product._id]: e.target.value })
                      }
                      placeholder="Enter quantity"
                      className="mt-3 w-full px-3 py-2 border rounded"
                    />
                    <button
                      onClick={() => handleRestock(product._id)}
                      className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                      Restock
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VendorDetail;
