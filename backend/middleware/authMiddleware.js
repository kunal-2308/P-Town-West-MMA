import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
// Helper function to verify token and fetch user
const verifyTokenAndFetchUser = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  return { decoded, user };
};

// Protect User Middleware
export const protectUser = async (req, res, next) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const { user } = await verifyTokenAndFetchUser(token);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Token verification failed", error: error.message });
  }
};

// Protect Admin Middleware
export const protectAdmin = async (req, res, next) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch user from database
    const user = await adminModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.error("Error in protectAdmin:", error);
    res.status(401).json({
      message: "Token verification failed",
      error: error.message,
    });
  }
};
