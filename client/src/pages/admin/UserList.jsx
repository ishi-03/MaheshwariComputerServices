import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaUsers, FaSearch } from "react-icons/fa";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import Message from "../../components/Message";

const UserList = () => {
  const { data: users, refetch, isLoading, error,isError } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const cancelEdit = () => {
    setEditableUserId(null);
    setEditableUserName("");
    setEditableUserEmail("");
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Filter users based on search term
  const filteredUsers = users?.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 p-3 rounded-full">
                <FaUsers className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">User Management</h1>
                <p className="text-gray-600 mt-2">Manage and monitor all system users</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-red-500">{filteredUsers.length}</div>
              <div className="text-gray-600">Total Users</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Message variant="danger">
  {error?.data?.message || error?.error || "Something went wrong."}
</Message>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Users Directory</h2>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Admin Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr 
                      key={user._id} 
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-red-25'} hover:bg-red-50 transition-colors duration-150`}
                    >
                      {/* User ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {user._id}
                        </div>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4">
                        {editableUserId === user._id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={editableUserName}
                              onChange={(e) => setEditableUserName(e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors duration-200"
                              title="Save changes"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md transition-colors duration-200"
                              title="Cancel editing"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <div className="text-sm font-medium text-gray-900">
                              {user.username}
                            </div>
                            <button
                              onClick={() => toggleEdit(user._id, user.username, user.email)}
                              className="text-red-500 hover:text-red-700 transition-colors duration-200"
                              title="Edit user"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4">
                        {editableUserId === user._id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="email"
                              value={editableUserEmail}
                              onChange={(e) => setEditableUserEmail(e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors duration-200"
                              title="Save changes"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md transition-colors duration-200"
                              title="Cancel editing"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <a
                              href={`mailto:${user.email}`}
                              className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            >
                              {user.email}
                            </a>
                            <button
                              onClick={() => toggleEdit(user._id, user.username, user.email)}
                              className="text-red-500 hover:text-red-700 transition-colors duration-200"
                              title="Edit user"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Admin Status */}
                      <td className="px-6 py-4 text-center">
                        {user.isAdmin ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <FaCheck className="mr-1" />
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <FaTimes className="mr-1" />
                            User
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center">
                        {!user.isAdmin && (
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                            title="Delete user"
                          >
                            <FaTrash className="mr-2" />
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <FaUsers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                  <p className="text-gray-500">
                    {searchTerm ? "Try adjusting your search terms." : "No users available in the system."}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;