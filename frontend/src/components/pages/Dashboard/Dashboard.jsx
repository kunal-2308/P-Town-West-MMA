import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../../components/shared/Modal"; // Import the Modal component
import { FaSpinner, FaUserAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { CrossIcon, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { Button } from "../../ui/button";
import { ImCancelCircle } from "react-icons/im";
import { API_URL } from "../../../../configure";
import { GiCancel } from "react-icons/gi";
import { toast } from "sonner";

const Dashboard = () => {
  const [allClasses, setAllClasses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [userName, setUserName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [allBookedClasses, setAllBookedClasses] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of classes per page

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      navigate("/guest/dashboard");
    } else {
      if (token) {
        // setLoading(true);
        axios
          .get(`${API_URL}/api/classes/all-classes`, {
            withCredentials: true,
          })
          .then((response) => {
            const classes = response.data;
            setAllClasses(classes);
            const uniqueCategories = [
              ...new Set(classes.map((cls) => cls.category)),
            ];
            setCategories(uniqueCategories);
          })
          .catch((error) => {
            console.error("Error fetching all classes:", error);
          });

        axios
          .get(`${API_URL}/api/auth/user/details`, {
            withCredentials: true,
          })
          .then((response) => {
            const { userDetails } = response.data;
            const bookedClasses = userDetails.bookedClasses;
            setUpcomingClasses(bookedClasses);
            // Set the user name
            setUserName(userDetails.name);
            // Assuming 'name' is the field in user details
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
        // setLoading(false);
      }
    }
  }, [navigate]);

  // Handle class click
  const handleClick = (classId) => {
    navigate(`/classes/${classId}`); // Redirect to a new page with the class ID in the URL
  };

  // Category filter handler
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
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
    localStorage.clear();
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

  // Open modal with all upcoming classes
  const handleShowAllClasses = () => {
    setAllBookedClasses(upcomingClasses);
    setShowModal(true);
  };

  const getMonthAbbreviation = (dateString) => {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    // Extract the month from the date string
    const monthIndex = new Date(dateString).getMonth(); // getMonth() returns 0-based index

    // Return the corresponding abbreviated month name
    return months[monthIndex];
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("T")[0].split("-");

    // Return in the format 'dd/mm/yyyy'
    return `${day}/${month}/${year}`;
  };

  function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(":").map(Number);
    const suffix = hours >= 12 ? "PM" : "AM";
    const hours12 = ((hours + 11) % 12) + 1; // Converts 24-hour to 12-hour
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${suffix}`;
  }

  const handleCancelBooking = async(_id) =>{
      try {
        let response = await axios.get(`${API_URL}/api/classes/cancel/${_id}`,{withCredentials:true});
        if(response.status==200) toast.success('Class unbooked successfully');

      } catch (error) {
          toast.error('Error occured while unbooking class');
          console.log(error);
      }
  }

  return (
    <>
      <Navbar />
      <div className="div-1-herosection relative mt-10 mb-20 overflow-hidden">
        <img src="/images/Training/3.png" alt="" className="w-screen" />
        <div className="absolute inset-y-1/2 left-0 transform -translate-y-1/2 text-customYellow text-2xl md:text-5xl sm:text-6xl font-medium sm:pl-40 pl-10 w-[50%] sm:w-full">
          Schedule an Appointment
        </div>
      </div>

      {/* Main content */}
      {loading ? (
        <div className="flex flex-col lg:flex-row lg:h-screen justify-between mt-36 px-6 lg:mt-20">
          {/* Left Section - All Classes */}
          <div className="w-full lg:w-3/4 mb-8 lg:mb-0 pl-10 pr-10">
            <h1 className="text-2xl lg:text-2xl font-medium mb-4">
              Available Classes
            </h1>
            <div className="flex space-x-2 lg:space-x-4 mb-4 overflow-x-auto">
              <button
                className={`flex items-center px-3 lg:px-4 py-1 lg:py-2 rounded ${selectedCategory === "All"
                  ? "bg-customPurple text-black border-[1px] border-customBorderGray rounded-xl"
                  : "bg-white border-[1px] border-customBorderGray rounded-xl"
                  }`}
                onClick={() => handleCategoryClick("All")}
              >
                {selectedCategory === "All" && (
                  <TiTick className="mr-1 text-lg" />
                )}{" "}
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  className={`flex items-center px-3 lg:px-4 py-1 lg:py-2 rounded ${selectedCategory === category
                    ? "bg-customPurple text-black border-[1px] border-customBorderGray rounded-xl"
                    : "bg-white border-[1px] border-customBorderGray rounded-xl"
                    }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {selectedCategory === category && (
                    <TiTick className="mr-1 text-lg" />
                  )}
                  {category}
                </button>
              ))}
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6 overflow-hidden p-5">
              {currentClasses.length !== 0 ? (
                currentClasses.map((cls) => (
                  <div
                    key={cls._id}
                    onClick={() => handleClick(cls._id)}
                    className="bg-white text-black rounded-3xl shadow-md flex hover:cursor-pointer flex-col justify-start items-start mb-6"
                  >
                    <div className="div-1-container flex justify-between items-center w-full bg-black text-white h-20 rounded-t-3xl p-3">
                      <div className="div-1-cont flex flex-col justify-start items-start pl-2">
                        <span className="text-2xl font-medium">
                          {cls.category}
                        </span>
                        <span className="text-xs font-medium">
                          {cls.instructor}
                        </span>
                      </div>
                      <div className="div-2-cont flex flex-col justify-start items-start pr-2">
                        <div className="badge bg-customYellow text-black rounded-full flex justify-center items-center p-1 px-2">
                          <span className="text-[12px] font-semibold">
                            {cls.slots === cls.bookedSlots
                              ? "Slots Full"
                              : `Available: ${cls.slots - cls.bookedSlots}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="div-content-section bg-white text-black mt-3 flex justify-between items-center w-full px-4">
                      <div className="div-content-1 flex flex-row justify-start items-center gap-x-2">
                        <MdOutlineCalendarMonth className="text-sm" />
                        <span className="text-xs font-semibold">
                          {formatDate(cls.date)}
                        </span>
                      </div>
                      <div className="div-time-section flex flex-row justify-start items-center gap-x-2">
                        <FaRegClock className="text-sm" />
                        <span className="text-xs font-semibold">
                          {convertTo12HourFormat(cls.timeIn)} - {convertTo12HourFormat(cls.timeOut)}
                        </span>
                      </div>
                    </div>
                    <div className="div-info-section my-4 px-4 flex flex-col justify-start items-start">
                      <span className="text-sm font-medium">
                        Please carry the following essentials:
                      </span>
                      <span className="text-xs font-semibold">
                        Gloves, Water Bottle, Towel
                      </span>
                    </div>
                    <div className="div-button-section w-full flex justify-center items-center my-4">
                      <Button className="bg-black text-white text-sm font-semibold hover:animate-pulse">
                        BOOK NOW
                        <FaRegClock className="text-sm ml-2" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center mt-6 w-full">
                  <span className="text-lg font-medium text-gray-500">No classes available</span>
                </div>
              )}

            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-10">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 flex flex-row justify-center items-center gap-x-2 rounded ${currentPage === 1
                  ? "bg-gray-300"
                  : "bg-customPurple text-black"
                  }`}
              >
                <MoveLeftIcon /> Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 flex flex-row justify-center items-center gap-x-2 py-2 rounded ${currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-customPurple text-black"
                  }`}
              >
                Next <MoveRightIcon />
              </button>
            </div>
          </div>

          {/* Right Section - User Info and Class Schedule */}
          <div className="w-full lg:w-1/4 lg:pl-4">
            {/* details Card */}
            <div className="div-details-card flex flex-col gap-4 justify-center items-center bg-white border-2 border-gray-200 rounded-3xl">
              <div className="div-user-info-container bg-black text-white flex flex-row justify-start items-center gap-x-4 w-full pl-5 rounded-t-3xl h-16">
                <div className="div-main-image-logo border-2 border-white border-dotted rounded-full w-10 h-10 flex justify-center items-center">
                  <FaUserAlt className="text-white text-2xl" />
                </div>
                <div className="div-main-user-name flex flex-row gap-x-1b text-white">
                  <span className="text-base font-light">Welcome, </span>
                  <span className="text-base font-bold pl-1">{userName}</span>
                </div>
              </div>

              <div className="w-full px-5 flex flex-col justify-center items-center rounded-3xl shadow-md">
                <div className="div-title w-full bg-black text-white flex mb-3 flex-row justify-center items-center gap-x-2 p-2 pl-4 rounded-xl">
                  <MdOutlineCalendarMonth className="text-sm" />
                  <span className="text-sm font-semibold text-white">
                    Upcoming Classes
                  </span>
                </div>
                {upcomingClasses.length != 0 ? (
                  <>
                    {upcomingClasses.slice(0, 2).map((cls) => (
                      <div
                        key={cls._id}
                        className="bg-black text-white p-3 w-full rounded-lg mb-2 flex flex-row justify-start items-center gap-x-3"
                      >
                        <div className="div-calendar-col bg-white w-11 h-11 rounded-lg flex flex-col justify-start items-center p-1">
                          <span className="bg-black text-white text-[9px] text-center w-full rounded-xl">
                            {getMonthAbbreviation(cls.date)}
                          </span>
                          <span className="text-black text-[16px] text-center w-full rounded-xl">
                            {cls.date.split("T")[0].split("-")[2]}
                          </span>
                        </div>
                        <div className="div-content text-white flex flex-col justify-start items-start">
                          <span className="text-lg font-semibold">
                            {cls.name}
                          </span>
                          <span className="text-[11px] font-light w-full text-start">
                            {convertTo12HourFormat(cls.timeIn)} -{" "}
                            {convertTo12HourFormat(cls.timeOut)}
                          </span>
                        </div>
                        <div className="cancel-booking-logo ml-10"><GiCancel className="size-5 hover:cursor-pointer" onClick={()=>handleCancelBooking(cls._id)}/></div>
                      </div>
                    ))}
                    {upcomingClasses.length > 2 && (
                      <button
                        className="text-black underline font-light text-sm mb-4"
                        onClick={handleShowAllClasses}
                      >
                        +{upcomingClasses.length - 2} more
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-white text-center text-xs mt-3">
                    No upcoming classes scheduled.
                  </p>
                )}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-3 w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-500 transition duration-200 block"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen gap-x-3">
          <FaSpinner className="animate-spin" />
          <p className="text-xl font-semibold text-gray-600">
            Loading class details...
          </p>
        </div>
      )}

      {/* Modal for showing all booked classes */}
      {showModal && (
        <Modal
        // title="All Upcoming Classes"
        // className="bg-black"
        >
          <div className="div-main-container w-full text-black mb-4 rounded-3xl flex justify-between items-center">
            <span className="text-2xl font-semibold">All Upcoming Classes</span>
            <span>
              <ImCancelCircle
                className="text-xl cursor-pointer"
                onClick={() => setShowModal(false)}
              />
            </span>
          </div>
          {allBookedClasses.map((cls) => (
            <div
              key={cls._id}
              className="bg-black p-2 text-white w-full rounded-lg mb-2 flex flex-row justify-start items-center gap-x-3"
            >
              <div className="div-calendar-col bg-customYellow w-11 h-11 rounded-lg flex flex-col justify-start items-center p-1">
                <span className="bg-black text-white text-[9px] text-center w-full rounded-xl">
                  {getMonthAbbreviation(cls.date)}
                </span>
                <span className="text-black text-[16px] text-center w-full rounded-xl">
                  {cls.date.split("T")[0].split("-")[2]}
                </span>
              </div>
              <div className="div-content text-white flex flex-col justify-start items-start">
                <span className="text-lg font-semibold">{cls.name}</span>
                <span className="text-[11px] font-light w-full text-start">
                  {convertTo12HourFormat(cls.timeIn)} -{" "}
                  {convertTo12HourFormat(cls.timeOut)}
                </span>
              </div>
            </div>
          ))}
        </Modal>
      )}
      <div className="h-[14vh]"></div>
      <Footer />
    </>
  );
};

export default Dashboard;
