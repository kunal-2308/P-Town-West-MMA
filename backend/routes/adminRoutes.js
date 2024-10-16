import express from "express";
import {
  addClass,
  updateClass,
  deleteClass,
  getAllClasses,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protectAdmin, addClass);
router.put("/:id", protectAdmin, updateClass);
router.delete("/:id", protectAdmin, deleteClass);
router.get("/", protectAdmin, getAllClasses);

export default router;
