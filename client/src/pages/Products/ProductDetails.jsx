import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaArrowLeft,
  FaPlug,
  FaListUl,
  FaWeightHanging,
  FaRulerCombined,
  FaTag,
  FaShieldAlt,
  FaTruck,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaInfoCircle,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
const submitHandler = async (e) => {
  e.preventDefault();
  if (rating < 1 || rating > 5) {
    return toast.error("Please select a rating between 1 and 5.");
  }
  if (!comment.trim()) {
    return toast.error("Please provide a comment.");
  }

  try {
    await createReview({
      productId,
      rating,
      comment,
    }).unwrap();

    refetch();
    setRating(0);
    setComment("");
    toast.success("Review created successfully");
  } catch (err) {
    const msg =
      err?.data?.message ||
      err?.data ||
      err.error ||
      err.message ||
      "Failed to submit review";
    toast.error(msg);
  }
};


  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const nextImage = () => {
    if (product?.images?.length > 1) {
      setCurrentImgIdx((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images?.length > 1) {
      setCurrentImgIdx((prev) =>
        (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  const specs = product
    ? [
        { label: "Screen Size", value: product.screenSize },
        { label: "RAM", value: product.RAM },
        { label: "Storage", value: product.storage },
        { label: "Processor", value: product.processor },
        { label: "Color", value: product.color },
        { label: "Keyboard", value: product.keyboard },
        { label: "Adapter", value: product.adapter },
        { label: "Warranty", value: product.warranty },
        { label: "Fingerprint", value: product.fingerprint },
        {
          label: "Weight",
          value: product.weight ? `${product.weight} kg` : undefined,
        },
        {
          label: "Dimensions",
          value: product.dimensions ? `${product.dimensions} cm` : undefined,
        },
        { label: "S-Type", value: product.s_type },
      ].filter((item) => item.value)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[500px]">
          <Loader />
        </div>
      ) : error ? (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Message variant="danger">
            {error?.data?.message || error?.message || "Something went wrong"
 || "Something went wrong"
}
          </Message>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Main Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Product Images */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="aspect-square bg-gray-50 rounded-lg relative overflow-hidden">
                  <img
                    src={product.images?.[currentImgIdx]}
                    alt={`product-${currentImgIdx}`}
                    className="w-full h-full object-contain"
                  />

                  {/* Heart Icon */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white rounded-full p-2 shadow-md">
                      <HeartIcon product={product} />
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  {product.images?.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white hover:bg-red-50 border rounded-full p-2 shadow-md"
                      >
                        <FaChevronLeft className="w-4 h-4 text-red-600" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white hover:bg-red-50 border rounded-full p-2 shadow-md"
                      >
                        <FaChevronRight className="w-4 h-4 text-red-600" />
                      </button>
                    </>
                  )}
                </div>

                {/* Image Dots */}
                {product.images?.length > 1 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    {product.images?.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImgIdx(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          currentImgIdx === idx ? "bg-red-600" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Product Title & Brand */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>
                
                {product.brand && (
                  <div className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 rounded-full border border-red-200 text-sm">
                    <FaStore className="mr-2" />
                    {product.brand}
                  </div>
                )}

                {/* Short Description */}
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Rating */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  
                  {/* Pricing */}
                  <div>
                    <div className="flex items-baseline space-x-3">
                      <span className="text-3xl font-bold text-gray-900">₹{product.price?.toLocaleString()}</span>
                      {product.originalPrice && (
                        <>
                          <span className="text-lg text-gray-500 line-through">
                            ₹{product.originalPrice?.toLocaleString()}
                          </span>
                          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </span>
                        </>
                      )}
                    </div>
                    {product.purchasePrice && (
                      <div className="text-sm text-gray-500 mt-1">
                        Cost: ₹{product.purchasePrice?.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="text-right">
                    <Ratings
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                
                {/* Stock Status */}
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.stock > 0 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      product.stock > 0 ? "bg-green-500" : "bg-red-500"
                    }`}></div>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center space-x-6 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaTruck className="mr-2 text-red-500" />
                    Free Shipping
                  </div>
                  <div className="flex items-center">
                    <FaShieldAlt className="mr-2 text-red-500" />
                    Warranty
                  </div>
                  <div className="flex items-center">
                    <FaCheck className="mr-2 text-red-500" />
                    Authentic
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                {product.stock > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={addToCartHandler}
                  disabled={product.stock === 0}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors flex items-center justify-center space-x-3 ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  <FaShoppingCart />
                  <span>
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </span>
                </button>
              </div>

             {/* Quick Info Grid */}
<div className="grid grid-cols-2 gap-4">
  {product.category?.name && (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center text-red-600 mb-1">
        <FaListUl className="mr-2" />
        <span className="text-xs font-medium uppercase">Category</span>
      </div>
      <p className="font-semibold text-gray-900">{product.category.name}</p>
    </div>
  )}

  {product.vendor?.username && (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center text-red-600 mb-1">
        <FaStore className="mr-2" />
        <span className="text-xs font-medium uppercase">Vendor</span>
      </div>
      <p className="font-semibold text-gray-900">{product.vendor.username}</p>
    </div>
  )}
</div>

            </div>
          </div>

          {product.detailedDescription && (
            <div className="mt-8 bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaInfoCircle className="mr-3 text-red-600" />
                  Product Details
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.detailedDescription}
                </p>
              </div>
            </div>
          )}

          {/* Specifications */}
          {specs.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Specifications</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {specs.map((spec) => (
                    <div key={spec.label} className="p-4 bg-gray-50 rounded-lg border">
                      <p className="text-sm text-gray-600 mb-1">{spec.label}</p>
                      <p className="font-semibold text-gray-900">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Ports */}
          {product.ports?.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Available Ports</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.ports.map((port) => (
                    <div key={port} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaPlug className="mr-2 text-red-500" />
                          <span className="font-medium">{port}</span>
                        </div>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                          {product.portCount?.[port] || 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Tabs */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;