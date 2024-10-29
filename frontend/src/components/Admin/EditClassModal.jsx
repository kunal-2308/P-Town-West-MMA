import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../configure";

const EditClassModal = ({
  isOpen,
  onClose,
  classData,
  onUpdate,
  categories,
  instructors,
}) => {
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
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/admin/update/${updatedData._id}`,
        updatedData,
        { withCredentials: true }
      );
      toast.success("Class successfully updated!");
      onUpdate(response.data);
    } catch (error) {
      console.error("Error updating class:", error);
      toast.error("An error occurred while updating the class.");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Class</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Class Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Class Name</label>
            <input
              type="text"
              name="name"
              value={updatedData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={updatedData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              list="category-list"
              required
            />
            <datalist id="category-list">
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </datalist>
          </div>

          {/* Instructor */}
          <div>
            <label className="block text-sm font-medium mb-1">Instructor</label>
            <input
              type="text"
              name="instructor"
              value={updatedData.instructor}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              list="instructor-list"
              required
            />
            <datalist id="instructor-list">
              {instructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))}
            </datalist>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={updatedData.date.split("T")[0]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="time"
              name="timeIn"
              value={updatedData.timeIn}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="time"
              name="timeOut"
              value={updatedData.timeOut}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Slots */}
          <div>
            <label className="block text-sm font-medium mb-1">Slots</label>
            <input
              type="number"
              name="slots"
              value={updatedData.slots}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={updatedData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-400 rounded-md text-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded-md text-white ${
                isLoading ? "bg-gray-400" : "bg-blue-600"
              }`}
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
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    slots: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    timeIn: PropTypes.string.isRequired,
    timeOut: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  instructors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EditClassModal;
