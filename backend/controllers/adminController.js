import Class from "../models/classModel.js";

// Admin: Add a class
export const addClass = async (req, res) => {
  const { name, date, time, slots, instructor, category } = req.body;

  try {
    const week = moment(date).isoWeek();
    const classDate = new Date(date);
    const newClass = await Class.create({
      name,
      date: classDate,
      time,
      slots,
      instructor,
      category,
      week,
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
    const classes = await Class.find({});
    res.status(200).json(classes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve classes", error: error.message });
  }
};
