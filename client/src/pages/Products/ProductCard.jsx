import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Calculate MRP (60% higher than price)
const originalPrice = p.originalPrice;
const discountPercentage = Math.round(((originalPrice - p.price) / originalPrice) * 100);

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden max-w-sm relative border border-gray-100 hover:border-red-200">
      {/* Tag */}
      {p?.tag && (
        <span className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 shadow-md">
          {p.tag}
        </span>
      )}

      {/* Discount Badge */}
      <span className="absolute top-3 right-14 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
        -{discountPercentage}%
      </span>

      {/* Wishlist Icon */}
      <div className="absolute top-3 right-3 z-10">
        <HeartIcon product={p} />
      </div>

      {/* Product Image */}
      <Link to={`/product/${p._id}`} className="block relative overflow-hidden">
        <img
          src={p.images?.[0]}
          alt={p.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </Link>

      <div className="p-5">
        {/* Category */}
        <p className="text-xs text-red-600 uppercase font-bold tracking-wider mb-2 bg-red-50 px-2 py-1 rounded-md inline-block">
          {p.category || "High-Performance Laptop"}
        </p>

        {/* Name */}
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {p.name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
          {p.description?.substring(0, 80)}...
        </p>

        {/* Feature Badges */}
        {p.features && p.features.length > 0 && (
          <div className="flex gap-1 flex-wrap text-xs mb-4">
            {p.features?.slice(0, 3).map((feature, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full border"
              >
                {feature}
              </span>
            ))}
            {p.features.length > 3 && (
              <span className="bg-red-50 text-red-600 px-2 py-1 rounded-full border border-red-200">
                +{p.features.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm line-through text-gray-400">
              ₹{originalPrice.toLocaleString("en-IN")}
            </p>
            <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded">
              Save ₹{(originalPrice - p.price).toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ₹{p.price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Reviews */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} size={14} />
              ))}
            </div>
            <p className="text-sm text-gray-600">({p.reviews?.length || 0})</p>
          </div>
          {p.stock > 0 ? (
            <p className="text-green-600 font-semibold text-sm">In Stock</p>
          ) : (
            <p className="text-red-600 font-semibold text-sm">Out of Stock</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Add to Cart Button */}
          <button
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => addToCartHandler(p, 1)}
            disabled={p.stock === 0}
          >
            <AiOutlineShoppingCart size={18} />
            {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* View Details Button */}
          <Link
            to={`/product/${p._id}`}
            className="w-full bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <AiOutlineEye size={18} />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;