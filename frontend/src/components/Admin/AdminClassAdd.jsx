import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../../configure";

const AdminClassAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    instructor: "",
    slots: "",
    date: "",
    timeIn: "", // Updated to timeIn
    timeOut: "", // Updated to timeOut
    description: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/admin/all`,
          {
            withCredentials: true,
          }
        );
        console.log("API Response:", response.data); // Log to ensure we get data
        const { categories, instructors } = response.data;
        setCategories(categories);
        setInstructors(instructors);
      } catch (error) {
        console.error("Error fetching details:", error);
        toast.error("Failed to load categories or instructors.");
      }
    };

    fetchDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      !formData.timeIn || // Updated validation
      !formData.timeOut || // Updated validation
      !formData.description
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsLoading(true); // Show loading state when submitting

    try {
      await axios.post(`${API_URL}/api/admin/add`, formData, {
        withCredentials: true,
      });

      setFormData({
        name: "",
        instructor: "",
        slots: "",
        date: "",
        timeIn: "", // Reset timeIn
        timeOut: "", // Reset timeOut
        description: "",
        category: "",
      });
      toast.success("Class successfully added!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while adding the class.");
    } finally {
      setIsLoading(false); // Stop loading once done
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Schedule a Class</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Class Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Class Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Class Name"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select/Enter Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter Category"
            list="category-list"
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
          <label className="block text-sm font-medium mb-2">
            Select/Enter Instructor
          </label>
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter Instructor"
            list="instructor-list"
          />
          <datalist id="instructor-list">
            {instructors.map((instructor) => (
              <option key={instructor} value={instructor}>
                {instructor}
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
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="No. of Slots"
          />
        </div>

        {/* Date */}
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
            name="timeIn" // Updated name to timeIn
            value={formData.timeIn}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium mb-2">End Time</label>
          <input
            type="time"
            name="timeOut" // Updated name to timeOut
            value={formData.timeOut}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
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
  );
};

export default AdminClassAdd;
