import Class from "../models/classModel.js";
import User from "../models/userModel.js";
// User: Book a class

export const bookClass = async (req, res) => {
  const { id: classId } = req.params;
  const userId = req.user.id;

  try {
    const classToBook = await Class.findById(classId);

    if (!classToBook) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if the class is full
    if (classToBook.isFull || classToBook.bookedSlots >= classToBook.slots) {
      return res
        .status(400)
        .json({ message: "Class is fully booked. Please try another class." });
    }

    // Check if user already booked the class
    if (classToBook.applicants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already booked this class." });
    }

    // Increment booked slots
    classToBook.bookedSlots += 1;
    if (classToBook.bookedSlots >= classToBook.slots) {
      classToBook.isFull = true;
    }

    // Associate the class with the user
    const user = await User.findById(userId);
    user.bookedClasses = user.bookedClasses || [];
    user.bookedClasses.push(classToBook._id);
    classToBook.applicants.push(userId);
    await user.save();
    await classToBook.save();

    res.status(200).json({ message: "Class booked successfully", classToBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to book class", error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  const { id: classId } = req.params;
  const userId = req.user.id;

  try {
    const classToCancel = await Class.findById(classId);

    if (!classToCancel) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if user has booked the class
    if (!classToCancel.applicants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have not booked this class." });
    }

    // Decrement booked slots and remove the user from applicants
    classToCancel.bookedSlots -= 1;
    classToCancel.isFull = false; // Reset full status if the class is no longer fully booked
    classToCancel.applicants = classToCancel.applicants.filter(
      (applicant) => applicant.toString() !== userId.toString()
    );

    const user = await User.findById(userId);
    user.bookedClasses = user.bookedClasses.filter(
      (bookedClass) => bookedClass.toString() !== classId.toString()
    );

    await user.save();
    await classToCancel.save();

    res
      .status(200)
      .json({ message: "Booking cancelled successfully", classToCancel });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to cancel booking", error: error.message });
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
    res.status(500).json({
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
    res.status(500).json({
      message: "Failed to retrieve previous classes",
      error: error.message,
    });
  }
};

// User: Get all classes (with optional category and week filter)
export const getAllClasses = async (req, res) => {
  const { category, week } = req.query; // Get category and week from query parameters

  try {
    const filter = {};

    // Add filters based on provided query parameters
    if (category) {
      filter.category = category;
    }

    if (week) {
      filter.week = week; // Use the week field to filter
    }

    const classes = await Class.find(filter);
    res.status(200).json(classes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve classes", error: error.message });
  }
};

// Get class by id
export const getClassById = async (req, res) => {
  try {
    const classId = req.params.classId; // Correct the parameter name
    const classDetails = await Class.findById(classId);
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(classDetails);
  } catch (error) {
    console.error("Error fetching class details:", error);
    res.status(500).json({ message: "Server error" });
  }
};
