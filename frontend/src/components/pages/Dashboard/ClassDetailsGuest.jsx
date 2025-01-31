import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { MoveRightIcon } from "lucide-react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { API_URL } from "../../../../configure";

function ClassDetailsGuest() {
  const { classId, date } = useParams();
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/api/classes/guest/${classId}`
        );
        setClassDetails({
          ...response.data, // Add the response data from the API
          selectedDate: date, // Add the date from useParams to the state
        });
        console.log("class data:", response.data);
      } catch (error) {
        console.error("Failed to load class details:", error);
        setError("Failed to load class details.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [classId, date]); // Adding date to the dependency array ensures the effect runs when `date` changes

  const handleClose = () => {
    navigate("/guest/dashboard");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen gap-x-3">
        <FaSpinner className="animate-spin text-indigo-600" />
        <p className="text-xl font-semibold text-gray-600">
          Loading class details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (!classDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">No class found.</p>
      </div>
    );
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
      <div className="bg-white w-full max-w-[70%] h-auto shadow-lg mb-20 rounded-lg p-8 mt-20 mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-start items-center gap-y-10 lg:gap-x-20">
        <div className="div-1-image-container w-full lg:w-[30vw]">
          <img
            src="/images/Home/Popper/1.png"
            alt=""
            className="w-full h-auto"
          />
        </div>
        <div className="flex flex-col justify-start items-start text-center lg:text-left">
          <h1 className="text-2xl lg:text-4xl font-bold text-black mb-6">
            {classDetails.title || "Class Name"}
          </h1>
          <div className="mb-6 flex flex-col justify-start items-start lg:pl-5">
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Description:</span>{" "}
              {classDetails.description}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Date:</span>{" "}
              {classDetails.startTime.split("T")[0] || "N/A"}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Time:</span>{" "}
              {classDetails.startTime || "N/A"}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Duration:</span>{" "}
              {classDetails.duration} mins
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Instructor:</span>{" "}
              {classDetails.instructor}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Type:</span> {classDetails.type}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Difficulty:</span>{" "}
              {classDetails.difficulty}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Capacity:</span>{" "}
              {classDetails.capacity}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Selected Date:</span> {classDetails.selectedDate}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Recurring:</span>{" "}
              {classDetails.isRecurring
                ? `Yes (${classDetails.recurrenceWeeks} weeks)`
                : "No"}
            </p>
            {classDetails.isRecurring && (
              <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
                <span className="font-semibold">Recurring Days:</span>{" "}
                {classDetails.recurringDays.join(", ")}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-y-4 sm:gap-y-0 sm:gap-x-4">
            <button
              className="px-5 py-2 text-base flex flex-row gap-x-2 bg-customYellow text-black font-light rounded-full shadow-md hover:bg-gray-900 hover:text-white duration-300 ease-linear"
              // onClick={handleBookClass}
            >
              Book Now <MoveRightIcon />
            </button>
            <button
              className="px-5 py-2 text-base flex flex-row gap-x-2 bg-white text-gray-800 font-light rounded-full shadow-md hover:bg-gray-900 hover:text-white duration-300 ease-linear"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ClassDetailsGuest;
