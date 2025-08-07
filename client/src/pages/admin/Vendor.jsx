import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useCreateVendorMutation,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
  useFetchVendorsQuery,
} from "../../redux/api/vendorApiSlice.js";
import { useGetAllRestockHistoryQuery } from "../../redux/api/restockApiSlice.js";

import VendorForm from "../../components/VendorForm.jsx";
import Modal from "../../components/Modal.jsx";
import bgImage from "../../assets/office.jpeg";
import { FaEdit, FaTrash } from "react-icons/fa";

const Vendor = () => {
  const navigate = useNavigate();
  const { data: vendors } = useFetchVendorsQuery();
  const { data: history, isLoading, error,isError } = useGetAllRestockHistoryQuery();

  const [form, setForm] = useState({ username: "", email: "" });
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);

  const [createVendor] = useCreateVendorMutation();
  const [updateVendor] = useUpdateVendorMutation();
  const [deleteVendor] = useDeleteVendorMutation();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateVendor = async (e) => {
    e.preventDefault();
    const { username, email } = form;
    if (!username || !email) {
      toast.error("All fields are required");
      return;
    }

    try {
      const result = await createVendor(form).unwrap();
      toast.success(`${result.username} created.`);
      setForm({ username: "", email: "" });
    } catch (error) {
      toast.error(error?.data?.message || "Vendor creation failed");
    }
  };

  const handleUpdateVendor = async (e) => {
    e.preventDefault();
    const { _id, username, email } = form;
    if (!username || !email) {
      toast.error("All fields are required");
      return;
    }

    try {
      const result = await updateVendor({
        vendorId: _id,
        updatedVendor: { username, email },
      }).unwrap();

      toast.success(`${result.username} updated.`);
      setSelectedVendor(null);
      setForm({ username: "", email: "" });
      setModalVisible(false);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDeleteVendor = async () => {
    try {
      await deleteVendor(selectedVendor._id).unwrap();
      toast.success("Vendor deleted");
      setConfirmDeleteVisible(false);
      setSelectedVendor(null);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleOpenDeleteConfirmation = (vendor) => {
    setSelectedVendor(vendor);
    setConfirmDeleteVisible(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-start pl-60 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-white/60 before:backdrop-blur-md"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="relative z-10 w-full pr-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Manage Vendors</h1>
          <button
  onClick={() => navigate("/admin/restock-history")}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
>
  View Restock History
</button>

        </div>

        <div className="w-full max-w-lg bg-white bg-opacity-90 shadow-md rounded-xl p-6 border border-gray-300">
          <VendorForm
            form={form}
            handleChange={handleInputChange}
            handleSubmit={handleCreateVendor}
          />
        </div>

        <div className="w-full mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {vendors?.map((vendor) => (
              <div
                key={vendor._id}
                onClick={() => navigate(`/admin/vendor/${vendor._id}`)}
                className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:scale-105 transition relative"
              >
                <p className="text-lg font-semibold text-gray-800">
                  {vendor.username}
                </p>
                <p className="text-sm text-gray-600">{vendor.email}</p>

                <div className="absolute top-2 right-2 flex gap-2">
                  <FaEdit
                    className="text-blue-600 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVendor(vendor);
                      setForm({
                        _id: vendor._id,
                        username: vendor.username,
                        email: vendor.email,
                      });
                      setModalVisible(true);
                    }}
                  />
                  <FaTrash
                    className="text-red-600 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDeleteConfirmation(vendor);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Update Modal */}
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "400px",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <VendorForm
              form={form}
              handleChange={handleInputChange}
              handleSubmit={handleUpdateVendor}
              buttonText="Update"
            />
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        {confirmDeleteVisible && (
          <Modal
            isOpen={confirmDeleteVisible}
            onClose={() => setConfirmDeleteVisible(false)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              width: "300px",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Are you sure you want to delete this vendor?
              </h3>
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  onClick={handleDeleteVendor}
                >
                  Yes, Delete
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                  onClick={() => setConfirmDeleteVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}

        
      </div>
    </div>
  );
};

export default Vendor;
