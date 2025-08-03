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
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Shop</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{products?.length} products found</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories?.map((c) => (
                    <label key={c._id} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                        {c.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Brands</h3>
                <div className="space-y-3">
                  {uniqueBrands?.map((brand) => (
                    <label key={brand} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        id={brand}
                        name="brand"
                        onChange={() => handleBrandClick(brand)}
                        className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="p-6">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 mt-8 lg:mt-0">
            {filteredProductsQuery.isLoading ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                <div className="text-center">
                  <Loader />
                  <p className="mt-4 text-gray-500">Loading products...</p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                <div className="text-center text-gray-600 text-lg">
                  No products found.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((p) => (
                  <div key={p._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <ProductCard p={p} />
                  </div>
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