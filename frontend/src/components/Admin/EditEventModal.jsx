import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../../configure";

const EditEventModal = ({
  classId,
  onClose,
  isOpen,
  categories = [],
  instructors = [],
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
        const res = await axios.get(`${API_URL}/api/classes/view/admin/${classId}`, {
          withCredentials: true,
        });

        const eventDetails = res.data;

        const formattedDate = eventDetails.date.split("T")[0];
        const formattedTimeIn = new Date(eventDetails.timeIn).toLocaleTimeString(
          "en-GB",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        );
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
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Response error:", error.response.data);
        } else if (error.request) {
          // No response was received
          console.error("Request error:", error.request);
        } else {
          // Something went wrong setting up the request
          console.error("Error message:", error.message);
        }
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

    setIsLoading(true);

    try {
      await axios.put(`${API_URL}/api/admin/update/${classId}`, formData, {
        withCredentials: true,
      });
      toast.success("Event updated successfully.");
      onClose();
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update the event.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${API_URL}/api/admin/delete/${classId}`, {
        withCredentials: true,
      });
      toast.success("Class deleted successfully.");
      onClose(); // Close the modal after successful deletion
    } catch (error) {
      console.error("Error deleting class:", error);
      toast.error("Failed to delete the class.");
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[99999]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
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
              className={`w-full p-2 border rounded-md ${!formData.name && 'border-red-500'}`}
              placeholder="Event Name"
              required
              disabled={isLoading}
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
              className={`w-full p-2 border rounded-md ${!formData.instructor && 'border-red-500'}`}
              placeholder="Enter Instructor"
              list="instructor-list"
              required
              disabled={isLoading}
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
              className={`w-full p-2 border rounded-md ${!formData.slots && 'border-red-500'}`}
              placeholder="No. of Slots"
              required
              disabled={isLoading}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-2">Choose Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${!formData.date && 'border-red-500'}`}
              required
              disabled={isLoading}
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
              className={`w-full p-2 border rounded-md ${!formData.timeIn && 'border-red-500'}`}
              required
              disabled={isLoading}
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
              className={`w-full p-2 border rounded-md ${!formData.timeOut && 'border-red-500'}`}
              required
              disabled={isLoading}
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
              className={`w-full p-2 border rounded-md ${!formData.category && 'border-red-500'}`}
              disabled={isLoading}
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
              disabled={isLoading}
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
            <button className="border border-gray-400 px-3 rounded-md text-gray-500 font-normal hover:bg-red-600 hover:border-none hover:text-white" onClick={handleDelete}>
              Delete Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
