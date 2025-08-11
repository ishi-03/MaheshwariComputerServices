import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include"
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category","Vendor"],
  endpoints: () => ({}),
});
