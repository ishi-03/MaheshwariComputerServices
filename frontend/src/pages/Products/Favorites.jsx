import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { Heart, HeartOff } from "lucide-react";
import { useNavigate } from "react-router";
const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-600 fill-current" />
            <h1 className="text-4xl font-bold text-gray-800">
              Your Favorites
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover your handpicked collection of favorite products
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Products Section */}
        {favorites.length > 0 ? (
          <>
            {/* Stats Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-red-100 p-4 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                  <span className="text-gray-700 font-medium">
                    {favorites.length}{" "}
                    {favorites.length === 1 ? "Product" : "Products"} in your
                    favorites
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <div
                  key={product._id}
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Product product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <HeartOff className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              No Favorites Yet
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Start exploring our products and add items to your favorites by
              clicking the heart icon.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default Favorites;