import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const SmallProduct = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const addToCartHandler = (product, qty) => {
    const isInCart = cartItems.find((item) => item._id === product._id);
    if (isInCart) {
      toast.info("Item is already in your cart", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      dispatch(addToCart({ ...product, qty }));
      toast.success("Item added successfully", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="group w-[20rem] bg-white shadow-sm hover:shadow-xl rounded-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border border-gray-100 hover:border-red-100">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.images?.[0] || product.image}
          alt={product.name}
          className="w-full h-[14rem] object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Heart Icon */}
        <div className="absolute top-4 right-4 z-10">
          <HeartIcon product={product} />
        </div>

        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Link
            to={`/product/${product._id}`}
            className="bg-white text-red-600 font-medium px-6 py-2.5 rounded-md shadow-lg hover:shadow-xl border border-red-100 hover:bg-red-50 transform hover:scale-105 transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 space-y-4">
        {/* Product Name */}
        <Link to={`/product/${product._id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Brand */}
        {product.brand && (
          <div className="text-sm text-gray-500 font-medium">
            {product.brand}
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-red-600">
            ${product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            </>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCartHandler(product, 1)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2 5m2-5v5a2 2 0 002 2h8a2 2 0 002-2v-5m-8 0V9a2 2 0 114 0v4.01"
              />
            </svg>
            <span>Add to Cart</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SmallProduct;