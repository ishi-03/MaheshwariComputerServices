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
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden w-full max-w-lg relative border border-gray-200 hover:border-red-300 backdrop-blur-sm">
      {/* Tag */}
      {p?.tag && (
        <span className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 shadow-lg">
          {p.tag}
        </span>
      )}

      {/* Discount Badge */}
      <span className="absolute top-4 right-16 bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg">
        -{discountPercentage}%
      </span>

      {/* Wishlist Icon */}
      <div className="absolute top-4 right-4 z-10">
        <HeartIcon product={p} />
      </div>

      {/* Product Image */}
      <Link to={`/product/${p._id}`} className="block relative overflow-hidden">
        <img
          src={p.images?.[0]}
          alt={p.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Link>

              <div className="p-8">
        {/* Category */}
        <p className="text-xs text-red-700 uppercase font-bold tracking-wider mb-3 bg-red-50 px-4 py-2 rounded-lg inline-block border border-red-200">
          {p.category || "High-Performance Laptop"}
        </p>

        {/* Name */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] leading-tight">
          {p.name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {p.description?.substring(0, 80)}...
        </p>

        {/* Feature Badges */}
        {p.features && p.features.length > 0 && (
          <div className="flex gap-2 flex-wrap text-xs mb-5">
            {p.features?.slice(0, 4).map((feature, i) => (
              <span
                key={i}
                className="bg-red-50 text-red-700 px-3 py-1.5 rounded-full border border-red-200 hover:bg-red-100 transition-colors duration-200"
              >
                {feature}
              </span>
            ))}
            {p.features.length > 4 && (
              <span className="bg-red-600 text-white px-3 py-1.5 rounded-full border border-red-600 hover:bg-red-700 transition-colors duration-200">
                +{p.features.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-sm line-through text-gray-400 font-medium">
              ₹{originalPrice.toLocaleString("en-IN")}
            </p>
            <span className="text-xs text-green-700 font-semibold bg-gradient-to-r from-green-50 to-green-100 px-3 py-1 rounded-full border border-green-200">
              Save ₹{(originalPrice - p.price).toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ₹{p.price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Reviews */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} size={16} />
              ))}
            </div>
            <p className="text-sm text-gray-600 font-medium">({p.reviews?.length || 0})</p>
          </div>
          {p.stock > 0 ? (
            <p className="text-green-600 font-semibold text-sm bg-green-50 px-3 py-1 rounded-full border border-green-200">
              In Stock
            </p>
          ) : (
            <p className="text-red-600 font-semibold text-sm bg-red-50 px-3 py-1 rounded-full border border-red-200">
              Out of Stock
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Add to Cart Button */}
          <button
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={() => addToCartHandler(p, 1)}
            disabled={p.stock === 0}
          >
            <AiOutlineShoppingCart size={20} />
            {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* View Details Button */}
          <Link
            to={`/product/${p._id}`}
            className="w-full bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
          >
            <AiOutlineEye size={20} />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;