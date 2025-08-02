import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Link } from 'react-router-dom'; 
import TrackPage from "./pages/admin/helps/TrackPage.jsx";
// auth & private
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./pages/admin/AdminRoute.jsx";
              import EnterTracking from "./pages/admin/helps/EnterTracking.jsx";

// pages
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Profile from "./pages/user/Profile.jsx";
import UserOrder from "./pages/User/UserOrder.jsx";
import Order from "./pages/Orders/Order.jsx";
import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AboutUs from "./pages/AboutUs.jsx";

// admin
import UserList from "./pages/admin/UserList.jsx";
import CategoryList from "./pages/admin/CategoryList.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import AllProducts from "./pages/admin/AllProducts.jsx";
import ProductUpdate from "./pages/admin/ProductUpdate.jsx";
import OrderList from "./pages/admin/OrderList.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Vendor from "./pages/admin/Vendor.jsx";
import VendorDetail from "./pages/admin/VendorDetail.jsx";
import RestockHistoryPage from "./pages/admin/RestockingHistoryPage.jsx";
import PrivacyPolicy from "./pages/admin/helps/PrivacyPolicy.jsx";
import RefundPolicy from "./pages/admin/helps/RefundPolicy.jsx";
import ShippingPolicy from "./pages/admin/helps/ShippingPolicy.jsx";
import TermsAndConditions from "./pages/admin/helps/TermsnConditions.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/user-order" element={<UserOrder />} />

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/order-history" element={<UserOrder />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="product/update/:id" element={<ProductUpdate />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="vendor" element={<Vendor />} />
        <Route path="/admin/vendor/:id" element={<VendorDetail />} />
        <Route path="/admin/restock-history" element={<RestockHistoryPage />} />

      </Route>
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/track/:orderId" element={<TrackPage />} />
              

<Route path="/refund-policy" element={<RefundPolicy/>} />
<Route path="/shipping-policy" element={<ShippingPolicy/>} />
<Route path="/terms" element={<TermsAndConditions/>} />


<Route path="/enter-tracking" element={<EnterTracking />} />



    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
