import { apiSlice } from "./apiSlice";
import { VENDOR_URL } from "../constants";

export const vendorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createVendor: builder.mutation({
      query: (data) => ({
        url: `${VENDOR_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),

    fetchVendors: builder.query({
      query: () => VENDOR_URL,
      providesTags: ["Vendor"],
    }),

    updateVendor: builder.mutation({
      query: ({ vendorId, updatedVendor }) => ({
        url: `${VENDOR_URL}/${vendorId}`,
        method: "PUT",
        body: updatedVendor,
      }),
      invalidatesTags: ["Vendor"],
    }),

    deleteVendor: builder.mutation({
      query: (vendorId) => ({
        url: `${VENDOR_URL}/${vendorId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vendor"],
    }),
    getVendorDetails: builder.query({
      query: (id) => `${VENDOR_URL}/${id}`, 
      providesTags: ["Vendor"],
    }),
  }),
});



export const {
  useCreateVendorMutation,
  useFetchVendorsQuery,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
  useGetVendorDetailsQuery,
} = vendorApiSlice;
