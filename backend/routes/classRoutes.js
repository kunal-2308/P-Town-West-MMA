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
  bookGuestClasses,
  allApplicants
} from "../controllers/classController.js";
import { protectAdmin, protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book/:id", protectUser, bookClass);
router.post("/cancel/:id", protectUser, cancelBooking);
router.get("/booked", protectUser, getBookedClasses);
router.get("/available", protectUser, getAvailableClasses);
router.get("/previous", protectUser, getPreviousClasses);
router.get("/all-classes", protectUser, getAllClasses);
router.get("/view/:classId", getClassById);
router.get("/guest/list", getAllClasses);
router.get("/applicants",protectAdmin,allApplicants);
//Admin routes:
router.get("/admin/previous", getListOfPreviousClasses);
router.get("/admin/upcoming", getListOfUpcomingClasses);
router.get("/guest/:classId", guestClassDetails);
router.post("/guest/book/class/:classId", bookGuestClasses);

export default router;
