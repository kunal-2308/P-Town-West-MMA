import express from "express";
import {
  bookClass,
  getBookedClasses,
  getAvailableClasses,
  getPreviousClasses,
  getAllClasses,
  getClassesByWeek,
} from "../controllers/classController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book", protectUser, bookClass);
router.get("/booked", protectUser, getBookedClasses);
router.get("/available", protectUser, getAvailableClasses);
router.get("/previous", protectUser, getPreviousClasses);
router.get("/all-classes", protectUser, getAllClasses);
router.get("/classes/week/:week", protectUser, getClassesByWeek);

export default router;
