import Class from "../models/classModel.js";
import userModel from "../models/userModel.js";
import Application from "../models/bookingModel.js";
import bcrypt from "bcryptjs";
import customerModel from "../models/customerRepresentativeModel.js";
import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { set } from "mongoose";
// Admin: Add a class

const createToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET);
};

export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    let admin = await adminModel.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(400).json({ message: "User not found" });
    }

    let isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(admin._id, admin.role);

    // res.cookie("jwt_token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Set this to true in production (HTTPS)
    //   sameSite: "strict",
    //   // Omit maxAge for an indefinite cookie, or set a large value in ms (e.g., 5 years)
    //   maxAge: 5 * 365 * 24 * 60 * 60 * 1000, // 5 years in milliseconds
    // });

    return res.status(200).json({
      token,
      userId: admin._id,
      role: admin.role,
      name: admin.name,
      email: admin.email,
      message: "Login Successful!",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(400)
      .json({ message: "Error occurred, please try again!" });
  }
};

// const WEEK_DAYS = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// const formatTimeTo12Hour = (time) => {
//   const [hour, minute] = time.split(":");
//   const hourInt = parseInt(hour, 10);
//   const isPM = hourInt >= 12;
//   const formattedHour = isPM ? hourInt % 12 || 12 : hourInt;
//   const period = isPM ? "PM" : "AM";
//   return `${formattedHour}:${minute} ${period}`;
// };

export const addClass = async (req, res) => {
  try {
    // Destructure the incoming data
    const {
      title,
      type,
      instructor,
      startTime,
      duration,
      capacity,
      description,
      difficulty,
      recurringDays = [],
      isRecurring = false,
      recurrenceWeeks = 1,
      color = "#1976d2",
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !type ||
      !instructor ||
      !startTime ||
      !duration ||
      !capacity ||
      !description ||
      !difficulty
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    // Generate a unique ID
    const id = uuidv4();

    // Create a new class instance
    const newClass = new Class({
      id,
      title,
      type,
      instructor,
      startTime,
      duration,
      capacity,
      description,
      difficulty,
      recurringDays,
      isRecurring,
      recurrenceWeeks,
      color,
    });

    // Save the class to the database
    const savedClass = await newClass.save();

    res.status(201).json({
      message: "Class added successfully.",
      class: savedClass,
    });
  } catch (error) {
    console.error("Error adding class:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the class." });
  }
};
// Admin: Update a class

export const updateClass = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Count the number of applications (booked slots) for this class
    const bookedSlots = await Application.countDocuments({ classId: id });

    // Ensure capacity is never less than booked slots
    if (updates.capacity && updates.capacity < bookedSlots) {
      return res.status(400).json({
        message: `Capacity cannot be less than the number of booked slots (${bookedSlots})`,
      });
    }

    // Validate `recurringDays`
    if (updates.recurringDays) {
      const validDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const isValid = updates.recurringDays.every((day) =>
        validDays.includes(day)
      );
      if (!isValid) {
        return res
          .status(400)
          .json({ message: "Invalid recurring days provided" });
      }
    }

    // Validate `difficulty`
    if (
      updates.difficulty &&
      !["Beginner", "Intermediate", "Advanced"].includes(updates.difficulty)
    ) {
      return res.status(400).json({ message: "Invalid difficulty level" });
    }

    // Update class details
    const updatedClass = await Class.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json(updatedClass);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update class", error: error.message });
  }
};

// Admin: Delete a class
const deleteUserClass = async (userId, classId) => {
  try {
    await userModel.findByIdAndUpdate(userId, {
      $pull: { bookedClasses: classId },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the class by ID
    const classData = await Class.findById(id);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Delete all applications related to this class
    await Application.deleteMany({ classId: id });

    // Delete the class itself
    await Class.findByIdAndDelete(id);

    return res
      .status(200)
      .json({
        message: "Class and related applications deleted successfully!",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete class", error: error.message });
  }
};

// Admin: Get all classes (for managing purposes)
export const getAllClasses = async (req, res) => {
  try {
    // Fetch all classes
    const classes = await Class.find({});

    // Extract unique instructors and categories
    const instructors = [...new Set(classes.map((cls) => cls.instructor))];
    const categories = [...new Set(classes.map((cls) => cls.type))];

    // Send the classes, unique instructors, and unique categories
    res.status(200).json({ classes, instructors, categories });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve classes", error: error.message });
  }
};

export const addAdmin = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, role } = req.body;

    if (!name || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let hashedPassword = await bcrypt.hash(password, 12);
    let adminData = {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    };

    let response = await adminModel.create(adminData);

    res.status(200).json({ message: "Admin added successfully", response });
  } catch (error) {
    console.error("Error adding admin:", error.message);
    res.status(500).json({ message: "Error occurred while adding admin" });
  }
};

export const viewParticularClass = async (req, res) => {
  const { id } = req.params;

  try {
    // Step 1: Fetch Applications with Population
    const applications = await Application.find({ classId: id })
      .populate("userId") // Populate user details
      .exec();

    // Check if applications are fetched correctly
    if (!applications || applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for this class" });
    }

    // Step 2: Group Applications by Date
    const applicantsByDate = {};

    applications.forEach((application) => {
      const date = application.date; // Using the 'date' field
      const applicant = {
        _id: application.userId._id,
        name: application.userId.name,
        email: application.userId.email,
        phoneNumber: application.userId.phoneNumber,
      };

      // Group by date
      if (!applicantsByDate[date]) {
        applicantsByDate[date] = [];
      }
      applicantsByDate[date].push(applicant);
    });

    // Step 3: Fetch Class Details
    const classDetails = await Class.findById(id);
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Final Response
    res.status(200).json({
      classDetails,
      applicantsByDate,
    });
  } catch (error) {
    console.error("Error fetching class details:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch class details", error: error.message });
  }
};

export const getAllAdminList = async (req, res) => {
  try {
    let response = await adminModel.find({ role: "admin" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await adminModel.findByIdAndDelete(id);
    // console.log("Admin Deleted Successfully");
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error occured",
    });
  }
};

export const getData = async (req, res) => {
  try {
    res.status(200).json({
      message: "succcess",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const addCustomerRepresentative = async (req, res) => {
  try {
    let { name } = req.body;

    let newUser = new customerModel({ name: name });

    let response = await newUser.save();

    if (response) {
      return res.status(200).json({
        message: "Customer respresentative added successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "An error occured",
    });
  }
};

export const getRepresentativeList = async (req, res) => {
  try {
    let list = await customerModel.find();
    return res.status(200).json({
      list: list,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const getparticularRepresentative = async (req, res) => {
  try {
    let { name } = req.body; // Make sure `name` is in the body.

    // Fetch the customer representative and their clients.
    let List = await customerModel
      .findOne({ name }, { clients: 1 }) // Only fetching clients field
      .populate({ path: "clients", select: "name email phoneNumber" }); // Populate clients field with specific fields of User model

    if (!List) {
      return res.status(404).json({ message: "Representative not found" });
    }

    return res.status(200).json({
      clients: List.clients, // Send back the list of clients
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    let { password } = req.body;
    // console.log(password);
    let id = req.params.id;
    let hashedPassword = await bcrypt.hash(password, 12);

    let updatedAdmin = await adminModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    return res.status(200).json({
      message: "Password updated successfully",
      updatedAdmin,
    });
  } catch (error) {
    console.log("Error :", error);
    return res.status(400).json({
      message: "Error updating the password",
    });
  }
};

export const deleteRepresentative = async (req, res) => {
  try {
    let id = req.params.id;
    let response = await customerModel.findById(id);

    if (response.name === "No Customer representative") {
      return res.status(205).json({ message: "Cannot delete this representative" });
    } else {
      let { _id } = await customerModel.findOne({ name: "No Customer representative" }, { _id: 1 });

      let clientsList = response.clients;

      // Push all clients to "No Customer representative"
      let updatedCr = await customerModel.findByIdAndUpdate(
        _id,
        { $push: { clients: { $each: clientsList } } },
        { new: true }
      );

      // Delete the original representative
      await customerModel.findByIdAndDelete(id);

      return res.status(200).json({ message: "Representative deleted successfully", updatedCr });
    }
  } catch (error) {
    return res.status(400).json({ error: "An error occurred" });
  }
};

