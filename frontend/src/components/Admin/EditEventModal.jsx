import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEventModal = ({
  classId,
  onClose,
  isOpen,
  categories = [], // Ensure categories is initialized as an empty array
  instructors = [], // Ensure instructors is initialized as an empty array
}) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    timeIn: "",
    timeOut: "",
    instructor: "",
    category: "",
    slots: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5007/api/classes/${classId}`,
          {
            withCredentials: true,
          }
        );

        const eventDetails = res.data;

        // Convert the date to the required format
        const formattedDate = eventDetails.date.split("T")[0]; // Get the 'YYYY-MM-DD' part
        const formattedTimeIn = new Date(
          eventDetails.timeIn
        ).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        const formattedTimeOut = new Date(
          eventDetails.timeOut
        ).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        setFormData({
          ...eventDetails,
          date: formattedDate,
          timeIn: formattedTimeIn,
          timeOut: formattedTimeOut,
        });
      } catch (error) {
        console.error("Error fetching event details:", error);
        toast.error("Failed to load event details.");
      }
    };

    if (classId) {
      fetchEventDetails();
    }
  }, [classId]);

  if (!isOpen) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.instructor ||
      !formData.category ||
      !formData.slots ||
      !formData.date ||
      !formData.timeIn ||
      !formData.timeOut
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsLoading(true); // Show loading state when submitting

    try {
      await axios.put(
        `http://localhost:5007/api/admin/update/${classId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success("Event updated successfully.");
      onClose();
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update the event.");
    } finally {
      setIsLoading(false); // Stop loading once done
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[99999]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-6">
          Edit Event: {formData.name || "Unnamed Event"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Event Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Event Name"
              required
            />
          </div>

          {/* Instructor */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select/Enter Instructor
            </label>
            <input
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Instructor"
              list="instructor-list"
              required
            />
            <datalist id="instructor-list">
              {instructors.map((inst) => (
                <option key={inst._id} value={inst.name}>
                  {inst.name}
                </option>
              ))}
            </datalist>
          </div>

          {/* Slots */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter No. of Slots
            </label>
            <input
              type="number"
              name="slots"
              value={formData.slots}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="No. of Slots"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Choose Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium mb-2">Start Time</label>
            <input
              type="time"
              name="timeIn"
              value={formData.timeIn}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium mb-2">End Time</label>
            <input
              type="time"
              name="timeOut"
              value={formData.timeOut}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Category */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">
              Select/Enter Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              list="category-list"
            />
            <datalist id="category-list">
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </datalist>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-400 rounded-md text-gray-500"
              onClick={onClose}
            >
              Discard
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded-md text-white ${
                isLoading ? "bg-gray-400" : "bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
