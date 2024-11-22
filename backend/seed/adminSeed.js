import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import adminModel from "../models/adminModel.js";
import { connectDB } from "../config/db.js";

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    let password = "adminpassword";
    let hashedPassword = await bcrypt.hash(password,12);
    console.log('hashed password : ',hashedPassword);
    const admin = await adminModel.create({
      name: "Admin",
      email: "ayushmanmishra094@gmail.com",
      role: "admin",
      password: hashedPassword,
      phoneNumber: "9324051808"
    });

    console.log("Admin user created:", admin);
  } catch (error) {
    console.error("Error seeding admin user:", error.message);
  }
};

seedAdmin()
  .then(() => mongoose.connection.close())
  .catch((error) => console.error(error));
