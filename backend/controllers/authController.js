import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../models/userModel.js";
import Application from '../models/bookingModel.js'
// Helper function to create token
const createToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET);
};

// Register :
export const register = async (req, res) => {
  const { name, email, phoneNumber, CR } = req.body;

  if (!name || !email || !phoneNumber || !CR) {
    return res.status(400).json({
      message: "Something is missing",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      phoneNumber,
      CR
    });

    const token = createToken(user._id, user.role);

    // Set token and userName in cookies
    res.cookie("token", token);
    res.cookie("userName", user.name);
    res.cookie("role", user.role);

    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email and populate the "bookedClasses" field from the Application model
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the booked classes for the user by checking the Application model
    const bookedClasses = await Application.find({ userId: user._id }).populate("classId");

    // Calculate the total number of booked classes
    const totalBookedClasses = bookedClasses.length;

    // Generate JWT token
    const token = createToken(user._id, user.role);

    // Set the token and user details in cookies
    res.cookie("jwt_token", token, { maxAge: 3 * 24 * 60 * 60 * 1000 }); // 3 days expiry
    res.cookie("userName", user.name, { maxAge: 3 * 24 * 60 * 60 * 1000 });
    res.cookie("role", user.role, { maxAge: 3 * 24 * 60 * 60 * 1000 });

    // Send the token, total number of booked classes, and user details back (excluding password for security)
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        totalBookedClasses,  // Include total booked classes
        bookedClasses: bookedClasses, // Include the details of booked classes
      },
    });

    console.log(user.name);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};



// Admin Login
export const adminLogin = async (req, res) => {
  const { email } = req.body;
  console.log("AdminEMail",email)

  try {
    const admin = await User.findOne({ email});
    console.log(admin);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const token = createToken(admin._id, admin.role);

    res.status(200).json({
      token,
      userId: admin._id,
      role: admin.role,
      name: admin.name,
      email: admin.email,
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt_token");
    res.clearCookie("email");
    res.clearCookie("role");
    res.clearCookie("userName");
    res.status(200).json({
      message: "Logged out successfully",
      status: "true",
    });
    res.redirect("/login");
  } catch (error) {
    res.status(400).json({
      message: { error },
      status: "false",
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch user details and populate necessary fields (optional)
    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all applications for the user and populate the class details
    const applications = await Application.find({ userId }).populate("classId");

    // Calculate the total number of booked classes
    const totalBookedClasses = applications.length;

    res.status(200).json({
      message: "User fetched successfully",
      userDetails: {
        ...userDetails.toObject(),  // Convert userDetails to plain object
        totalBookedClasses,
        bookedClasses: applications.map((application) => application.classId), // Extract class details from the populated classId
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error occurred: ${error}`,
    });
  }
};



