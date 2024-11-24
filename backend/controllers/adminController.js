import Class from "../models/classModel.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import customerModel from "../models/customerRepresentativeModel.js";
import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
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

    res.cookie("jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set this to true in production (HTTPS)
      sameSite: "strict",
      // Omit maxAge for an indefinite cookie, or set a large value in ms (e.g., 5 years)
      maxAge: 5 * 365 * 24 * 60 * 60 * 1000, // 5 years in milliseconds
    });

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

export const addClass = async (req, res) => {
  const {
    name,
    date,
    timeIn,
    timeOut,
    slots,
    instructor,
    description,
    category,
  } = req.body;

  try {
    const classDate = new Date(date);
    const newClass = await Class.create({
      name,
      date: classDate,
      timeIn,
      timeOut,
      slots,
      instructor,
      description,
      category,
    });
    res.status(201).json(newClass);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add class", error: error.message });
  }
};

// Admin: Update a class
export const updateClass = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Find the class to check current values
    const existingClass = await Class.findById(id);
    if (!existingClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if `slots` is being updated
    if (updates.slots && updates.slots > existingClass.bookedSlots) {
      updates.isFull = false; // Set isFull to false if slots > bookedSlots
    }

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

    // Remove the class from each user's bookedClasses
    const removePromises = classData.applicants.map((userId) =>
      deleteUserClass(userId, id)
    );
    const results = await Promise.all(removePromises);

    // Check if any deletion failed
    if (results.includes(false)) {
      return res.status(400).json({ message: "Failed to update some users" });
    }

    // Delete the class
    await Class.findByIdAndDelete(id);

    return res.status(200).json({ message: "Deletion successful!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete class", error: error.message });
  }
};


// Admin: Get all classes (for managing purposes)
export const getAllClasses = async (req, res) => {
  try {
    // Fetch all classes
    const classes = await Class.find({});

    // Extract unique instructors and categories
    const instructors = [...new Set(classes.map((cls) => cls.instructor))];
    const categories = [...new Set(classes.map((cls) => cls.category))];

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
    let response = await Class.findById(id).populate({
      path: "applicants",
      select: "name email phoneNumber",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    console.log("Admin Deleted Successfully");
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
    let { name } = req.body;
    let List = await customerModel
      .findOne({ name }, { clients: 1 })
      .populate({ path: "clients" });

    return res.status(200).json({
      array: List.clients,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    let { password } = req.body;
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

    let response = await customerModel.findByIdAndDelete(id);
    if (response) {
      return res.status(200).json({
        message: "Representative deleted successfully",
      });
    } else {
      return res.status(400).json({
        message: "Error occured while deleting a respresentative",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: "occured" });
  }
};
