import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import {
  addClass,
  updateClass,
  deleteClass,
  getAllClasses,
  viewParticularClass,
  getAllAdminList,
  deleteAdmin,
  getData,
  addCustomerRepresentative,
  getRepresentativeList,
  getparticularRepresentative,
  adminLogin,
  addAdmin,
  updatePassword,
  deleteRepresentative,
} from "../controllers/adminController.js";
import { tp } from "../controllers/tp.js";

const router = express.Router();

router.post('/admin/login',adminLogin);

router.post("/add", protectAdmin, addClass);

router.put("/update/:id", protectAdmin, updateClass);

router.delete("/delete/:id", protectAdmin, deleteClass);

router.get("/all", protectAdmin, getAllClasses);

router.post('/add/admin',protectAdmin,addAdmin);

router.get("/view/:id", protectAdmin, viewParticularClass);

router.get("/allAdmin", protectAdmin, getAllAdminList);

router.put('/update/password/:id',protectAdmin,updatePassword)

router.delete("/deleteAdmin/:id", protectAdmin, deleteAdmin);

router.post('/add/customer/representative',protectAdmin,addCustomerRepresentative);

router.get('/list/customer/representative',getRepresentativeList);

router.post('/client/list',protectAdmin,getparticularRepresentative);

router.delete('/delete/representative/:id',protectAdmin,deleteRepresentative);

router.get('/',getData);

router.get('/health',tp);
export default router;
