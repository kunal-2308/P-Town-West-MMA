import Navbar from "../../shared/Navbar";
import ClassSchedule from "./ClassSchedule";
import Footer from "../../shared/Footer";
import { Helmet } from "react-helmet";
const TimeTable = () => {
  return (
    <>

      <Helmet>
        <title>P-Town West MMA | Class Timetable</title>
        <meta name="description" content="Plan your training sessions with the P-Town West MMA class timetable. Find schedules for MMA, Muay Thai, kickboxing, boxing, wrestling, and fitness programs in Pune, Baner, for all levels." />
        <meta name="keywords" content="Class timetable MMA Pune, MMA schedule Baner, Muay Thai class timings Pune, Kickboxing sessions Pune, fitness programs schedule, martial arts timetable Pune, P-Town West MMA timings" />
      </Helmet>

      <Navbar />
      <div className="min-h-screen py-20 flex flex-col justify-between">
        <ClassSchedule />
        <Footer />
      </div>
    </>
  );
};

export default TimeTable;
