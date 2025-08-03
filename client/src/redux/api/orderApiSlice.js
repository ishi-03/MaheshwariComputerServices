import { apiSlice } from "./apiSlice";
import { ORDERS_URL, RAZORPAY_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Order", "Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
    }),
updateTrackingInfo: builder.mutation({
  query: ({ orderId, trackingData }) => ({
    url: `${ORDERS_URL}/${orderId}/tracking`,
    method: "PUT",
    body: trackingData,
  }),
  invalidatesTags: (r, e, { orderId }) => [
    { type: "Order", id: orderId },
    { type: "Orders", id: "LIST" },
  ],
}),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),

    createRazorpayOrder: builder.mutation({
      query: (data) => ({
        url: `${RAZORPAY_URL}/create-order`,
        method: "POST",
        body: data,
      }),
    }),

    verifyRazorpayPayment: builder.mutation({
      query: (data) => ({
        url: `${RAZORPAY_URL}/verify`,
        method: "POST",
        body: data,
      }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),


    getTotalOrders: builder.query({
      query: () => `${ORDERS_URL}/total-orders`,
    }),

    getTotalSales: builder.query({
      query: () => `${ORDERS_URL}/total-sales`,
    }),

    getTotalSalesByDate: builder.query({
      query: () => `${ORDERS_URL}/total-sales-by-date`,
    }),
  }),
});

export const {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayPaymentMutation,
  useGetMyOrdersQuery,
  useDeliverOrderMutation,
  useGetOrdersQuery,
  useUpdateTrackingInfoMutation,
} = orderApiSlice;
