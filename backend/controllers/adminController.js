import Class from "../models/classModel.js";

export const getAdminClasses = async (req, res) => {
  try {
    const classes = await Class.find({});
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  const { classId, name, date, time, professor, slots } = req.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      {
        name,
        date,
        time,
        professor,
        slots,
      },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
