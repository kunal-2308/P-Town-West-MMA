import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { MoveRightIcon } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import { API_URL } from "../../../../configure";
import axios from "axios";
const ClassDetails = () => {
  const { classId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const token = Cookies.get("jwt_token");

  useEffect(() => {
    const fetchClassDetails = async () => {
      if (token) {
        try {
          // const response = await fetch(`${API_URL}/api/classes/${classId}`, {
          //   method: "GET",
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     "Content-Type": "application/json",
          //   },
          //   credentials: "include",
          // });

          const response = await axios.get(`${API_URL}/api/classes/view/${classId}`, { withCredentials: true });

          if (response.status > 200 && response.status < 600) {
            const errorMessage = await response.text(); // Get the response body as text
            throw new Error(`Error ${response.status}: ${errorMessage}`);
          }

          const data = response.data;
          setClassDetails(data);
        } catch (err) {
          console.error("Error fetching class details:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("User is not authenticated");
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [classId, token]);

  const handleBookClass = async () => {
    if (token) {
      try {
        const response = await fetch(`${API_URL}/api/classes/book/${classId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      
        const parsedData = await response.json();
        if (response.status === 200) {
          toast.success("Class booked successfully!");
        } else {
          toast.error(parsedData.message);
        }
      } catch (error) {
        console.error("Error booking class:", error);
      }
      
    }
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
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

  function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(":").map(Number);
    const suffix = hours >= 12 ? "PM" : "AM";
    const hours12 = ((hours + 11) % 12) + 1; // Converts 24-hour to 12-hour
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${suffix}`;
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
      <div className="bg-white w-full max-w-[90%] md:max-w-[70%] h-auto shadow-lg mb-20 rounded-lg p-8 mt-20 mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-start items-center gap-y-10 lg:gap-x-20">
        <div className="w-full lg:w-[30vw] flex-shrink-0">
          <img
            src="/images/Home/Popper/1.png"
            alt=""
            className="w-full h-auto"
          />
        </div>
        <div className="flex flex-col justify-start items-start text-center lg:text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-black mb-6">
            {classDetails.name}
          </h1>
          <div className="mb-6 flex flex-col justify-start items-start lg:pl-5">
            <p className="text-base md:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Date:</span>{" "}
              {classDetails.date.split("T")[0]}
            </p>
            <p className="text-base md:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Time In:</span>{" "}
              {convertTo12HourFormat(classDetails.timeIn)}
            </p>
            <p className="text-base md:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Time Out:</span>{" "}
              {convertTo12HourFormat(classDetails.timeOut)}
            </p>
            <p className="text-base md:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Slots:</span> {classDetails.slots}
            </p>
            <p className="text-base md:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Booked Slots:</span>{" "}
              {classDetails.bookedSlots}
            </p>
            <p className="text-base md:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Category:</span>{" "}
              {classDetails.category}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10">
            <button
              className="px-5 py-2 text-base flex items-center gap-x-2 bg-customYellow text-black font-light rounded-full transition duration-300 ease-in-out"
              onClick={handleBookClass}
            >
              Book Your Slot <MoveRightIcon />
            </button>
            <button
              className="px-5 py-2 text-base flex items-center gap-x-2 bg-customYellow text-black font-light rounded-full transition duration-300 ease-in-out"
              onClick={handleClose}
            >
              Close <IoClose className="font-semibold" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ClassDetails;
