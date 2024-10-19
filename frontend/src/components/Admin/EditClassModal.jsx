import { useState, useEffect } from "react";

const EditClassModal = ({ isOpen, onClose, classData, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState(classData);

  useEffect(() => {
    setUpdatedData(classData);
  }, [classData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Update Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClassModal;
