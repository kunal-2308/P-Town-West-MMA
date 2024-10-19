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
      <div className="flex flex-col md:flex-row sm:mt-20 mt-16 p-20 md:gap-x-3">
        <button className="md:hidden px-4 py-2 bg-gray-800 text-white z-[999]" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>

        <div className={`${isSidebarOpen ? "block" : "hidden"} md:block w-[20vw] bg-lightGray text-black p-6 md:static absolute z-50 h-screen md:h-auto rounded-lg pl-10`}>
          <h1 className="text-xl font-light mb-8 mt-5">Admin</h1>
          <ul className="space-y-4">
            <li className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${selectedTab === "Home" ? "bg-customBlue text-white" : "text-black/60 hover:bg-customBlue hover:text-white"}`} onClick={() => setSelectedTab("Home")}>
              <GoHomeFill className="text-2xl" />
              <span>Home</span>
            </li>
            <li className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${selectedTab === "Upcoming Class" ? "bg-customBlue text-white" : "text-black/60 hover:bg-customBlue hover:text-white"}`} onClick={() => setSelectedTab("Upcoming Class")}>
              <FaRegCalendarAlt className="text-2xl" />
              <span>Upcoming Class</span>
            </li>
            <li className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${selectedTab === "Previous Class" ? "bg-customBlue text-white" : "text-black/60 hover:bg-customBlue hover:text-white"}`} onClick={() => setSelectedTab("Previous Class")}>
              <FaClipboardList className="text-2xl" />
              <span>Previous Class</span>
            </li>
            <li className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${selectedTab === "Schedule Class" ? "bg-customBlue text-white" : "text-black/60 hover:bg-customBlue hover:text-white"}`} onClick={() => setSelectedTab("Schedule Class")}>
              <FaRegCalendarAlt className="text-2xl" />
              <span>Schedule Class</span>
            </li>
            <li className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${selectedTab === "Add Admin" ? "bg-customBlue text-white" : "text-black/60 hover:bg-customBlue hover:text-white"}`} onClick={() => setSelectedTab("Add Admin")}>
              <FaUserPlus className="text-2xl" />
              <span>Add Admin</span>
            </li>
            <li className="flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer hover:bg-red-500 hover:text-white text-black/60" onClick={handleLogout}>
              <IoLogOut className="text-2xl" />
              <span>Logout</span>
            </li>
          </ul>
        </div>

        <div className="flex-1 bg-white p-10 rounded-lg">
          <div className="mt-4 text-lg text-gray-600">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    
    </>
  );
};

export default AdminDashboard;
