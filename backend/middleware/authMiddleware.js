import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectUser = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

export const protectAdmin = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user.role !== "admin")
      return res.status(403).json({ message: "Admin access only" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};
