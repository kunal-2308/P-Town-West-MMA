import Class from "../models/classModel.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import customerModel from "../models/customerRepresentativeModel.js";
// Admin: Add a class
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
export const deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    await Class.findByIdAndDelete(id);
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res
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
  const adminData = req.body; // Access the body directly

  try {
    let response = await userModel.create(adminData);
    console.log("Admin Added Successfully");
    res.status(200).json({ message: "Admin added successfully", response });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
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
    let response = await userModel.find({ role: "admin" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  await userModel.findByIdAndDelete(id);
  console.log("Admin Deleted Successfully");
  res.status(200).json({ message: "Admin deleted successfully" });
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
    let List = await customerModel.findOne({ name }, { "clients": 1 }).populate({path:'clients'});

    return res.status(200).json({
      "List" : List.clients
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};
