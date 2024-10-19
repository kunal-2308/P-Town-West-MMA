import { useState } from "react";

const AdminClassAdd = () => {
  const [formData, setFormData] = useState({
    class: "",
    level: "",
    trainer: "",
    slots: "",
    date: "",
    startTime: "",
    endTime: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Schedule a Class</h2>
      <form className="grid grid-cols-2 gap-6">
        {/* Select Class */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Class</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option>Select</option>
            {/* Add class options here */}
          </select>
        </div>

        {/* Select Level */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option>Select</option>
            {/* Add level options here */}
          </select>
        </div>

        {/* Select Trainer */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Trainer
          </label>
          <select
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option>Select</option>
            {/* Add trainer options here */}
          </select>
        </div>

        {/* Enter No. of Slots */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter No. of Slots
          </label>
          <input
            type="number"
            name="slots"
            value={formData.slots}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Value"
          />
        </div>

        {/* Choose Date */}
        <div>
          <label className="block text-sm font-medium mb-2">Choose Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium mb-2">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium mb-2">End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Additional Message */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2">
            Additional Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter additional message"
          />
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-400 rounded-md text-gray-500"
          >
            Discard
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminClassAdd;
