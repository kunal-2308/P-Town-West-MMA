import Class from "../models/classModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET);
};

// User: Book a class
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

export const bookClass = async (req, res) => {
  const { id: classId } = req.params;
  const userId = req.user.id;

  try {
    const classToBook = await Class.findById(classId);

    if (!classToBook) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if the class date is in the past
    const classDate = new Date(classToBook.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    if (classDate < today) {
      return res.status(400).json({ message: "Cannot book a previous class." });
    }

    // Check if the class is full
    if (classToBook.isFull || classToBook.bookedSlots >= classToBook.slots) {
      return res
        .status(400)
        .json({ message: "Class is fully booked. Please try another class." });
    }

    // Check if the user has already booked the class
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

export const getListOfUpcomingClasses = async (req, res) => {
  try {
    let allClasses = await Class.find({});
    let upcomingClasses = allClasses.filter(
      (c) => new Date(c.date) > new Date()
    );
    res.status(200).json({
      message: "Upcoming classes fetched successfully",
      upcomingClasses: upcomingClasses,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({
      message: "Failed to retrieve classes",
      error: error.message,
    });
  }
};

export const getListOfPreviousClasses = async (req, res) => {
  try {
    let allClasses = await Class.find({});
    let previousClasses = allClasses.filter(
      (c) => new Date(c.date) < new Date()
    );
    res.status(200).json({
      message: "Previous classes fetched successfully",
      previousClasses: previousClasses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to retrieve classes",
      error: error.message,
    });
  }
};

export const getListOfApplicants = async (req, res) => {
  try {
    let classId = req.params.classId;

    let classWithApplicants = await Class.findById(classId).populate({
      path: "applicants",
      select: "name email phoneNumber bookedClasses",
      populate: {
        path: "bookedClasses",
        model: "Class",
        select: "name date",
      },
    });

    if (!classWithApplicants) {
      return res.status(404).json({ message: "Class not found" });
    }

    const applicants = classWithApplicants.applicants.map((applicant) => ({
      name: applicant.name,
      email: applicant.email,
      phoneNumber: applicant.phoneNumber,
      applications: applicant.bookedClasses.map((bookedClass) => ({
        classId: bookedClass._id,
        className: bookedClass.name,
        classDate: bookedClass.date,
      })),
    }));

    res.status(200).json({
      message: "Applicants fetched successfully",
      applicants: applicants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to retrieve applicants",
      error: error.message,
    });
  }
};

export const guestClassDetails = async (req, res) => {
  try {
    let id = req.params.classId;
    let classDetails = await Class.findById({ _id: id });
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    } else {
      res.status(200).json(classDetails);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const bookGuestClasses = async (req, res) => {
  const { name, email, phoneNumber } = req.body;
  const classId = req.params.classId;

  try {
    let findUser = await User.findOne({ email });

    if (findUser) {
      if (findUser.bookedClasses.includes(classId)) {
        return res.status(400).json({ message: "Class already booked" });
      }

      findUser.bookedClasses.push(classId);
      await findUser.save();

      await Class.findByIdAndUpdate(classId, {
        $push: { applicants: findUser._id },
      });

      const token = generateToken(findUser._id);
      return res.status(200).json({
        message: "Class booked successfully",
        token,
        user: findUser,
        isNewUser: false,
      });
    } else {
      const newUser = await User.create({
        name,
        email,
        phoneNumber,
        bookedClasses: [classId],
      });

      await Class.findByIdAndUpdate(classId, {
        $push: { applicants: newUser._id },
      });

      const token = generateToken(newUser._id);
      return res.status(201).json({
        message: "User created and class booked successfully",
        token,
        user: newUser,
        isNewUser: true,
      });
    }
  } catch (error) {
    console.error("Error booking class:", error);
    res
      .status(500)
      .json({ message: "An error occurred while booking the class" });
  }
};
