import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { connectDB } from "../config/db.js";

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const admin = await User.create({
      name: "Admin",
      email: "ayushmanmishra094@gmail.com",
      role: "admin",
      phoneNumber: "9324051808",
      CR : 'admin'
    });

    console.log("Admin user created:", admin);
  } catch (error) {
    console.error("Error seeding admin user:", error.message);
  }
};

seedAdmin()
  .then(() => mongoose.connection.close())
  .catch((error) => console.error(error));
