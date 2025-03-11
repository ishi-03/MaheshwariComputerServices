import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Profile from "./pages/user/Profile.jsx";
//private routes
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./pages/admin/AdminRoute.jsx";
//auth
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import UserList from "./pages/admin/UserList.jsx";
import CategoryList from "./pages/admin/CategoryList.jsx";
import ProductUpdate from "./pages/admin/ProductUpdate.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import AllProducts from "./pages/admin/AllProducts.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* admin routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList/>} />
        <Route path="productlist" element={<ProductList/>}/>
        <Route path="allproductslist" element={<AllProducts/>}/>
        <Route path="productlist/:pageNumber" element={<ProductList/>}/>
        <Route path="product/update/:_id" element={<ProductUpdate/>}/>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
