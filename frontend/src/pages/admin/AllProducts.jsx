import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) return <div className="text-center text-lg mt-10">Loading...</div>;
  if (isError) return <div className="text-center text-lg text-red-500">Error loading products</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="absolute top-0 right-0 p-4">
        <AdminMenu />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-10 py-6 ml-8">
        {/* Header */}
        <h2 className="text-xl font-bold bg-gray-900 text-white py-3 text-center rounded-lg mb-6">
          All Products ({products?.length})
        </h2>

        {/* Product List */}
        <div className="flex flex-col gap-6">
          {products?.map((product) => (
            <div key={product?._id} className="flex bg-gray-100 shadow-md rounded-xl p-6">
              {/* Product Image */}
              <div className="w-32 h-32 flex-shrink-0 bg-white p-3 rounded-lg">
                <img 
                  src={product?.image} 
                  alt={product?.name} 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 px-8 flex flex-col justify-between">
                <div>
                  <h5 className="text-lg text-[#232332] font-semibold">{product?.name}</h5>
                  <p className="text-gray-500 text-sm">{product?.description?.substring(0, 50)}...</p>
                </div>

                <p className="text-gray-400 text-xs">{moment(product?.createdAt).format("MMMM Do YYYY")}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col text-[#232332] items-end justify-between">
                <p className="text-lg font-bold"> ₹{product?.price}</p>
                
                <Link 
                  to={`/admin/product/update/${product?._id}`} 
                  className="px-5 py-3 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800 transition"
                >
                  Update Product →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
