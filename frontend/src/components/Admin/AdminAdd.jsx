import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../../configure";
const AdminAdd = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password:"adminpassword",
    role: "admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let response = await axios.post(`${API_URL}/api/admin/add/admin`, adminData, {
      withCredentials: true,
    });
    if(!response.status.ok){
      toast.error(response.data.message);
    }else{
      toast.success(response.data.message);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add a New Admin</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={adminData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter email"
            required
          />
        </div>
        
        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={adminData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter 10-digit phone number"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-400 rounded-md text-gray-500"
          >
            Discard
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-customYellow text-black font-semibold text-base rounded-md"
          >
            Add Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAdd;
