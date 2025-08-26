import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading) {
      let filtered = filteredProductsQuery.data;

      if (checked.length > 0) {
        filtered = filtered.filter((product) => checked.includes(product.category));
      }

      if (minPrice !== "" || maxPrice !== "") {
        filtered = filtered.filter((product) => {
          const price = product.price;
          const min = minPrice !== "" ? parseFloat(minPrice) : 0;
          const max = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;
          return price >= min && price <= max;
        });
      }

      dispatch(setProducts(filtered));
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, minPrice, maxPrice]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-red-50/20 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-red-800 bg-clip-text text-transparent">
              Shop
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full border">
                {products?.length} products found
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-8">
          {/* Sidebar - Reduced width */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-24 overflow-hidden">
              {/* Categories */}
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  Categories
                </h3>
                <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-gray-100">
                  {categories?.map((c) => (
                    <label key={c._id} className="flex items-center cursor-pointer group hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-red-700 font-medium">
                        {c.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  Brands
                </h3>
                <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-gray-100">
                  {uniqueBrands?.map((brand) => (
                    <label key={brand} className="flex items-center cursor-pointer group hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <input
                        type="radio"
                        id={brand}
                        name="brand"
                        onChange={() => handleBrandClick(brand)}
                        className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-red-700 font-medium">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  Price Range
                </h3>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50 hover:bg-white transition-colors"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50 hover:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="p-6">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid - Increased width */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            {filteredProductsQuery.isLoading ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
                <div className="text-center">
                  <Loader />
                  <p className="mt-4 text-gray-500 text-lg">Loading products...</p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1M7 7h.01M17 7h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {products?.map((p) => (
                  <ProductCard key={p._id} p={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;