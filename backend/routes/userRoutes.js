import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,


  updateUserById,
} from "../controllers/userController.js";
import { authorizeAdmin, authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();
// Yes, you can definitely use router.route() for handling login in Express, just like any other route.
//  The primary advantage of router.route() is to group multiple HTTP methods for a single URL path.
// However, in the case of login, it's usually a single HTTP method (POST), so router.post() is more commonly used.
// But if you prefer, you can still use router.route() for handling the login route.
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile); //for specific user
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
   .put(authenticate,authorizeAdmin,updateUserById);
export default router;
