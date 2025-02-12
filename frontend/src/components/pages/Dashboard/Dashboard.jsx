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
  const [userName, setUserName] = useState("");
  const [bookedClasses, setBookedClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      navigate("/guest/dashboard");
    } else {
      const userName = Cookies.get("userName");
      setUserName(userName || "User");
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

  const today = new Date().toISOString().split("T")[0];

  const upcomingClasses = bookedClasses.filter(
    (cls) => new Date(cls.date).toISOString().split("T")[0] >= today
  );

  const previousClasses = bookedClasses.filter(
    (cls) => new Date(cls.date).toISOString().split("T")[0] < today
  );

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
        <h1 className="text-2xl font-semibold">Welcome, {userName}</h1>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {upcomingClasses.length > 0 ? (
            upcomingClasses.map((cls) => (
              <div
                key={cls._id}
                className="bg-neutral-800 p-4 rounded-lg shadow-md flex flex-col"
              >
                <div className="flex flex-row justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {cls.classId?.title}
                  </h3>
                  <p className="flex flex-col text-sm text-right text-gray-300">
                    {new Date(cls.date).toLocaleDateString()}{" "}
                    <span>
                      {cls.classId?.startTime} ({cls.classId?.duration} mins)
                    </span>
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Type: {cls.classId?.type}
                </p>
                <p className="text-xs text-gray-400">
                  Difficulty: {cls.classId?.difficulty}
                </p>
                <p className="text-xs text-gray-400">
                  Instructor: {cls.classId?.instructor}
                </p>
                <p className="text-xs text-gray-400">
                  Description: {cls.classId?.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              You have not booked any upcoming classes.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 p-6 bg-customDark rounded-lg">
        <h2 className="text-xl text-customYellow font-semibold mb-4">
          Your Previous Classes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {previousClasses.length > 0 ? (
            previousClasses.map((cls) => (
              <div
                key={cls._id}
                className="bg-neutral-800 p-4 rounded-lg shadow-md flex flex-col"
              >
                <div className="flex flex-row justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {cls.classId?.title}
                  </h3>
                  <p className="flex flex-col text-sm text-right text-gray-300">
                    {new Date(cls.date).toLocaleDateString()}{" "}
                    <span>
                      {cls.classId?.startTime} ({cls.classId?.duration} mins)
                    </span>
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Type: {cls.classId?.type}
                </p>
                <p className="text-xs text-gray-400">
                  Difficulty: {cls.classId?.difficulty}
                </p>
                <p className="text-xs text-gray-400">
                  Instructor: {cls.classId?.instructor}
                </p>
                <p className="text-xs text-gray-400">
                  Description: {cls.classId?.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No previous classes.
            </p>
          )}
        </div>
      </div>

      <div className="h-16"></div>
      <Footer />
    </>
  );
};

export default Dashboard;
