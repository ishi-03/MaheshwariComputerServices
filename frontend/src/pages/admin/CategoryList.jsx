import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice.js";
import CategoryForm from "../../components/CategoryForm.jsx";
import Modal from "../../components/Modal.jsx";
import kitchenImage from "../../assets/kitchen.jpg";
import AdminMenu from "./AdminMenu.jsx";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      setName("");
      toast.success(`${result.name} is created.`);
    } catch (error) {
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();
      toast.success(`${result.name} is updated`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    try {
      const categoryName = selectedCategory.name; // Store name before deletion
      await deleteCategory(selectedCategory._id).unwrap();
      toast.success(`${categoryName} is deleted.`);

      setSelectedCategory(null);
      setModalVisible(false);
    } catch (error) {
      toast.error("Category deletion failed. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center py-10">
      {/* Background Image with Blur & Overlay */}
      <AdminMenu/>
      <div
        className="absolute inset-0 bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-[hsla(60, 55.60%, 91.20%, 0.60)] before:backdrop-blur-sm"
        style={{ backgroundImage: `url(${kitchenImage})` }}      />

      {/* Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-md">
          Manage Categories
        </h1>

        {/* Category Form */}
        <div className="w-full max-w-md bg-white bg-opacity-80 shadow-lg rounded-xl p-6 border border-[#323232]">
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
          />
        </div>

        {/* Category List */}
        <div className="w-full max-w-5xl mt-10 flex flex-col items-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {categories?.map((category) => (
              <div
                key={category._id}
                className="bg-white bg-opacity-80 shadow-lg rounded-lg p-4 text-center border border-[#323232] transition-all hover:scale-105 cursor-pointer"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
              >
                <p className="text-[#323232] font-semibold text-lg">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Editing */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;