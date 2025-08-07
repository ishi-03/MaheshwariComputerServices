import React, { useState, useMemo } from "react";
import {
  useGetAllRestockHistoryQuery,
  useUpdateRestockHistoryMutation,
  useDeleteRestockHistoryMutation,
} from "../../redux/api/restockApiSlice";

const RestockHistoryPage = () => {
  const { data: history = [], isLoading, error, refetch,isError } = useGetAllRestockHistoryQuery();
  const [updateRestockHistory] = useUpdateRestockHistoryMutation();
  const [deleteRestockHistory] = useDeleteRestockHistoryMutation();

  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const vendors = [...new Set(history.map((entry) => entry.vendor?.username).filter(Boolean))];
  const products = [...new Set(history.map((entry) => entry.product?.name).filter(Boolean))];

  const filteredHistory = useMemo(() => {
    return history
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        const isVendorMatch = selectedVendor ? entry.vendor?.username === selectedVendor : true;
        const isProductMatch = selectedProduct ? entry.product?.name === selectedProduct : true;
        const isStartDateMatch = startDate ? entryDate >= new Date(startDate) : true;
        const isEndDateMatch = endDate ? entryDate <= new Date(endDate) : true;
        return isVendorMatch && isProductMatch && isStartDateMatch && isEndDateMatch;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [history, selectedVendor, selectedProduct, startDate, endDate]);

  const handleUpdate = async (entry) => {
    const newQuantity = prompt("Enter new quantity:", entry.quantity);
    if (newQuantity && !isNaN(newQuantity)) {
      try {
        await updateRestockHistory({ id: entry._id, updatedData: { quantity: Number(newQuantity) } }).unwrap();
        alert("Updated successfully!");
        refetch();  // Re-fetch data after the update
      } catch (err) {
        console.error(err);
        alert("Update failed.");
      }
    }
  };

  const handleDelete = async (entry) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteRestockHistory(entry._id).unwrap();
        alert("Deleted successfully!");
        refetch();  // Re-fetch data after the deletion
      } catch (err) {
        console.error(err);
        alert("Delete failed.");
      }
    }
  };

  return (
    <div className="min-h-screen pl-35 py-10 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8 border border-gray-100">
        <div className="border-b border-gray-200 pb-5 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <span className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-3 shadow-sm">📦</span>
            Restock History
          </h1>
          <p className="text-gray-600 mt-2 text-lg">View and manage your complete inventory restock records</p>
        </div>

        {/* Filters */}
        <div className="bg-blue-50 p-6 rounded-xl mb-8 shadow-sm border border-blue-100">
          <h2 className="text-lg font-medium mb-4 text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Filter Records
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Vendor</label>
              <select 
                value={selectedVendor} 
                onChange={(e) => setSelectedVendor(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Vendors</option>
                {vendors.map((vendor) => <option key={vendor} value={vendor}>{vendor}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Product</label>
              <select 
                value={selectedProduct} 
                onChange={(e) => setSelectedProduct(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Products</option>
                {products.map((product) => <option key={product} value={product}>{product}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">End Date</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-center text-red-700 border border-red-200">
            <p>Error loading history. Please try again later.</p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-700 border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium">No restocking records match your current filters.</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or view all records.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredHistory.map((entry) => {
              const product = entry.product;
              const quantity = Number(entry.quantity ?? 0);
              const purchasedPrice = product?.purchasePrice ?? 0;
              const amountPaid = quantity * purchasedPrice;
              const formattedDate = new Date(entry.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div key={entry._id} className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
                  <div className="flex flex-col md:flex-row md:items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{product?.name}</h3>
                      <p className="text-gray-600 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {entry.vendor?.username}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formattedDate}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                      <button
                        onClick={() => handleUpdate(entry)}
                        className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-md hover:bg-yellow-100 border border-yellow-200 flex items-center transition-colors duration-150"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(entry)}
                        className="bg-red-50 text-red-700 px-4 py-2 rounded-md hover:bg-red-100 border border-red-200 flex items-center transition-colors duration-150"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex flex-col items-center p-2">
                      <p className="text-gray-500 text-sm mb-1">Quantity</p>
                      <p className="font-semibold text-lg">{quantity} units</p>
                    </div>
                    <div className="flex flex-col items-center p-2 border-t md:border-t-0 md:border-l md:border-r border-gray-200">
                      <p className="text-gray-500 text-sm mb-1">Unit Price</p>
                      <p className="font-semibold text-lg">₹{purchasedPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-center p-2 border-t md:border-t-0 border-gray-200">
                      <p className="text-gray-500 text-sm mb-1">Total Paid</p>
                      <p className="font-semibold text-lg text-blue-700">₹{amountPaid.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestockHistoryPage;