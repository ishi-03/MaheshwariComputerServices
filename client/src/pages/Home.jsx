import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword && (
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <Header />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <Loader />
            <p className="text-gray-500 mt-4">Loading amazing products...</p>
          </div>
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <Message variant="danger">
              {isError?.data.message || isError.error}
            </Message>
          </div>
        </div>
      ) : (
        <div className="px-6 py-12 max-w-7xl mx-auto">
          {data?.products?.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-red-600 mb-4">No Products Available</h2>
              <p className="text-gray-500 text-lg">The store is currently empty. Please check back later!</p>
            </div>
          ) : (
            <>
              {/* Enhanced Products Section */}
              <div className="mb-12">
                <div className="relative bg-white rounded-3xl shadow-xl border border-red-100 p-10 mb-10">
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-20 blur-2xl"></div>

                  <div className="relative flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex flex-col space-y-2">
                        <div className="w-1 h-8 bg-red-600 rounded-full"></div>
                        <div className="w-1 h-12 bg-red-700 rounded-full"></div>
                        <div className="w-1 h-6 bg-red-800 rounded-full"></div>
                      </div>
                      <div>
                        <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-3">
                          Special Products
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-600">
                          Discover our premium collection of tech solutions
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="w-2 h-2 bg-red-600 rounded-full"></div>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">Curated Excellence</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/shop"
                      className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-2xl py-5 px-12 shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center space-x-3">
                        <span className="text-lg">Explore Shop</span>
                        <svg
                          className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
