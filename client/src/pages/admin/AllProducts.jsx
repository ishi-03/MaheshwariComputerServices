import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import { 
  FiEdit, 
  FiPackage, 
  FiCalendar, 
  FiDollarSign, 
  FiGrid,
  FiSearch,
  FiFilter,
  FiEye,
  FiShoppingBag,
  FiTrendingUp
} from "react-icons/fi";
import { useState } from "react";
// import AdminProductUpdate from "./ProductUpdate";
const AllProducts = () => {
  const { data: products, isLoading, error } = useAllProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price":
        return a.price - b.price;
      case "date":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200 border-t-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-xl p-8 text-center max-w-md">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FiPackage className="text-red-500 text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600">We couldn't load the products. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="w-48 fixed"></div>
      <div className="px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 p-3 rounded-full">
                <FiShoppingBag className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Product Inventory</h1>
                <p className="text-gray-600 mt-2">Manage and monitor your product catalog</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-red-500">{sortedProducts.length}</div>
              <div className="text-gray-600">{sortedProducts.length === 1 ? 'Product' : 'Products'}</div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiFilter className="text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="date">Sort by Date</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid" 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  <FiPackage />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <FiTrendingUp className="mr-2" />
              Product Catalog
            </h2>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="bg-red-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <FiPackage className="text-red-500 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {searchTerm ? "No products found" : "No products yet"}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? "Try adjusting your search terms to find what you're looking for."
                  : "Create your first product to get started with your inventory management."}
              </p>
              {!searchTerm && (
                <Link
                  to="/admin/productlist"
                  className="inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  <FiPackage className="mr-2" />
                  Add First Product
                </Link>
              )}
            </div>
          ) : (
            <div className="p-6">
              {viewMode === "grid" ? (
                <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                  {sortedProducts.map((product) => (
                    <div 
                      key={product?._id} 
                      className="group bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-red-200 transform hover:scale-[1.02]"
                    >
                      <Link to={`/product/${product?._id}`}>
                        <div className="relative overflow-hidden">
                          <div className="aspect-square bg-gray-100">
                            <img
                              src={product.images?.[0] || product.image}
                              alt={product?.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                e.target.src = '/api/placeholder/300/300';
                              }}
                            />
                          </div>
                          <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <FiEye className="text-red-500" />
                          </div>
                        </div>
                      </Link>

                      <div className="p-6">
                        <Link to={`/product/${product?._id}`}>
                          <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-red-600 transition-colors duration-200">
                            {product?.name}
                          </h3>
                        </Link>

                        <div className="bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg mt-2">
                          ₹{product?.price}
                        </div>

                        <p className="text-gray-600 mb-4 text-sm line-clamp-2 leading-relaxed">
                          {product?.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-gray-500 text-sm">
                            <FiCalendar className="mr-2" />
                            <span>{moment(product?.createdAt).format("MMM D, YYYY")}</span>
                          </div>
                          <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            In Stock
                          </div>
                        </div>

                        <Link
                          to={`/admin/product/update/${product?._id}`}
                          className="group/btn w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:from-red-600 hover:to-red-700 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
                        >
                          <FiEdit className="mr-2 group-hover/btn:rotate-12 transition-transform duration-200" />
                          Update Product
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedProducts.map((product, index) => (
                    <div
                      key={product?._id}
                      className={`flex items-center p-4 rounded-xl border transition-all duration-200 hover:bg-red-50 hover:border-red-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <Link to={`/product/${product?._id}`}>
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                          <img
                            src={product.images?.[0] || product.image}
                            alt={product?.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/api/placeholder/64/64';
                            }}
                          />
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${product?._id}`}>
                          <h3 className="font-semibold text-gray-800 truncate hover:text-red-600">
                            {product?.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm truncate">{product?.description}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <FiCalendar className="mr-1" />
                          <span>{moment(product?.createdAt).format("MMM D, YYYY")}</span>
                        </div>
                      </div>
                      <div className="text-right mr-4">
                        <div className="font-bold text-red-600 text-lg">₹{product?.price}</div>
                        <div className="text-xs text-green-600 font-medium">In Stock</div>
                      </div>
                      <Link
                        to={`/admin/product/update/${product?._id}`}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center"
                      >
                        <FiEdit className="mr-2" />
                        Edit
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
