import Class from "../models/classModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Application from "../models/bookingModel.js";
import Customer from "../models/customerRepresentativeModel.js";
// User: Book a class
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

export const bookClass = async (req, res) => {
  const { id: classId } = req.params;
  const { id: userId } = req.user;
  const { selectedDate } = req.body; // Extract selected date from request body

  try {
    // Find the class
    const classToBook = await Class.findById(classId);
    if (!classToBook) {
      return res.status(404).json({ message: "Class not found." });
    }

    // Count current bookings for this class on the selected date
    const bookedCount = await Application.countDocuments({ classId, date: selectedDate });

    // Check if the class is already full
    if (bookedCount >= classToBook.capacity) {
      return res.status(400).json({ message: "Class is fully booked for this date." });
    }

    // Check if the user is already booked for this class on the selected date
    const applicationExists = await Application.findOne({ userId, classId, date: selectedDate });

    if (applicationExists) {
      return res.status(400).json({ message: "You are already booked for this class on this date." });
    }

    // Proceed with booking
    const newApplication = new Application({ userId, classId, date: selectedDate });
    await newApplication.save();

    res.status(200).json({ message: "Class booked successfully." });
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
      .populate("classId") // Populate class details if needed
      .sort({ date: -1 }); // Sort by date in descending order (most recent first)

    if (!bookedClasses || bookedClasses.length === 0) {
      return res
        .status(404)
        .json({ message: "No booked classes found for this user" });
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
    let allClasses = await Class.find({ date: { $gt: Date.now() } }).sort({
      date: 1,
    });
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
    let allClasses = await Class.find({ date: { $gt: Date.now() } }).sort({
      date: 1,
    });
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
    const { classId } = req.params;

    // Validate if classId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

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
    let allClasses = await Class.find({ date: { $gt: Date.now() } }).sort({
      date: 1,
    });
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
    let allClasses = await Class.find({ date: { $lt: Date.now() } }).sort({
      date: -1,
    });
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
    const { classId } = req.params;
    const { date } = req.query;

    // Ensure we query using `_id` as a STRING since it's a UUID
    const classDetails = await Class.findOne({ id: classId });

    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }

    res
      .status(200)
      .json({ ...classDetails.toObject(), selectedDate: date || null });
  } catch (error) {
    console.error("Error fetching class details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const bookGuestClasses = async (req, res) => {
  const { classId } = req.params;
  let { name, email, phoneNumber, CR, selectedDate } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !phoneNumber || !selectedDate) {
      return res.status(400).json({ message: "All fields except CR are required." });
    }

    // ✅ Convert date to YYYY-MM-DD format (assuming input is DD-MM-YYYY)
    const [day, month, year] = selectedDate.split("-");
    const formattedDate = `${year}-${month}-${day}`;

    // ✅ Ensure a default Customer Representative (CR) ID
    const DEFAULT_CR_ID = "65f1e6f2a9b4a8b6c8d12345";
    let customer = null;

    if (CR && CR !== "N/A") {
      if (mongoose.Types.ObjectId.isValid(CR)) {
        customer = await Customer.findById(CR);
        if (!customer) {
          console.warn("CR not found, assigning default CR.");
          CR = DEFAULT_CR_ID;
        }
      } else {
        console.warn("Invalid CR ID, assigning default CR.");
        CR = DEFAULT_CR_ID;
      }
    } else {
      CR = DEFAULT_CR_ID;
    }

    // ✅ Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Check if user has already booked this class on the selected date
      const existingApplication = await Application.findOne({
        userId: user._id,
        classId,
        date: formattedDate,
      });

      if (existingApplication) {
        return res.status(400).json({ message: "You have already booked this class for the selected date." });
      }
    } else {
      // ✅ Create new user if not found
      user = new User({
        name,
        email,
        phoneNumber,
        CR: CR !== "N/A" ? customer?._id : null, // Store CR only if valid
      });
      await user.save();

      // ✅ Assign user to customer representative if applicable
      if (customer) {
        customer.clients.push(user._id);
        await customer.save();
      }
    }

    // ✅ Fetch class details
    const classToBook = await Class.findById(classId);
    if (!classToBook) {
      return res.status(404).json({ message: "Class not found." });
    }

    // ✅ Count current bookings for this class on the selected date
    const bookedCount = await Application.countDocuments({ classId, date: formattedDate });

    // ✅ Ensure the class has availability
    if (bookedCount >= classToBook.capacity) {
      return res.status(400).json({ message: "Class is fully booked for the selected date." });
    }

    // ✅ Create a new application
    const newApplication = new Application({
      userId: user._id,
      classId,
      date: formattedDate,
    });
    await newApplication.save();

    let token = generateToken(user._id);

    res.status(200).json({
      message: "Class booked successfully.",
      user,
      token,
    });
  } catch (error) {
    console.error("Error booking class:", error);
    res.status(500).json({ message: "Failed to book class", error: error.message });
  }
};

//all customer
// ->with booked class
// name
// email phone Number

// , class Title Date
export const allApplicants = async (req, res) => {
  let allApplicants = await Application.find({}).populate({
    path: "userId",
    model: "User",
    select: "name email phoneNumber",
  }).populate({
    path: "classId",
    model: "Class",
    select: "title"
  }).limit(2);
  return res.status(200).json({
    message: "Applicants List",
    allApplicants
  });
  // console.log("hello");
}