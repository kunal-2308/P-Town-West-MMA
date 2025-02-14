import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner"; // If using toast notifications
import { MoveRightIcon } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { API_URL } from "../../../../configure";

function ClassDetailsGuest() {
  const { classId, date } = useParams();
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [representatives, setRepresentatives] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    CR: "",
    selectedDate: date || "",
  });

  const token = Cookies.get("jwt_token");

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/api/classes/guest/${classId}?date=${date}`
        );
        setClassDetails(
          { ...response.data },
          {
            selectedDate: date,
          }
        );
      } catch (error) {
        console.error("Failed to load class details:", error);
        setError("Failed to load class details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRepresentatives = async () => {
      try {
        let str = `${API_URL}/api/admin/list/customer/representative`;
        console.log(str);
        const response = await axios.get(str);
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
  }, [classId, date]);

  const handleCloseBtn = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/guest/dashboard");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "CR" && value.trim() === "" ? "N/A" : value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number length
    if (formData.phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number!");
      return;
    }

    const submissionData = {
      ...formData,
      CR: formData.CR || "N/A",
    };

    try {
      // Attempt to book the class
      const bookingResponse = await axios.post(
        `${API_URL}/api/classes/guest/book/class/${classDetails._id}`,
        submissionData
      );
      console.log(submissionData);
      console.log(bookingResponse);
      const { token, message } = bookingResponse.data;

      // Show success message from API
      toast.success(message || "Class booked successfully!");

      if (token) {
        localStorage.setItem("jwt_token", token);

        // Log in the user
        const loginResponse = await axios.post(`${API_URL}/api/auth/login`, {
          email: formData.email,
        });

        if (loginResponse.status === 200) {
          const { token, user } = loginResponse.data;
          localStorage.setItem("email", user.email);
          Cookies.set("jwt_token", token, { secure: true });
          Cookies.set("userName", user.name, { secure: true });
          Cookies.set("email", user.email, { secure: true });

          toast.success("Login successful!");

          // Redirect user to the correct dashboard based on the role
          setTimeout(() => {
            navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
            localStorage.setItem("role", user.role);
          }, 1000);
        } else {
          toast.error(loginResponse.data.message || "Login failed. Try again.");
        }
      } else {
        toast.success("Class booked successfully! Redirecting...");
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to /dashboard if token exists
        }, 500);
      }
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;

        if (status === 400 && data.message.includes("already booked")) {
          toast.error("You have already booked this class for this date!");
        } else if (status === 404) {
          toast.error("Class not found. Please check the details.");
        } else {
          toast.error(data.message || "Booking failed. Please try again.");
        }
      } else {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      }
    } finally {
      setViewModal(false);
    }
  };

  const handleBookNow = async () => {
    if (token) {
      try {
        // Fetch user details before booking
        const userResponse = await axios.get(
          `${API_URL}/api/auth/user/details`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const user = userResponse.data.userDetails;

        // Send user's details directly to the API
        const bookingResponse = await axios.post(
          `${API_URL}/api/classes/guest/book/class/${classDetails._id}`,
          {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            CR: user.CR || "",
            selectedDate: date || "",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast.success(
          bookingResponse.data.message || "Class booked successfully!"
        );
        navigate("/dashboard");
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Booking failed. Please try again."
        );
      }
    } else {
      setViewModal(true); // Show the form if the user is not logged in
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
              <span className="font-semibold">Date:</span>{" "}
              {classDetails.selectedDate}
            </p>
            {/* <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
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
            )} */}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-y-4 sm:gap-y-0 sm:gap-x-4">
            <button
              className="px-5 py-2 text-base flex flex-row gap-x-2 bg-customYellow text-black font-light rounded-full shadow-md hover:bg-gray-900 hover:text-white duration-300 ease-linear"
              onClick={handleBookNow}
            >
              Book Now <MoveRightIcon />
            </button>
            <button
              className="px-5 py-2 text-base flex flex-row gap-x-2 bg-white text-gray-800 font-light rounded-full shadow-md hover:bg-gray-900 hover:text-white duration-300 ease-linear"
              onClick={handleCloseBtn}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {/* Booking Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Book Your Class
            </h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email || ""}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div>
                <label
                  htmlFor="CR"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Customer Representative
                </label>
                <select
                  id="CR"
                  name="CR"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={formData.CR || "N/A"}
                  onChange={handleChange}
                >
                  <option value="">-- Choose your representative --</option>
                  <option value="N/A">No Representative (N/A)</option>
                  {representatives.map((rep) => (
                    <option key={rep.id} value={rep.id}>
                      {rep.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selected Date
                </label>
                <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                  {classDetails.selectedDate}
                </p>
              </div>
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setViewModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ClassDetailsGuest;
