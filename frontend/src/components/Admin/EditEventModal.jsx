import { useState, useEffect } from "react";
import axios from "axios";

const EditEventModal = ({ isOpen, onClose, classItem, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    timeIn: "",
    timeOut: "",
    slots: "",
  });

  useEffect(() => {
    if (classItem) {
      setFormData({
        name: classItem.name || "",
        // Validate date before formatting it to avoid "Invalid time value" error
        date: classItem.date && !isNaN(new Date(classItem.date).getTime()) 
          ? new Date(classItem.date).toISOString().split("T")[0]
          : "", // If invalid or null, leave it empty
        timeIn: classItem.timeIn || "",
        timeOut: classItem.timeOut || "",
        slots: classItem.slots || "",
      });
    }
  }, [classItem]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5007/api/classes/admin/${classItem._id}`, formData, {
        withCredentials: true,
      });
      onSave();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen || !classItem) return null; // Check if modal should be open and classItem is available

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-3xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-customYellow">Edit Event</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Class Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="time"
                name="timeIn"
                value={formData.timeIn}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="time"
                name="timeOut"
                value={formData.timeOut}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slots</label>
            <input
              type="number"
              name="slots"
              value={formData.slots}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </form>
        <div className="flex justify-end mt-6 gap-4">
          <button onClick={onClose} className="text-sm bg-gray-400 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="text-sm bg-customYellow text-black px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;
