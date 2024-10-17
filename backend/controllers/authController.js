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

// Set cookie helper
const setCookie = (res, name, value, options = {}) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(name, value, {
      httpOnly: true,
      secure: false, // Should be false for local development
      maxAge: 5 * 24 * 60 * 60, // 5 days in seconds
      sameSite: "Strict",
      path: "/", // Cookie path
      ...options,
    })
  );
};

// Register
export const register = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

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
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(user._id, user.role);

    // Set cookies for token, userName, and role
    // setCookie(res, "token", token);
    // setCookie(res, "userName", user.name); // Use `user` instead of `admin`
    // setCookie(res, "role", user.role); // Use `user.role`

    res.cookie("jwt-token", token);
    res.status(200).json({
      token,
      userId: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res
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

    res.cookie("jwt-token", token);

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
