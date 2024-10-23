import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import {
  addClass,
  updateClass,
  deleteClass,
  getAllClasses,
  addAdmin,
  viewParticularClass,
  getAllAdminList,
  deleteAdmin,
  updatePassword,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/add", protectAdmin, addClass);

router.put("/update/:id", protectAdmin, updateClass);

router.delete("/delete/:id", protectAdmin, deleteClass);

router.get("/all", protectAdmin, getAllClasses);

router.post("/addAdmin", protectAdmin, addAdmin);

router.get("/view/:id", protectAdmin, viewParticularClass);

router.get("/allAdmin", protectAdmin, getAllAdminList);

router.delete("/deleteAdmin/:id", protectAdmin, deleteAdmin);

router.put('/update/password/:id',protectAdmin,updatePassword);
export default router;
