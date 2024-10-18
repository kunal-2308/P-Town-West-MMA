import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../models/userModel.js";

// Helper function to create token
const createToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "5d", // 5 days token expiry
  });
};

// // Set cookie helper
// const setCookie = (res, name, value, options = {}) => {
//   res.setHeader(
//     "Set-Cookie",
//     cookie.serialize(name, value, {
//       httpOnly: true,
//       secure: false, // Should be false for local development
//       maxAge: 5 * 24 * 60 * 60, // 5 days in seconds
//       sameSite: "Strict",
//       path: "/", // Cookie path
//       ...options,
//     })
//   );
// };

// Register :
export const register = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  if (!name || !email || !password || !phoneNumber) {
    return res.status(400).json({
      message: "Something is missing",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    const token = createToken(user._id, user.role);

    // Set token and userName in cookies
    // setCookie(res, "token", token);
    // setCookie(res, "userName", user.name);
    // setCookie(res, "role", user.role); // Ensure role is also set for the user

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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate("bookedClasses"); // Populate booked classes

    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(user._id, user.role);

    // Set cookies for token, userName, and role
    res.cookie("jwt_token", token);

    // Send back the user details along with the booked classes
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(admin._id, admin.role);

    // Set token and userName in cookies
    // setCookie(res, "token", token);
    // setCookie(res, "userName", admin.name);
    // setCookie(res, "role", admin.role);

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
