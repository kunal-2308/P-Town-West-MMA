import express from "express";
import {
  register,
  login,
  adminLogin,
  logout,
  getUserDetails,
} from "../controllers/authController.js";
import { protectAdmin, protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", adminLogin);
router.get("/logout", logout);
router.get('/user/details',protectUser,getUserDetails);
export default router;
