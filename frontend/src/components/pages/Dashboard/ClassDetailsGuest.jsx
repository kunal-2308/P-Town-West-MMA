import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { MoveRightIcon } from "lucide-react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { API_URL } from "../../../../configure";
import { toast } from "sonner";
import Cookies from "js-cookie";

function ClassDetailsGuest() {
  const { classId } = useParams();
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
  });

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/api/classes/guest/${classId}`
        );
        setClassDetails(response.data);
      } catch (error) {
        setError("Failed to load class details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRepresentatives = async () => {
      try {
        let str = `${API_URL}/api/admin/list/customer/representative`;
        console.log(str);
        const response = await axios.get(
         str
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
  }, [classId]);

  const handleBookClass = () => {
    setViewModal(true);
  };

  const handleClose = () => {
    navigate("/guest/dashboard");
  };

  const onClose = () => {
    setViewModal(false);
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      CR: "",
    }); // Reset form data when closing modal
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      // Book the class
      const bookingResponse = await axios.post(
        `${API_URL}/api/classes/guest/book/class/${classId}`,
        formData
      );
      const { token } = bookingResponse.data;

      if (token) {
        localStorage.setItem("jwt_token", token);
        toast.success("Class booked successfully");
        // Login after booking
        debugger
        const loginResponse = await axios.post(
          `${API_URL}/api/auth/login`,
          { "email": formData.email }
        );

        if (loginResponse.status == 200) {
          const { token, user } = loginResponse.data;

          Cookies.set("jwt_token", token, { secure: true });
          Cookies.set("userName", user.name, { secure: true });
          Cookies.set("email", user.email, { secure: true });

          toast.success("Login successful!");

          setTimeout(() => {
            if (user.role === "admin") {
              navigate("/admin/dashboard");
              localStorage.setItem("role", "admin");
            } else {
              navigate("/dashboard");
              localStorage.setItem("role", "user");
            }
          }, 1000);
        } else {
          toast.error(
            loginResponse.data.message || "Login failed. Please try again."
          );
        }
      }
    } catch (error) {
      toast.error('error occured');
      setViewModal(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen gap-x-3">
        <FaSpinner className="animate-spin text-indigo-600" />
        <p className="text-xl font-semibold text-gray-600">Loading class details...</p>
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

  if (viewModal) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Contact Form</h2>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              <IoClose className="text-xl" />
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm px-4 py-2"
                value={formData.name}
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm px-4 py-2"
                value={formData.email}
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm px-4 py-2"
                value={formData.phoneNumber}
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="CR"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Representative
              </label>
              <select
                id="CR"
                name="CR"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm px-4 py-2"
                value={formData.CR}
                required
                onChange={handleChange}
              >
                <option value="">--Choose your representative--</option>
                {representatives.map((rep) => (
                  <option key={rep.id} value={rep.id}>
                    {rep.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
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
            {classDetails.name}
          </h1>
          <div className="mb-6 flex flex-col justify-start items-start lg:pl-5">
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Date:</span>{" "}
              {classDetails.date.split("T")[0]}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Time In:</span>{" "}
              {classDetails.timeIn}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Time Out:</span>{" "}
              {classDetails.timeOut}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Slots:</span> {classDetails.slots}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Booked Slots:</span>{" "}
              {classDetails.bookedSlots}
            </p>
            <p className="text-base lg:text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Category:</span>{" "}
              {classDetails.category}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-y-4 sm:gap-y-0 sm:gap-x-4">
            <button
              className="px-5 py-2 text-base flex flex-row gap-x-2 bg-customYellow text-black font-light rounded-full shadow-md hover:bg-gray-900 hover:text-white duration-300 ease-linear"
              onClick={handleBookClass}
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
