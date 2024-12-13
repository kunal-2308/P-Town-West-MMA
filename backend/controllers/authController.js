import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../models/userModel.js";

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
    res.cookie("role", user.role); // Ensure role is also set for the user

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
    const user = await User.findOne({ email }).populate("bookedClasses"); // Populate booked classes

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate JWT token
    const token = createToken(user._id, user.role);

    // Set the token and user details in cookies
    res.cookie("jwt_token", token, { maxAge: 3 * 24 * 60 * 60 * 1000 }); // 3 days expiry
    res.cookie("userName", user.name, { maxAge: 3 * 24 * 60 * 60 * 1000 });
    res.cookie("role", user.role, { maxAge: 3 * 24 * 60 * 60 * 1000 });

    // Send the token and user details back (excluding password for security)
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        bookedClasses: user.bookedClasses, // Include booked classes if needed
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

  try {
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const token = createToken(admin._id, admin.role);

    res.cookie("jwt_token", token);

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
    let userId = req.user._id;

    // Fetch user details and populate bookedClasses
    let userDetails = await User.findById(userId).populate("bookedClasses");

    res.status(200).json({
      message: "User fetched successfully",
      userDetails,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error occurred: ${error}`,
    });
  }
};

