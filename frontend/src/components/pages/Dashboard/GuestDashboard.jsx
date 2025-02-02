import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";
import { useNavigate } from "react-router-dom";
import { SchedulerProvider } from "../../../context/SchedulerContext";
import { Button } from "../../ui/button";
import { Helmet } from "react-helmet";
import ClientView from "./ViewClass";

function GuestDashboard() {
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");

  return (
    <>
      <Helmet>
        <title>P-Town West MMA | Guest Dashboard</title>
        <meta
          name="description"
          content="Join P-Town West MMA in Pune for an exhilarating combat sports experience. Check class schedules, book trials, and enhance your training journey."
        />
        <meta
          name="keywords"
          content="MMA Pune, Kickboxing trial Baner, Muay Thai classes, Combat sports Pune, Martial arts beginners"
        />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <div className="relative mt-10 mb-20 overflow-hidden">
        <img src="/images/Training/3.png" alt="Training" className="w-screen" />
        <div className="absolute inset-y-1/2 left-0 transform -translate-y-1/2 text-customYellow text-2xl md:text-5xl font-medium sm:pl-40 pl-10">
          Welcome to P-Town West MMA
        </div>
      </div>

      {/* FullCalendar (Scheduler) */}
      <SchedulerProvider>
        <ClientView />
      </SchedulerProvider>

      <div className="flex justify-center mb-8">
        <Button
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          onClick={handleLogin}
        >
          Login to Book Classes
        </Button>
      </div>

      {/* Instructions Section */}
      <div className="max-w-4xl mx-auto mt-16 px-6 py-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-black mb-4">
          Important Instructions
        </h2>
        <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
          <li>Bring a water bottle to stay hydrated.</li>
          <li>Wear comfortable sports attire and proper footwear.</li>
          <li>Hand wraps and gloves are mandatory for striking classes.</li>
          <li>Arrive 10 minutes early to warm up.</li>
          <li>Respect trainers and fellow athletes.</li>
          <li>Sanitize your equipment before and after use.</li>
        </ul>
      </div>

      <div className="h-[14vh]"></div>
      <Footer />
    </>
  );
}

export default GuestDashboard;
