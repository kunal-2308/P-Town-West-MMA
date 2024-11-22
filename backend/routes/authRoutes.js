import express from "express";
import {
  register,
  login,
  logout,
  getUserDetails,
} from "../controllers/authController.js";
import {protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user/details", protectUser, getUserDetails);

export default router;
