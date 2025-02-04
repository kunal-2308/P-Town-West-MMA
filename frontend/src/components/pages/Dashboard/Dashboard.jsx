import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { API_URL } from "../../../../configure";
import { toast } from "sonner";
import { Helmet } from "react-helmet";
import ClientView from "./ViewClass";
import { SchedulerProvider } from "../../../context/SchedulerContext";

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState("");
  const [bookedClasses, setBookedClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      navigate("/guest/dashboard");
    } else {
      const mailCookie = Cookies.get("email");
      setUserEmail(mailCookie || "User");
      fetchBookedClasses(token);
    }
  }, [navigate]);

  const fetchBookedClasses = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/classes/booked`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookedClasses(response.data);
    } catch (error) {
      console.error("Error fetching booked classes:", error);
      toast.error("Failed to load booked classes.");
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("userName");
    Cookies.remove("email");
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Helmet>
        <title>P-Town West MMA | Book a Free Trial Class</title>
        <meta
          name="description"
          content="Experience world-class training with a free trial class at P-Town West MMA in Pune, Baner. Try our MMA, Muay Thai, kickboxing, boxing, and wrestling programs, guided by expert trainers."
        />
        <meta
          name="keywords"
          content="Book free trial MMA Pune, free trial martial arts Baner, MMA trial class Pune, Kickboxing trial Baner, free Muay Thai session Pune, combat sports trial Pune, martial arts beginners free class"
        />
      </Helmet>

      <Navbar />
      <div className="relative mt-10 mb-20 overflow-hidden">
        <img src="/images/Training/3.png" alt="Training" className="w-screen" />
        <div className="absolute inset-y-1/2 left-0 transform -translate-y-1/2 text-customYellow text-2xl md:text-5xl font-medium sm:pl-40 pl-10">
          Schedule an Appointment
        </div>
      </div>

      <div className="flex justify-between items-center px-6 mt-8">
        <h1 className="text-2xl font-semibold">Welcome, {userEmail}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white z-10 px-4 py-2 rounded-md hover:bg-red-400 transition"
        >
          Logout
        </button>
      </div>

      <SchedulerProvider>
        <ClientView />
      </SchedulerProvider>

      <div className="max-w-7xl mx-auto mt-12 p-6 bg-customDark rounded-lg">
        <h2 className="text-xl text-customYellow font-semibold mb-4">
          Your Booked Classes
        </h2>

        {bookedClasses.length > 0 ? (
          bookedClasses.map((cls) => (
            <div key={cls._id} className="bg-customGray p-3 rounded-lg mb-4">
              <div className="div-content text-white flex flex-col justify-start items-start">
                <h3 className="text-lg font-semibold">{cls.classId?.title}</h3>
                <p className="text-[11px] font-light w-full text-start">
                  {new Date(cls.date).toLocaleDateString()} -{" "}
                  {cls.classId?.startTime} ({cls.classId?.duration} mins)
                </p>
                <p className="text-[11px] font-light w-full text-start">
                  Type: {cls.classId?.type}
                </p>
                <p className="text-[11px] font-light w-full text-start">
                  Difficulty: {cls.classId?.difficulty}
                </p>
                <p className="text-[11px] font-light w-full text-start">
                  Capacity: {cls.classId?.capacity}
                </p>
                <p className="text-[11px] font-light w-full text-start">
                  Description:{" "}
                  <span className="w-24">{cls.classId?.description}</span>
                </p>
                <p className="text-[11px] font-light w-full text-start">
                  Instructor: {cls.classId?.instructor}
                </p>
                <p className="text-[11px] font-light w-full text-start">
                  Recurring: {cls.classId?.isRecurring ? "Yes" : "No"}
                </p>
                {cls.classId?.isRecurring && (
                  <>
                    <p className="text-[11px] font-light w-full text-start">
                      Recurrence Weeks: {cls.classId?.recurrenceWeeks}
                    </p>
                    <p className="text-[11px] font-light w-full text-start">
                      Recurring Days: {cls.classId?.recurringDays?.join(", ")}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have not booked any classes yet.</p>
        )}
      </div>

      <div className="h-16"></div>
      <Footer />
    </>
  );
};

export default Dashboard;
