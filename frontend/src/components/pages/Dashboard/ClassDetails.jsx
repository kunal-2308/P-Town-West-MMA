import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";

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
          const response = await fetch(`http://localhost:5007/api/classes/${classId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          if (!response.ok) {
            const errorMessage = await response.text(); // Get the response body as text
            throw new Error(`Error ${response.status}: ${errorMessage}`);
          }

          const data = await response.json();
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
        const response = await fetch(`http://localhost:5007/api/classes/book/${classId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`${errorMessage}`);
        }

        setBookingSuccess(true);
        console.log("Class booked successfully:", await response.json());
      } catch (err) {
        console.error("Error booking class:", err);
        setBookingError(err.message);
      }
    }
  };

  const handleClose = () => {
    navigate("/dashboard"); 
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
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

  return (
    <>
      <Navbar />
      <div className="h-screen mt-44 mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">{classDetails.name}</h1>
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Date:</span> {classDetails.date}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Time In:</span> {classDetails.timeIn}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Time Out:</span> {classDetails.timeOut}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Slots:</span> {classDetails.slots}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Booked Slots:</span> {classDetails.bookedSlots}
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              <span className="font-semibold">Category:</span> {classDetails.category}
            </p>
          </div>
          {bookingSuccess ? (
            <div className="text-green-500 text-lg font-semibold mb-4">
              You have successfully booked this class!
            </div>
          ) : (
            <>
              {bookingError && (
                <div className="text-red-500 text-lg font-semibold mb-4">{bookingError}</div>
              )}
              <div className="flex justify-center">
                <button
                  className="px-6 py-3 text-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
                  onClick={handleBookClass}
                >
                  Book this Class
                </button>
              </div>
            </>
          )}
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 text-lg bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-lg transition duration-300 ease-in-out"
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
};

export default ClassDetails;
