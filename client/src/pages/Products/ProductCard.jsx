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
    <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden w-full max-w-md mx-auto relative border border-gray-50 hover:border-red-100 hover:-translate-y-2">
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Tag */}
      {p?.tag && (
        <span className="absolute top-4 left-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white text-xs font-bold px-4 py-2 rounded-full z-20 shadow-lg backdrop-blur-sm border border-red-400/20">
          <span className="relative z-10">{p.tag}</span>
          <div className="absolute inset-0 bg-white/10 rounded-full"></div>
        </span>
      )}

      {/* Discount Badge */}
      <span className="absolute top-4 right-16 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold px-3 py-2 rounded-full z-20 shadow-lg border-2 border-white/20">
        -{discountPercentage}%
      </span>

      {/* Wishlist Icon */}
      <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-100">
        <HeartIcon product={p} />
      </div>

      {/* Product Image Container */}
      <Link to={`/product/${p._id}`} className="block relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative h-64 overflow-hidden">
          <img
            src={p.images?.[0]}
            alt={p.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 backdrop-blur-[1px]">
            <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl border border-gray-200 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <AiOutlineEye className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </Link>

      <div className="p-6 relative z-10">
        {/* Category */}
        <div className="mb-3">
          <span className="text-xs text-red-700 uppercase font-bold tracking-wider bg-red-50 px-3 py-1.5 rounded-full inline-block border border-red-100 shadow-sm">
            {p.category || "High-Performance Laptop"}
          </span>
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] leading-tight">
          {p.name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[3.75rem] leading-relaxed">
          {p.description?.substring(0, 120)}...
        </p>

        {/* Feature Badges */}
        {p.features && p.features.length > 0 && (
          <div className="flex gap-2 flex-wrap text-xs mb-5">
            {p.features?.slice(0, 3).map((feature, i) => (
              <span
                key={i}
                className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                {feature}
              </span>
            ))}
            {p.features.length > 3 && (
              <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-full border border-red-200 font-semibold">
                +{p.features.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="mb-5 p-4 bg-gradient-to-r from-gray-50 to-red-50/30 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <p className="text-sm line-through text-gray-500 font-medium">
                ₹{originalPrice.toLocaleString("en-IN")}
              </p>
              <span className="text-xs text-red-700 font-bold bg-red-100 px-2 py-1 rounded-md border border-red-200">
                Save ₹{(originalPrice - p.price).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">
            ₹{p.price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Reviews and Stock */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} size={16} className="drop-shadow-sm" />
              ))}
            </div>
            <p className="text-sm text-gray-600 font-medium">({p.reviews?.length || 0} reviews)</p>
          </div>
          {p.stock > 0 ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-700 font-bold text-sm">In Stock</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p className="text-red-700 font-bold text-sm">Out of Stock</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Add to Cart Button */}
          <button
            className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group/button"
            onClick={() => addToCartHandler(p, 1)}
            disabled={p.stock === 0}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-1000"></div>
            <AiOutlineShoppingCart size={20} className="relative z-10" />
            <span className="relative z-10">
              {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </span>
          </button>

          {/* View Details Button */}
          <Link
            to={`/product/${p._id}`}
            className="w-full bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg relative overflow-hidden group/link"
          >
            <div className="absolute inset-0 bg-red-600 translate-x-[-100%] group-hover/link:translate-x-0 transition-transform duration-300 ease-out"></div>
            <AiOutlineEye size={20} className="relative z-10" />
            <span className="relative z-10">View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;