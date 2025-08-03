import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="bg-white">
      {/* Tab Navigation */}
      <div className="border-b border-red-100 mb-6">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => handleTabClick(1)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 1
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Write Your Review
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 2
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All Reviews ({product.reviews?.length || 0})
          </button>
          <button
            onClick={() => handleTabClick(3)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 3
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Related Products
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {/* Write Review Tab */}
        {activeTab === 1 && (
          <div className="max-w-2xl">
            {userInfo ? (
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Share Your Experience
                </h3>
                <form onSubmit={submitHandler}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <select
                        id="rating"
                        required
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-black"
                      >
                        <option value="">Select your rating</option>
                        <option value="1">1 - Inferior</option>
                        <option value="2">2 - Decent</option>
                        <option value="3">3 - Great</option>
                        <option value="4">4 - Excellent</option>
                        <option value="5">5 - Exceptional</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                      </label>
                      <textarea
                        id="comment"
                        rows="4"
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us about your experience with this product..."
                        className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none text-black"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loadingProductReview}
                      className={`w-full sm:w-auto py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                        loadingProductReview
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-0.5"
                      }`}
                    >
                      {loadingProductReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                <div className="max-w-sm mx-auto">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Sign in to write a review
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Share your experience with other customers
                  </p>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* All Reviews Tab */}
        {activeTab === 2 && (
          <div>
            {product.reviews?.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                <div className="max-w-sm mx-auto">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No reviews yet
                  </h3>
                  <p className="text-gray-600">
                    Be the first to share your experience with this product.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Customer Reviews ({product.reviews.length})
                </h3>
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-white border border-red-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <p className="text-sm text-gray-500">
                            {review.createdAt.substring(0, 10)}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <Ratings value={review.rating} />
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Related Products Tab */}
        {activeTab === 3 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              You Might Also Like
            </h3>
            {!data ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <Loader />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map((product) => (
                  <div 
                    key={product._id}
                    className="bg-white rounded-xl border border-red-100 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <SmallProduct product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;