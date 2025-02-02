import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { MoveRightIcon } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { API_URL } from "../../../../configure";

// eslint-disable-next-line react/prop-types
const ClassDetails = ({ isGuest = false }) => {
  const { classId, date } = useParams();
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [representatives, setRepresentatives] = useState([]);
  const token = Cookies.get("jwt_token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    CR: "",
    selectedDate: date || "",
  });

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        setLoading(true);
        const url = isGuest
          ? `${API_URL}/api/classes/guest/${classId}?date=${date}`
          : `${API_URL}/api/classes/view/${classId}`;

        const headers = isGuest ? {} : { Authorization: `Bearer ${token}` };
        const response = await axios.get(url, { headers });
        setClassDetails(response.data);
      } catch (error) {
        console.error("Error fetching class details:", error);
        setError("Failed to load class details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRepresentatives = async () => {
      if (!isGuest) return;
      try {
        const response = await axios.get(
          `${API_URL}/api/admin/list/customer/representative`
        );
        const reps = response.data.list.map((rep) => ({
          id: rep._id,
          name: rep.name,
        }));
        setRepresentatives(reps);
      } catch (error) {
        console.error("Error fetching representatives:", error);
        toast.error("Failed to load customer representatives.");
      }
    };

    fetchClassDetails();
    fetchRepresentatives();
  }, [classId, date, isGuest, token]);

  const handleClose = () => setViewModal(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBookClass = async (e) => {
    if (e) e.preventDefault();

    if (isGuest && formData.phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number!");
      return;
    }

    setBookingLoading(true);
    try {
      const url = isGuest
        ? `${API_URL}/api/classes/guest/book/class/${classDetails._id}`
        : `${API_URL}/api/classes/book/${classId}`;

      const headers = isGuest ? {} : { Authorization: `Bearer ${token}` };
      const data = isGuest ? formData : {};
      const response = await axios.post(url, data, { headers });

      if (isGuest) {
        const { token, user } = response.data;
        if (token) {
          Cookies.set("jwt_token", token, { secure: true });
          Cookies.set("userName", user.name, { secure: true });
          Cookies.set("email", user.email, { secure: true });
          toast.success("Login successful!");
        }
      }

      toast.success("Class booked successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Booking failed.");
    } finally {
      setBookingLoading(false);
      setViewModal(false);
    }
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

  return (
    <>
      <Navbar />
      <div className="relative mt-10 mb-20 overflow-hidden">
        <img src="/images/Training/3.png" alt="" className="w-screen" />
        <div className="absolute inset-y-1/2 left-0 transform -translate-y-1/2 text-customYellow text-2xl md:text-5xl font-medium sm:pl-40 pl-10">
          Schedule an Appointment
        </div>
      </div>
      <div className="bg-white w-full max-w-[70%] shadow-lg mb-20 rounded-lg p-8 mt-20 mx-auto flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[30vw]">
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
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Date:</span>{" "}
              {classDetails.startTime.split("T")[0]}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Time:</span>{" "}
              {classDetails.startTime}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Instructor:</span>{" "}
              {classDetails.instructor}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="px-5 py-2 text-base flex items-center gap-x-2 bg-customYellow text-black font-light rounded-full transition"
              onClick={() => setViewModal(true)}
              disabled={bookingLoading}
            >
              {bookingLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                "Book Now"
              )}
              <MoveRightIcon />
            </button>
            <button
              className="px-5 py-2 text-base flex items-center gap-x-2 bg-gray-400 text-white rounded-full transition"
              onClick={handleClose}
            >
              Close <IoClose />
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {viewModal && isGuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Book Your Class
            </h2>
            <form onSubmit={handleBookClass} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Full Name"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassDetails;
