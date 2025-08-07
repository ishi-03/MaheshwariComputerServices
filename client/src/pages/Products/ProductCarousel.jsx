
// Updated ProductCarousel.jsx
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaBox, FaClock, FaStar, FaStore } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error ,isError} = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="w-[60%] bg-white rounded-xl shadow-lg p-6">
      {isLoading ? null : error ? (
      <Message variant="danger">
  {error?.data?.message || error?.error || "Something went wrong."}
</Message>
      ) : (
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id} className="px-4">
              <img
                                            src={product.images?.[0] || product.image
}
                alt={product.name}
                className="w-full h-[24rem] object-cover rounded-lg"
              />
              <div className="mt-4 text-red-700">
                <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
                <p className="text-lg mb-3">$ {product.price}</p>
                <p className="text-gray-700 mb-4">
                  {product.description.substring(0, 140)}...
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                  <p className="flex items-center gap-2">
                    <FaStore /> Brand: {product.brand}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock /> Added: {moment(product.createdAt).fromNow()}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaStar /> Reviews: {product.numReviews}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaBox /> In Stock: {product.stock}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;