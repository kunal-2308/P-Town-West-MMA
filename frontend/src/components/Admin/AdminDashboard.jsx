import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminUpcoming from "./AdminUpcoming";
import AdminPrevious from "./AdminPrevious";
import AdminClassAdd from "./AdminClassAdd";
import AdminAdd from "./AdminAdd";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Home");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "Home":
        return <AdminHome />;
      case "Upcoming Class":
        return <AdminUpcoming />;
      case "Previous Class":
        return <AdminPrevious />;
      case "Schedule Class":
        return <AdminClassAdd />;
      case "Add Admin":
        return <AdminAdd />;
      default:
        return <p>Welcome to the admin dashboard.</p>;
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("userName");
    Cookies.remove("email");
    navigate("/admin/login");
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col md:flex-row sm:mt-20 mt-16">
        <button
          className="md:hidden px-4 py-2 bg-gray-800 text-white z-[999]"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>

        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block sm:w-[30vw] w-[50vw] bg-gray-800 text-white p-6 md:static absolute z-50 h-screen md:h-auto`}
        >
          <h1 className="text-3xl font-bold mb-8 mt-20">Admin</h1>
          <ul className="space-y-4">
            <li
              className={`text-lg font-semibold hover:bg-gray-700 p-3 rounded cursor-pointer ${
                selectedTab === "Home" ? "bg-gray-700" : ""
              }`}
              onClick={() => setSelectedTab("Home")}
            >
              Home
            </li>
            <li
              className={`text-lg font-semibold hover:bg-gray-700 p-3 rounded cursor-pointer ${
                selectedTab === "Upcoming Class" ? "bg-gray-700" : ""
              }`}
              onClick={() => setSelectedTab("Upcoming Class")}
            >
              Upcoming Class
            </li>
            <li
              className={`text-lg font-semibold hover:bg-gray-700 p-3 rounded cursor-pointer ${
                selectedTab === "Previous Class" ? "bg-gray-700" : ""
              }`}
              onClick={() => setSelectedTab("Previous Class")}
            >
              Previous Class
            </li>
            <li
              className={`text-lg font-semibold hover:bg-gray-700 p-3 rounded cursor-pointer ${
                selectedTab === "Schedule Class" ? "bg-gray-700" : ""
              }`}
              onClick={() => setSelectedTab("Schedule Class")}
            >
              Schedule Class
            </li>
            <li
              className={`text-lg font-semibold hover:bg-gray-700 p-3 rounded cursor-pointer ${
                selectedTab === "Add Admin" ? "bg-gray-700" : ""
              }`}
              onClick={() => setSelectedTab("Add Admin")}
            >
              Add Admin
            </li>
            <button
              className="text-lg w-full text-left font-semibold hover:bg-red-500 hover:text-white p-3 rounded cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </ul>
        </div>

        <div className="flex-1 bg-gray-100 p-10">
          <h2 className="text-4xl font-bold text-gray-700">{selectedTab}</h2>
          <div className="mt-4 text-lg text-gray-600">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
