import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/cartSlice";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const addToCartHandler = () => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      toast.info("Item is already in your cart", { autoClose: 2000 });
    } else {
      dispatch(addToCart({ ...product, qty: 1 }));
      toast.success("Item added successfully", { autoClose: 2000 });
    }
  };
console.log("Product object:", product);

  return (
    <div className="w-[18rem] sm:w-[20rem] p-3 relative border rounded-lg shadow-lg overflow-hidden bg-white">
      <Link to={`/product/${product._id}`}>
        <div className="relative">
         <img
        src={product.images?.[0] || product.image}
  alt={product.name}
  className="w-full h-[20rem] object-cover rounded"
/>

          <div className="absolute top-2 right-2 z-10">
            <HeartIcon product={product} />
          </div>
        </div>

        <div className="p-4">
          <h2 className="flex justify-between items-center">
            <div className="text-lg font-semibold">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              ₹ {product.price}
            </span>
          </h2>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={addToCartHandler}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
