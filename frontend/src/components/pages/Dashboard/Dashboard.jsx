import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [allClasses, setAllClasses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [previousClasses, setPreviousClasses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of classes per page

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      navigate("/login");
    } else {
      const userName = Cookies.get("userName");
      setUser({ displayName: userName });

      if (token) {
        axios
          .get("http://localhost:5007/api/classes/all-classes", {
            withCredentials: true,
          })
          .then((response) => {
            setAllClasses(response.data);
          })
          .catch((error) => {
            console.error("Error fetching all classes:", error);
          });

        // Simulate fetching upcoming and previous classes
        setUpcomingClasses([]); // Replace with real data
        setPreviousClasses([]); // Replace with real data
      }
    }
  }, [navigate]);

  // Category filter handler
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  const filteredClasses = allClasses.filter((cls) => {
    return selectedCategory === "All" || cls.category === selectedCategory;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);

  // Get current classes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClasses = filteredClasses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("userName");
    Cookies.remove("email");
    navigate("/login");
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Navbar />
      {/* Main content */}
      <div className="flex flex-col lg:flex-row lg:h-screen justify-between mt-20 px-6 lg:mt-52">
        {/* Left Section - All Classes */}
        <div className="w-full lg:w-3/4 mb-8 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            Available Classes
          </h1>
          <div className="flex space-x-2 lg:space-x-4 mb-4">
            <button
              className={`px-3 lg:px-4 py-1 lg:py-2 rounded ${
                selectedCategory === "All"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleCategoryClick("All")}
            >
              All
            </button>
            <button
              className={`px-3 lg:px-4 py-1 lg:py-2 rounded ${
                selectedCategory === "Striking"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleCategoryClick("Striking")}
            >
              Striking
            </button>
            {/* Add more categories similarly */}
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden">
            {currentClasses.map((cls) => (
              <div key={cls._id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">{cls.name}</h2>
                <p>{cls.date}</p>
                <p>{cls.time}</p>
                <p>{cls.slots} slots available</p>
                <div>
                  <button className="my-4 p-2 rounded-lg bg-black text-white">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1 ? "bg-gray-300" : "bg-purple-500 text-white"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-purple-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Section - User Info and Class Schedule */}
        <div className="w-full lg:w-1/4 lg:pl-4">
          {/* User Info */}
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg lg:text-xl font-bold">
              Welcome, {user?.displayName}
            </h2>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white mt-6 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Upcoming Classes</h3>
            {upcomingClasses.length > 0 ? (
              upcomingClasses.map((cls) => (
                <div key={cls._id} className="bg-gray-100 p-2 rounded-lg mb-2">
                  <p>{cls.name}</p>
                  <p>{cls.date}</p>
                  <p>{cls.time}</p>
                </div>
              ))
            ) : (
              <p>No upcoming classes scheduled.</p>
            )}
          </div>

          {/* Previous Classes */}
          <div className="bg-white mt-6 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Previous Classes</h3>
            {previousClasses.length > 0 ? (
              previousClasses.map((cls) => (
                <div key={cls._id} className="bg-gray-100 p-2 rounded-lg mb-2">
                  <p>{cls.name}</p>
                  <p>{cls.date}</p>
                  <p>{cls.time}</p>
                </div>
              ))
            ) : (
              <p>No previous classes attended.</p>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200 hidden sm:block"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mt-10"></div>
      <Footer />
    </>
  );
};

export default Dashboard;
