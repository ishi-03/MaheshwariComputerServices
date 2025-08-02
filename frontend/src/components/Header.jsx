import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <h1 className="text-red-600 font-bold text-xl">ERROR</h1>;

  return (
    <div className="flex justify-end pr-10 pt-8">
      <div className="hidden xl:block lg:block mr-10">
        <div className="grid grid-cols-1 gap-6">
          {data.slice(0, 2).map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
      </div>

      <ProductCarousel  />
    </div>
  );
};

export default Header;