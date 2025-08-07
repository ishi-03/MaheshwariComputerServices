// remove trailing slash if exists
const rawBaseUrl = import.meta.env.VITE_API_URL;
export const BASE_URL = rawBaseUrl.endsWith("/")
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;

// build all URLs cleanly
export const USERS_URL = `${BASE_URL}/api/users`;
export const CATEGORY_URL = `${BASE_URL}/api/category`;
export const VENDOR_URL = `${BASE_URL}/api/vendor`;
export const PRODUCT_URL = `${BASE_URL}/api/products`;
export const UPLOAD_URL = `${BASE_URL}/api/upload`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const RAZORPAY_URL = `${ORDERS_URL}/razorpay`;
