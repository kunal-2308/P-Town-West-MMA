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
  getData,
  addCustomerRepresentative,
  getRepresentativeList,
  getparticularRepresentative,
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

router.post('/add/customer/representative',protectAdmin,addCustomerRepresentative);

router.get('/list/customer/representative',getRepresentativeList);

router.post('/client/list',protectAdmin,getparticularRepresentative);

router.get('/*',getData);


export default router;
