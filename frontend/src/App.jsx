import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/shared/ScrollToTop"; // Adjust the path if needed
import Home from "./components/pages/Home/Home";
import KickBoxing from "./components/pages/KickBoxing/KickBoxing";
import Jitsu from "./components/pages/Jitsu/Jitsu";
import Kids from "./components/pages/Kids/Kids";
import About from "./components/pages/About/About";
import Nutrition from "./components/pages/Nutrition/Nutrition";
import Contact from "./components/pages/Contact/Contact";
import Strength from "./components/pages/Strength/Strength";
import Trainer from "./components/pages/Trainers/Trainer";
import { Toaster } from "./components/ui/sonner";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ClassDetails from "./components/pages/Dashboard/ClassDetails";
import Login from "./components/Auth/Login";
import AdminLogin from "./components/Admin/Login";
import GuestDashboard from "./components/pages/Dashboard/GuestDashboard";
import ClassDetailsGuest from "./components/pages/Dashboard/ClassDetailsGuest";
import TimeTable from "./components/pages/Timetable/TimeTable";
import Muay from "./components/pages/MuayThai/Muay";

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kickboxing" element={<KickBoxing />} />
          <Route path="/jitsu" element={<Jitsu />} />
          <Route path="/muay-thai" element={<Muay />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/about" element={<About />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/strength" element={<Strength />} />
          <Route path="/trainer" element={<Trainer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/classes/:classId" element={<ClassDetails />} />
          <Route
            path="/guest/classes/:classId/:date"
            element={<ClassDetailsGuest />}
          />
          <Route path="/class/schedule" element={<Dashboard />} />
          <Route path="/guest/dashboard" element={<GuestDashboard />} />
          <Route path="/timetable" element={<TimeTable />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
