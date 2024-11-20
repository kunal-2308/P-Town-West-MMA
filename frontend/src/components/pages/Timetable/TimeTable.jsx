import Navbar from "../../shared/Navbar";
import ClassSchedule from "./ClassSchedule";
import Footer from "../../shared/Footer";

const TimeTable = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-20 flex flex-col justify-between">
        <ClassSchedule />
        <Footer />
      </div>
    </>
  );
};

export default TimeTable;
