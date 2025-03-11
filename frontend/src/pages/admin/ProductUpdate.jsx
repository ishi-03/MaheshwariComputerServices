import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const { data } = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Product successfully updated");
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this product?"))
        return;
      const { data } = await deleteProduct(params._id);
      toast.success(`${data.name} is deleted`);
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="flex flex-row gap-4 w-full max-w-5xl">
        <AdminMenu />
        <div className="flex-1 bg-gray-900 p-6 rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Update / Delete Product
          </h2>

          <div className="flex gap-4 items-start">
            {image && (
              <img
                src={image}
                alt="product"
                className="w-48 h-48 rounded-lg shadow-lg object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={uploadFileHandler}
              className="p-2 border rounded-lg bg-gray-800 text-white cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Name"
              className="p-3 border rounded-lg bg-gray-800 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className="p-3 border rounded-lg bg-gray-800 text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="p-3 border rounded-lg bg-gray-800 text-white"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Brand"
              className="p-3 border rounded-lg bg-gray-800 text-white"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded-lg bg-gray-800 text-white mt-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="mt-4">
            <select
              className="w-full p-3 border rounded-lg bg-gray-800 text-white"
              value={category} // This ensures the correct category is selected
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 rounded-lg bg-green-600 font-bold"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-3 rounded-lg bg-red-600 font-bold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
