import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditClassModal = ({ isOpen, onClose, classData, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState(classData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUpdatedData(classData);
  }, [classData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !updatedData.name ||
      !updatedData.date ||
      !updatedData.timeIn ||
      !updatedData.timeOut ||
      !updatedData.slots
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsLoading(true); // Set loading state while the API request is in progress

    try {
      const { id } = updatedData; // Assuming classData contains an ID for the class
      await axios.put(
        `http://localhost:5007/api/admin/update/${id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      toast.success("Class successfully updated!");
      onUpdate(updatedData); // Notify the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating class:", error);
      toast.error("An error occurred while updating the class.");
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-4 rounded-md shadow-md max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Edit Class</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block mb-1">Class Name</label>
            <input
              type="text"
              name="name"
              value={updatedData.name}
              onChange={handleChange}
              className="w-full border rounded-md p-1"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={updatedData.date.split("T")[0]}
              onChange={handleChange}
              className="w-full border rounded-md p-1"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Time In</label>
            <input
              type="time"
              name="timeIn"
              value={updatedData.timeIn}
              onChange={handleChange}
              className="w-full border rounded-md p-1"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Time Out</label>
            <input
              type="time"
              name="timeOut"
              value={updatedData.timeOut}
              onChange={handleChange}
              className="w-full border rounded-md p-1"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Slots</label>
            <input
              type="number"
              name="slots"
              value={updatedData.slots}
              onChange={handleChange}
              className="w-full border rounded-md p-1"
              required
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="px-4 py-2 border rounded-md text-gray-500 mr-2"
              onClick={onClose}
              disabled={isLoading} // Disable the Cancel button while loading
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 ${
                isLoading ? "bg-gray-400" : "bg-blue-600"
              } text-white rounded-md`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditClassModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classData: PropTypes.shape({
    id: PropTypes.string.isRequired, // Assuming ID is a string, adjust if it's a number
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    timeIn: PropTypes.string.isRequired,
    timeOut: PropTypes.string.isRequired,
    slots: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditClassModal;
