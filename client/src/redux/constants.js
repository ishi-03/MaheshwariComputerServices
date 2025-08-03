// export const BASE_URL = "";
// export const USERS_URL = "/api/users";
// export const CATEGORY_URL = "/api/category";
// export const VENDOR_URL = "/api/vendor";

// export const PRODUCT_URL = "/api/products";
// export const UPLOAD_URL = "/api/upload";

// export const ORDERS_URL = "/api/orders";
// export const RAZORPAY_URL = `${ORDERS_URL}/razorpay`;
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const USERS_URL = `${BASE_URL}/api/users`;
export const CATEGORY_URL = `${BASE_URL}/api/category`;
export const VENDOR_URL = `${BASE_URL}/api/vendor`;
export const PRODUCT_URL = `${BASE_URL}/api/products`;
export const UPLOAD_URL = `${BASE_URL}/api/upload`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const RAZORPAY_URL = `${ORDERS_URL}/razorpay`;
