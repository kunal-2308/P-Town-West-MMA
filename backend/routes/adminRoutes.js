import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import {
  addClass,
  updateClass,
  deleteClass,
  getAllClasses,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/add", protectAdmin, addClass);

router.put("/update/:id", protectAdmin, updateClass);

router.delete("/delete/:id", protectAdmin, deleteClass);

router.get("/all", protectAdmin, getAllClasses);





export default router;
