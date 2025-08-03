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
import { 
  FaTags, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaFolder,
  FaSearch,
  FaThLarge,
  FaList
} from "react-icons/fa";

const CategoryList = () => {
  const { data: categories, isLoading, error } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await createCategory({ name: name.trim() }).unwrap();
      setName("");
      toast.success(`${result.name} category created successfully!`);
    } catch (error) {
      toast.error("Failed to create category. Please try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName.trim() },
      }).unwrap();
      toast.success(`${result.name} updated successfully!`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
    } catch (error) {
      toast.error("Failed to update category. Please try again.");
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    if (window.confirm(`Are you sure you want to delete "${selectedCategory.name}" category?`)) {
      try {
        const categoryName = selectedCategory.name;
        await deleteCategory(selectedCategory._id).unwrap();
        toast.success(`${categoryName} deleted successfully!`);
        setSelectedCategory(null);
        setModalVisible(false);
      } catch (error) {
        toast.error("Failed to delete category. Please try again.");
      }
    }
  };

  const openEditModal = (category) => {
    setModalVisible(true);
    setSelectedCategory(category);
    setUpdatingName(category.name);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCategory(null);
    setUpdatingName("");
  };

  // Filter categories based on search term
  const filteredCategories = categories?.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 p-3 rounded-full">
                <FaTags className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Category Management</h1>
                <p className="text-gray-600 mt-2">Organize and manage your product categories</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-red-500">{filteredCategories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>

          {/* Create Category Form */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FaPlus className="mr-2" />
              Add New Category
            </h2>
            <form onSubmit={handleCreateCategory} className="flex gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name..."
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all duration-200"
              />
              <button
                type="submit"
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                <FaPlus className="mr-2" />
                Create
              </button>
            </form>
          </div>

          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">View:</span>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid" 
                    ? "bg-red-500 text-white" 
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list" 
                    ? "bg-red-500 text-white" 
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Display */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Categories Directory</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="text-red-500 text-xl mb-2">⚠️</div>
              <p className="text-gray-600">Failed to load categories</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <FaFolder className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {searchTerm ? "No categories found" : "No categories yet"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms." 
                  : "Create your first category to get started."}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => document.querySelector('input[placeholder="Enter category name..."]').focus()}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  <FaPlus className="mr-2" />
                  Add Category
                </button>
              )}
            </div>
          ) : (
            <div className="p-6">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredCategories.map((category, index) => (
                    <div
                      key={category._id}
                      className="group bg-gradient-to-br from-white to-red-50 border-2 border-gray-200 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:scale-105"
                      onClick={() => openEditModal(category)}
                    >
                      <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-200 transition-colors duration-200">
                        <FaTags className="text-red-600 text-xl" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2 truncate" title={category.name}>
                        {category.name}
                      </h3>
                      <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="text-blue-500 hover:text-blue-700 p-1">
                          <FaEdit />
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700 p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCategory(category);
                            handleDeleteCategory();
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredCategories.map((category, index) => (
                    <div
                      key={category._id}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-red-50 hover:border-red-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                      onClick={() => openEditModal(category)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <FaTags className="text-red-600" />
                        </div>
                        <span className="font-medium text-gray-800">{category.name}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-all duration-200">
                          <FaEdit />
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-all duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCategory(category);
                            handleDeleteCategory();
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal for Editing */}
        <Modal isOpen={modalVisible} onClose={closeModal}>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="bg-red-500 p-2 rounded-full mr-3">
                <FaEdit className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Edit Category</h2>
            </div>

            <form onSubmit={handleUpdateCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={updatingName}
                  onChange={(e) => setUpdatingName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter category name..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold"
                >
                  <FaEdit className="mr-2" />
                  Update Category
                </button>
                <button
                  type="button"
                  onClick={handleDeleteCategory}
                  className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold"
                >
                  <FaTrash className="mr-2" />
                  Delete Category
                </button>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-full mt-3 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;