import Class from "../models/classModel.js";
import User from "../models/userModel.js";

// User: Book a class
export const bookClass = async (req, res) => {
  const { classId } = req.body;
  const userId = req.user.id;

  try {
    const classToBook = await Class.findById(classId);

    if (!classToBook) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if the class is full
    if (classToBook.isFull || classToBook.bookedSlots >= classToBook.slots) {
      return res.status(400).json({ message: "Class is fully booked" });
    }

    // Increment booked slots
    classToBook.bookedSlots += 1;
    if (classToBook.bookedSlots >= classToBook.slots) {
      classToBook.isFull = true;
    }

    await classToBook.save();

    // Associate the class with the user
    const user = await User.findById(userId);
    user.bookedClasses = user.bookedClasses || [];
    user.bookedClasses.push(classToBook._id);
    await user.save();

    res.status(200).json({ message: "Class booked successfully", classToBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to book class", error: error.message });
  }
};

// User: Get booked classes
export const getBookedClasses = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate("bookedClasses");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.bookedClasses);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to retrieve booked classes",
        error: error.message,
      });
  }
};

// User: Get available classes
export const getAvailableClasses = async (req, res) => {
  try {
    const availableClasses = await Class.find({ isFull: false });
    res.status(200).json(availableClasses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve classes", error: error.message });
  }
};

// User: Get previous classes (past classes)
export const getPreviousClasses = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate("bookedClasses");
    if (!user) return res.status(404).json({ message: "User not found" });

    const now = new Date();
    const previousClasses = user.bookedClasses.filter(
      (c) => new Date(c.date) < now
    );

    res.status(200).json(previousClasses);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to retrieve previous classes",
        error: error.message,
      });
  }
};
