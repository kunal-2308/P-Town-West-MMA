import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../../../configure";
import Cookies from "js-cookie";

const AdminAdd = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password:"",
    role: "admin",
  });

  const token = Cookies.get("jwt_token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios
      .post(
        `${API_URL}/api/admin/add/admin`,
        adminData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token as a header
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setAdminData({
          name: "",
          email: "",
          phoneNumber: "",
          password:"",
        });
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'Something went wrong!';
        toast.error(errorMessage);
      });
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

        {/*Password*/}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={adminData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter password"
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
