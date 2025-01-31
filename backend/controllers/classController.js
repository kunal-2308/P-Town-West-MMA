import Class from "../models/classModel.js";
import User from "../models/userModel.js";
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import Application from '../models/bookingModel.js';
import Customer from "../models/customerRepresentativeModel.js";
// User: Book a class
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

export const bookClass = async (req, res) => {
  const classId = req.params.id;
  const userId = req.user.id;
  const selectedDate = req.body.selectedDate; // Get selected date from request body

  try {
    // Find the class first
    const classToBook = await Class.findById(classId);
    if (!classToBook) {
      return res.status(404).json({ message: "Class not found." });
    }

    // Initialize applicantsByDate if it doesn't exist
    if (!classToBook.applicantsByDate) {
      classToBook.applicantsByDate = {}; // Initialize if not present
    }

    // Check if the class already has the maximum number of applicants for the selected date
    const applicantsOnDate = classToBook.applicantsByDate[selectedDate] || [];
    if (applicantsOnDate.length >= classToBook.capacity) {
      return res.status(400).json({ message: "Class is already fully booked for this date." });
    }

    // Continue with the rest of the logic (check if user is already booked, etc.)
    const applicationExists = await Application.findOne({
      userId,
      classId,
      date: selectedDate
    });

    if (applicationExists) {
      return res.status(400).json({ message: "You are already booked for this class on this date." });
    }

    // Proceed with booking
    const newApplication = new Application({
      userId,
      classId,
      date: selectedDate
    });
    await newApplication.save();

    // Add this application to the class's applicantsByDate for the selected date
    classToBook.applicantsByDate[selectedDate] = applicantsOnDate.concat(userId);

    // Save the updated class document
    await classToBook.save();

    res.status(200).json({ message: "Class booked successfully" });
  } catch (error) {
    console.error("Error booking class:", error);
    res.status(500).json({ message: "Failed to book class", error: error.message });
  }
};


export const cancelBooking = async (req, res) => {
  const { id: classId } = req.params; // Class ID from route params
  const { date } = req.body; // Date passed in request body
  const userId = req.user.id; // User ID from authenticated request

  try {
    // Step 1: Find the application for the user, class, and date
    const application = await Application.findOne({
      userId,
      classId,
      date,
    });

    // Step 2: Check if the application exists
    if (!application) {
      return res.status(400).json({
        message: "No booking found for the given user, class, and date.",
      });
    }

    // Step 3: Delete the application document
    await Application.deleteOne({ _id: application._id });

    // Step 4: Send success response
    res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
};


// User: Get booked classes
export const getBookedClasses = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find all applications where the userId matches and sort by date in descending order
    const bookedClasses = await Application.find({ userId })
      .populate('classId') // Populate class details if needed
      .sort({ date: -1 });  // Sort by date in descending order (most recent first)

    if (!bookedClasses || bookedClasses.length === 0) {
      return res.status(404).json({ message: "No booked classes found for this user" });
    }

    // Send the sorted list of booked classes
    res.status(200).json(bookedClasses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve booked classes",
      error: error.message,
    });
  }
};


//ISSUE FUNCTIONS -------------------------------------------------------
// User: Get available classes
export const getAvailableClasses = async (req, res) => {
  try {
    let allClasses = await Class.find({ date: { $gt: Date.now() } }).sort({ date: 1 });
    res.status(200).json(allClasses);
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
  try {
    let allClasses = await Class.find({ date: { $gt: Date.now() } }).sort({date:1});
    res.status(200).json(allClasses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve classes", error: error.message });
  }
};
//ISSUE FUNCTIONS OVER-------------------------------------------------------

// Get class by id
export const getClassById = async (req, res) => {
  try {
    const classId = req.params.classId; // Correct the parameter name
    const classDetails = await Class.findOne({ _id: classId });
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(classDetails);
  } catch (error) {
    console.error("Error fetching class details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getListOfUpcomingClasses = async (req, res) => {
  try {
    let allClasses = await Class.find({ date: { $gt: Date.now() } }).sort({ date: 1 });
    res.status(200).json({
      message: "Upcoming classes fetched successfully",
      upcomingClasses: allClasses,
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
    let allClasses = await Class.find({ date: { $lt: Date.now() } }).sort({ date: -1 });
    res.status(200).json({
      message: "Previous classes fetched successfully",
      previousClasses: allClasses,
    });
  } catch (error) {
    console.error("Error occurred:", error);
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
    let classDetails = await Class.findOne({_id:id});
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
  const classId = req.params.classId;
  const { name, email, phoneNumber, CR, selectedDate } = req.body; // selectedDate passed in body

  try {
    // Check if user exists by email
    let user = await User.findOne({ email });
    let customer = await Customer.findOne({ name: CR });

    if (!customer) {
      return res.status(404).json({
        message: "Customer Representative not found",
      });
    }

    let customerId = customer._id;

    if (user) {
      // Check if the user has already booked the class for the selected date
      const existingApplication = await Application.findOne({
        userId: user._id,
        classId,
        date: selectedDate,
      });

      if (existingApplication) {
        return res.status(400).json({
          message: "You have already booked this class for the selected date.",
        });
      }
    } else {
      // Create a new user if not exists
      user = new User({
        name,
        email,
        phoneNumber,
        CR: customerId, // Customer Representative ID
      });
      await user.save();

      // After saving the new user, update the Customer representative's client list
      customer.clients.push(user._id);
      await customer.save();
    }

    // Fetch the class details
    const classToBook = await Class.findById(classId);

    if (!classToBook) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Initialize applicantsByDate if it doesn't exist
    if (!classToBook.applicantsByDate) {
      classToBook.applicantsByDate = {}; // Initialize if not present
    }

    // Check if the class has reached its capacity for the selected date
    const applicantsOnDate = classToBook.applicantsByDate[selectedDate] || [];

    if (applicantsOnDate.length >= classToBook.capacity) {
      return res.status(400).json({
        message: "Class is fully booked for the selected date.",
      });
    }

    // Create a new application
    const newApplication = new Application({
      userId: user._id,
      classId,
      date: selectedDate,
    });
    await newApplication.save();

    // Add this application to the class's applicantsByDate for the selected date
    classToBook.applicantsByDate[selectedDate] = applicantsOnDate.concat(user._id);

    // Save the updated class document
    await classToBook.save();

    res.status(200).json({
      message: "Class booked successfully.",
      user,
      isNewUser: !user._id, // returns true if the user was newly created
    });
  } catch (error) {
    console.error("Error booking class:", error);
    res.status(500).json({
      message: "Failed to book class",
      error: error.message,
    });
  }
};


