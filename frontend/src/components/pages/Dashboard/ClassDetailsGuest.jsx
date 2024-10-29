import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { MoveRightIcon } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { API_URL } from "../../../../configure";

function ClassDetailsGuest() {
    const { classId } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
      const [classDetails, setClassDetails] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [bookingError, setBookingError] = useState(null);
      const [bookingSuccess, setBookingSuccess] = useState(false);
    useEffect(()=>{
        try {
            let getData = async() =>{
                setLoading(true);
                let response = await axios.get(`${API_URL}/api/classes/guest/${classId}`);
                setClassDetails(response.data);
                setLoading(false);
            }
            getData();  
        } catch (e) {
            setError(e);
        }
       
    },[classId]);

    const handleBookClass = async () => {
        navigate('/login');
        toast.error('To Book A Class, Please Signup / Login')
      };
      
    
      const handleClose = () => {
        navigate("/guest/dashboard");
      };
    
      if (loading) {
        return (
          <div className="flex justify-center items-center h-screen gap-x-3">
            <FaSpinner className="animate-spin"/>
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
    <Navbar/>
    
    <div className="div-1-herosection relative mt-20">
        <img src='/images/Training/3.png' alt="" className="w-screen h-[400px]" />
        <div className="absolute inset-y-1/2 left-0 transform -translate-y-1/2 text-customYellow text-7xl  font-medium pl-40 pb-40 w-[50%]">
          Schedule an Appointment
        </div>
      </div>
      <div className=" bg-white w-[70%] h-auto shadow-lg mb-20 rounded-lg p-8 mt-20 mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-row justify-start items-center gap-x-20">
        <div className="div-1-image-container w-[30vw]">
          <img src="/images/Home/Popper/1.png" alt="" />
        </div>
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-4xl font-bold text-black mb-6 text-center">
            {classDetails.name}
          </h1>
          <div className="mb-6 flex flex-col justify-start items-start pl-5">
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Date:</span> {classDetails.date.split('T')[0]}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Time In:</span>{" "}
              {classDetails.timeIn}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Time Out:</span>{" "}
              {classDetails.timeOut}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Slots:</span> {classDetails.slots}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Booked Slots:</span>{" "}
              {classDetails.bookedSlots}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Category:</span>{" "}
              {classDetails.category}
            </p>
          </div>
          <div className="div flex flex-row justify-center items-center gap-x-10">
            <div className="flex flex-row justify-center items-center gap-x-4">
              <button
                className="px-5 py-2 text-base flex flex-row gap-x-2 bg-customYellow  text-black font-light rounded-full transition duration-300 ease-in-out"
                onClick={handleBookClass}
              >
                Book Your Slot <MoveRightIcon />
              </button>
              <button
                className="px-5 py-2 text-base flex flex-row justify-center items-center gap-x-2 bg-customYellow  text-black font-light rounded-full transition duration-300 ease-in-out"
                onClick={handleClose}
              >
                Close <IoClose className="font-semibold" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default ClassDetailsGuest