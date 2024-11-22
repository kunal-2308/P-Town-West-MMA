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
        const response = await axios.get(
          "http://localhost:5007/api/admin/list/customer/representative"
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
      const bookingResponse = await axios.post(
        `${API_URL}/api/classes/guest/book/class/${classId}`,
        formData
      );
      
      //take his all the details and hit a post req on register
      if(bookingResponse){
          let loginResponse = await axios.post(
            `${API_URL}/api/auth/login`,{
              "email":formData.email,
            }
          );
           //then after success hit the req onto login
        toast.success("Class booked successfully");
        navigate("/dashboard");
      }
     
      
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while booking."
      );
    } finally {
      setViewModal(false);
    }
  };

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
      <div className="flex flex-col items-center py-12 bg-gray-50 mt-40">
        <h1 className="text-3xl font-semibold text-gray-800">{classDetails.name}</h1>
        <p className="mt-4 text-lg text-gray-600">{classDetails.description}</p>
        <button
          onClick={handleBookClass}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
        >
          Book Class
          <MoveRightIcon className="ml-2 text-lg" />
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ClassDetailsGuest;
