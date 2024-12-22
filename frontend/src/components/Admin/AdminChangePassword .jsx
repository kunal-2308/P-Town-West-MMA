import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { API_URL } from "../../../configure";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const AdminChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminId, setAdminId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = Cookies.get('jwt_token');

  useEffect(() => {
    const id = Cookies.get('id');
    setAdminId(id);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate passwords
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    axios
      .put(
        `${API_URL}/api/admin/update/password/${adminId}`,
        { password: confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token as a header
          },
        }
      )
      .then(() => {
        toast.success("Password updated successfully!");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        toast.error("Failed to update password.");
      });
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg w-full py-2 px-4"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash className="size-5 pt-1"/> : <FaEye className="size-5 pt-1"/>}
          </button>
        </div>

        <div className="mb-6 relative">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded-lg w-full py-2 px-4"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-10"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default AdminChangePassword;
