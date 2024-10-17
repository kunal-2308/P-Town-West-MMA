import express from "express";
import {
  register,
  login,
  adminLogin,
  logout,
} from "../controllers/authController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", adminLogin);
router.get("/logout", logout);
export default router;
