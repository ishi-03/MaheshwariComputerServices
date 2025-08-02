// redux/api/restockApiSlice.js
import { apiSlice } from './apiSlice';

const RESTOCK_URL = '/api/restock';

export const restockApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    restockProduct: builder.mutation({
      query: ({ productId, vendorId, quantity }) => ({
        url: `${RESTOCK_URL}`,
        method: 'POST',
        body: { productId, vendorId, quantity },
      }),
    }),
    getRestockHistoryByVendor: builder.query({
      query: (vendorId) => `${RESTOCK_URL}/${vendorId}`,
    }),
    getAllRestockHistory: builder.query({
      query: () => `${RESTOCK_URL}/all`,
      providesTags: ['Restock'],
    }),
    updateRestockHistory: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `${RESTOCK_URL}/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['Restock'],
    }),
    deleteRestockHistory: builder.mutation({
      query: (id) => ({
        url: `${RESTOCK_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Restock'],
    }),
  }),
});

export const {
  useRestockProductMutation,
  useGetRestockHistoryByVendorQuery,
  useGetAllRestockHistoryQuery,
  useUpdateRestockHistoryMutation,
  useDeleteRestockHistoryMutation,
} = restockApiSlice;
