import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AdminHome from "./AdminHome";
import NewAddClass from "./NewAddClass";
import AdminView from "./AdminView";
import AdminChangePassword from "./AdminChangePassword ";
import AdminAdd from "./AdminAdd";
import AddSchedule from "./AddSchedule";
import { MdSchedule } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaRegCalendarAlt, FaUserPlus } from "react-icons/fa";
import { IoLogOut, IoMenu, IoClose } from "react-icons/io5";
import DisplayUploadedImage from "./DisplaySchedule";
import CustomerRelationship from "./CustomerRelationship";
import { FaUsers } from "react-icons/fa";
import ViewAllApplicants from "./ViewAllApplicants";

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
      case "Schedule a Class":
        return <NewAddClass />;
      case "All Applicants":
        return <ViewAllApplicants />;
      case "Add Admin":
        return <AdminAdd />;
      case "View Admins":
        return <AdminView />;
      case "Change Password":
        return <AdminChangePassword />;
      case "Add Schedule":
        return <AddSchedule />;
      case "Display Schedule":
        return <DisplayUploadedImage />;
      case "Customer Representative":
        return <CustomerRelationship />;
      default:
        return <p>Welcome to the admin dashboard.</p>;
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("userName");
    Cookies.remove("email");
    navigate("/admin/login");
    localStorage.clear();
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row sm:mt-20 text-white mt-16 md:p-6 lg:p-20 gap-x-3">
        <button
          className="md:hidden flex items-center px-4 py-2 text-black mt-4 z-[999] mb-20 hover:from-blue-500 hover:to-purple-600 transition duration-300 group"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <IoClose size={24} className="text-white" />
          ) : (
            <IoMenu size={24} />
          )}
        </button>

        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-[70vw] h-[75vh] overflow-y-scroll md:w-[20vw] bg-black text-white p-6 md:static absolute z-50 md:h-auto flex flex-col items-center transform transition-transform duration-300 ease-in-out md:rounded-3xl`}
        >
          <ul className="space-y-4 mt-10 w-full">
            {[
              { label: "Home", icon: <GoHomeFill /> },
              { label: "Schedule a Class", icon: <FaRegCalendarAlt /> },
              { label: "All Applicants", icon: <FaUsers /> },
              { label: "Add Admin", icon: <FaUserPlus /> },
              { label: "View Admins", icon: <FaUserPlus /> },
              { label: "Change Password", icon: <FaUserPlus /> },
              { label: "Add Schedule", icon: <MdSchedule /> },
              { label: "Display Schedule", icon: <MdSchedule /> },
              { label: "Customer Representative", icon: <FaUsers /> },
            ].map((item, index) => (
              <li
                key={index}
                className={`flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer ${
                  selectedTab === item.label
                    ? "bg-customYellow text-black"
                    : "hover:bg-customYellow hover:text-black"
                }`}
                onClick={() => {
                  setSelectedTab(item.label);
                  if (isSidebarOpen) toggleSidebar(); // Close sidebar if it's open
                }}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.label}</span>
              </li>
            ))}
            <li
              className="flex items-center gap-x-2 text-lg font-normal p-3 rounded-xl cursor-pointer hover:bg-red-500 hover:text-white text-white"
              onClick={() => {
                handleLogout();
                if (isSidebarOpen) toggleSidebar(); // Close sidebar if it's open
              }}
            >
              <IoLogOut className="text-2xl" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
        <div className="flex-1 bg-white rounded-lg mt-6 mb-20 md:mt-0 p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="text-lg text-gray-600">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
