import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminUpcoming from "./AdminUpcoming";
import AdminPrevious from "./AdminPrevious";
import AdminClassAdd from "./AdminClassAdd";
import AdminView from "./AdminView";
import AdminChangePassword from "./AdminChangePassword ";
import AdminAdd from "./AdminAdd";
import { GoHomeFill } from "react-icons/go";
import { FaRegCalendarAlt, FaClipboardList, FaUserPlus } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

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
        return <AdminHome onViewAllClick={setSelectedTab} />;
      case "Upcoming Class":
        return <AdminUpcoming />;
      case "Previous Class":
        return <AdminPrevious />;
      case "Schedule Class":
        return <AdminClassAdd />;
      case "Add Admin":
        return <AdminAdd />;
      case "View Admins":
        return <AdminView />;
      case "Change Password":
        return <AdminChangePassword />;
      default:
        return <p>Welcome to the admin dashboard.</p>;
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("userName");
    Cookies.remove("email");
    navigate("/login");
    localStorage.clear();
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row sm:mt-20 text-white mt-16 p-20 md:gap-x-3">
        <button
          className="md:hidden px-4 py-2 bg-gray-800 text-white z-[999]"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>

        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-[20vw] bg-black text-white p-6 md:static absolute z-50 h-screen md:h-auto rounded-3xl flex flex-col justify-start items-center`}
        >
         <ul className="space-y-4 mt-10">
  <li
    className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${
      selectedTab === "Home"
        ? "bg-customYellow text-black"
        : "hover:bg-customYellow hover:text-black"
    }`}
    onClick={() => setSelectedTab("Home")}
  >
    <GoHomeFill className="text-2xl" />
    <span>Home</span>
  </li>
  <li
    className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${
      selectedTab === "Upcoming Class"
        ? "bg-customYellow text-black"
        : "hover:bg-customYellow hover:text-black"
    }`}
    onClick={() => setSelectedTab("Upcoming Class")}
  >
    <FaRegCalendarAlt className="text-2xl" />
    <span>Upcoming Class</span>
  </li>
  <li
    className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${
      selectedTab === "Previous Class"
        ? "bg-customYellow text-black"
        : "hover:bg-customYellow hover:text-black"
    }`}
    onClick={() => setSelectedTab("Previous Class")}
  >
    <FaClipboardList className="text-2xl" />
    <span>Previous Class</span>
  </li>
  <li
    className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${
      selectedTab === "Schedule Class"
        ? "bg-customYellow text-black"
        : "hover:bg-customYellow hover:text-black"
    }`}
    onClick={() => setSelectedTab("Schedule Class")}
  >
    <FaRegCalendarAlt className="text-2xl" />
    <span>Schedule Class</span>
  </li>
  <li
    className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${
      selectedTab === "Add Admin"
        ? "bg-customYellow text-black"
        : "hover:bg-customYellow hover:text-black"
    }`}
    onClick={() => setSelectedTab("Add Admin")}
  >
    <FaUserPlus className="text-2xl" />
    <span>Add Admin</span>
  </li>
  <li
    className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${
      selectedTab === "View Admins"
        ? "bg-customYellow text-black"
        : "hover:bg-customYellow hover:text-black"
    }`}
    onClick={() => setSelectedTab("View Admins")}  
  >
    <FaUserPlus className="text-2xl" />
    <span>View Admins</span>
  </li>
  <li
    className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${
      selectedTab === "Change Password"
        ? "bg-customYellow text-black"
        : "hover:bg-customYellow hover:text-black"
    }`}
    onClick={() => setSelectedTab("Change Password")}  
  >
    <FaUserPlus className="text-2xl" />
    <span>Change Password</span>
  </li>
  <li
    className="flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer hover:bg-red-500 hover:text-white text-white"
    onClick={handleLogout}
  >
    <IoLogOut className="text-2xl" />
    <span>Logout</span>
  </li>
</ul>
        </div>

        <div className="flex-1 bg-white rounded-lg">
          <div className="mt-4 text-lg text-gray-600">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
