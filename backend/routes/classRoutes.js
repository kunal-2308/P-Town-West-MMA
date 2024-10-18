import express from "express";
import {
  bookClass,
  getBookedClasses,
  getAvailableClasses,
  getPreviousClasses,
  getAllClasses,
  getClassById,
  cancelBooking,
} from "../controllers/classController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book/:id", protectUser, bookClass);
router.post("/cancel/:id", protectUser, cancelBooking);
router.get("/booked", protectUser, getBookedClasses);
router.get("/available", protectUser, getAvailableClasses);
router.get("/previous", protectUser, getPreviousClasses);
router.get("/all-classes", protectUser, getAllClasses);
router.get("/:classId", protectUser, getClassById);

export default router;
