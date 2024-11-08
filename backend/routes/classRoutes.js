import express from "express";
import {
  bookClass,
  getBookedClasses,
  getAvailableClasses,
  getPreviousClasses,
  getAllClasses,
  getClassById,
  cancelBooking,
  getListOfUpcomingClasses,
  getListOfPreviousClasses,
  getListOfApplicants,
  guestClassDetails,
} from "../controllers/classController.js";
import { protectAdmin, protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book/:id", protectUser, bookClass);
router.post("/cancel/:id", protectUser, cancelBooking);
router.get("/booked", protectUser, getBookedClasses);
router.get("/available", protectUser, getAvailableClasses);
router.get("/previous", protectUser, getPreviousClasses);
router.get("/all-classes", protectUser, getAllClasses);
router.get("/:classId", protectUser, getClassById); 
router.get('/guest/list',getAllClasses);
//Admin routes:
router.get("/admin/previous", getListOfPreviousClasses);
router.get("/admin/upcoming", getListOfUpcomingClasses); 
router.get('/applicants/:classId',protectAdmin,getListOfApplicants);
router.get('/guest/:classId',guestClassDetails);

export default router;
