import { useState } from "react";
import { Search, Package, Calendar, DollarSign, Truck, Eye, Plus, X, Save, ChevronLeft, ChevronRight, Filter, TrendingUp, Users, AlertCircle, CheckCircle } from "lucide-react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery, useUpdateTrackingInfoMutation } from "../../redux/api/orderApiSlice";
import { toast } from "react-toastify";

const OrderList = () => {
  const { data: orders, isLoading, error,isError } = useGetOrdersQuery();
  const [updateTrackingInfo] = useUpdateTrackingInfoMutation();

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleTrackingForm, setVisibleTrackingForm] = useState(null);
  const [trackingInputs, setTrackingInputs] = useState({});
  const ordersPerPage = 5;

  // Filter & Sort Orders
  const filteredOrders = orders
    ? orders
        .filter((order) => {
          const matchesSearch = order.user?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               order._id.toLowerCase().includes(searchTerm.toLowerCase());
          
          if (!matchesSearch) return false;
          
          if (filter === "All") return true;
          if (filter === "Paid") return order.isPaid;
          if (filter === "Unpaid") return !order.isPaid;
          if (filter === "Delivered") return order.isDelivered;
          if (filter === "Not Delivered") return !order.isDelivered;
          return true;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);

  // Tracking Change Handler
  const handleTrackingChange = (orderId, field, value) => {
    setTrackingInputs((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value,
      },
    }));
  };

  // Update Tracking Info
  const handleTrackingUpdate = async (orderId) => {
    const { awb, courier, invoiceUrl, trackingUrl } = trackingInputs[orderId] || {};
    try {
      await updateTrackingInfo({
        orderId,
        trackingData: { awb, courier, invoiceUrl, trackingUrl },
      }).unwrap();
      toast.success("Tracking info updated!");
      setVisibleTrackingForm(null);
    } catch (err) {
      console.error("Tracking update error:", err);
      toast.error(err?.data?.message || "Failed to update tracking info");
    }
  };

  // Stats calculation
  const stats = {
    total: orders?.length || 0,
    paid: orders?.filter(o => o.isPaid).length || 0,
    delivered: orders?.filter(o => o.isDelivered).length || 0,
    pending: orders?.filter(o => !o.isDelivered).length || 0
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
{error && typeof error === "object" && "message" in error && (
  <Message variant="danger">{error.message}</Message>
)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="relative">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Order Management
              </h1>
              <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
              <p className="mt-3 text-gray-600 font-medium">
                Streamline and track all your orders with precision
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="bg-white rounded-xl p-3 shadow-lg border border-red-100">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 p-6 hover:border-red-200 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                  <p className="text-xs text-green-600 font-medium mt-2 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <Package className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 p-6 hover:border-red-200 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Paid Orders</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.paid}</p>
                  <p className="text-xs text-green-600 font-medium mt-2 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {stats.total > 0 ? Math.round((stats.paid / stats.total) * 100) : 0}% success rate
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <DollarSign className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 p-6 hover:border-red-200 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Delivered</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.delivered}</p>
                  <p className="text-xs text-blue-600 font-medium mt-2 flex items-center">
                    <Truck className="h-3 w-3 mr-1" />
                    On-time delivery
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <Truck className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 p-6 hover:border-red-200 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pending</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pending}</p>
                  <p className="text-xs text-orange-600 font-medium mt-2 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Requires attention
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-6 mb-6 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by customer name or order ID..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-500 font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <Filter className="h-5 w-5 text-red-600" />
              </div>
              <select
                className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all bg-gray-50 focus:bg-white font-medium text-gray-700 min-w-48"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Orders</option>
                <option value="Paid">Paid Orders</option>
                <option value="Unpaid">Unpaid Orders</option>
                <option value="Delivered">Delivered</option>
                <option value="Not Delivered">Pending Delivery</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-red-100">
              <thead className="bg-gradient-to-r from-red-600 to-red-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-red-50">
                {currentOrders.map((order, index) => (
                  <tr key={order._id} className="hover:bg-red-25 hover:bg-gradient-to-r hover:from-red-25 hover:to-transparent transition-all duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-16 w-16">
                        <img
                          src={order.orderItems[0]?.image || "/placeholder.png"}
                          className="h-16 w-16 object-cover rounded-xl border-2 border-red-100 shadow-md group-hover:shadow-lg transition-shadow"
                          alt="Product"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900 font-mono">
                        {order._id.substring(0, 12)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
                          <span className="text-sm font-bold text-white">
                            {order.user?.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {order.user?.username || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      ${order.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                          order.isPaid
                            ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
                            : "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300"
                        }`}
                      >
                        {order.isPaid ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Paid
                          </>
                        ) : (
                          <>
                            <X className="h-3 w-3 mr-1" />
                            Unpaid
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                          order.isDelivered
                            ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
                            : "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300"
                        }`}
                      >
                        {order.isDelivered ? (
                          <>
                            <Truck className="h-3 w-3 mr-1" />
                            Delivered
                          </>
                        ) : (
                          <>
                            <Calendar className="h-3 w-3 mr-1" />
                            Pending
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link to={`/order/${order._id}`}>
                          <button className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg">
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </button>
                        </Link>
                        {!order.isDelivered && (
                          <button
                            className="inline-flex items-center px-3 py-1.5 bg-white border-2 border-red-300 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-sm hover:shadow-md"
                            onClick={() =>
                              setVisibleTrackingForm((prev) => (prev === order._id ? null : order._id))
                            }
                          >
                            {visibleTrackingForm === order._id ? (
                              <>
                                <X className="h-3 w-3 mr-1" />
                                Cancel
                              </>
                            ) : (
                              <>
                                <Plus className="h-3 w-3 mr-1" />
                                Track
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {visibleTrackingForm && (
            <div className="border-t-2 border-red-100 bg-gradient-to-r from-red-25 to-white p-8">
              <div className="max-w-4xl">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 ml-4">
                    Add Tracking Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Courier Service
                    </label>
                    <input
                      type="text"
                      placeholder="Enter courier name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all bg-white font-medium"
                      value={trackingInputs[visibleTrackingForm]?.courier || ""}
                      onChange={(e) => handleTrackingChange(visibleTrackingForm, "courier", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      AWB Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter tracking number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all bg-white font-medium"
                      value={trackingInputs[visibleTrackingForm]?.awb || ""}
                      onChange={(e) => handleTrackingChange(visibleTrackingForm, "awb", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Invoice URL
                    </label>
                    <input
                      type="url"
                      placeholder="Enter invoice URL"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all bg-white font-medium"
                      value={trackingInputs[visibleTrackingForm]?.invoiceUrl || ""}
                      onChange={(e) => handleTrackingChange(visibleTrackingForm, "invoiceUrl", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Tracking URL
                    </label>
                    <input
                      type="url"
                      placeholder="Enter tracking URL"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all bg-white font-medium"
                      value={trackingInputs[visibleTrackingForm]?.trackingUrl || ""}
                      onChange={(e) => handleTrackingChange(visibleTrackingForm, "trackingUrl", e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  onClick={() => handleTrackingUpdate(visibleTrackingForm)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Tracking Information
                </button>
              </div>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-red-100 sm:px-8 mt-6 rounded-2xl shadow-xl border border-red-100">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border-2 border-red-300 text-sm font-semibold rounded-xl text-red-700 bg-white hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border-2 border-red-300 text-sm font-semibold rounded-xl text-red-700 bg-white hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Showing{" "}
                  <span className="font-bold text-red-600">{indexOfFirstOrder + 1}</span>{" "}
                  to{" "}
                  <span className="font-bold text-red-600">
                    {Math.min(indexOfLastOrder, filteredOrders.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-red-600">{filteredOrders.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-xl shadow-lg -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-3 py-2 rounded-l-xl border-2 border-red-300 bg-white text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePageChange(idx + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-bold transition-all ${
                        currentPage === idx + 1
                          ? "z-10 bg-gradient-to-r from-red-500 to-red-600 border-red-500 text-white shadow-lg"
                          : "bg-white border-red-300 text-red-600 hover:bg-red-50"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-3 py-2 rounded-r-xl border-2 border-red-300 bg-white text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;