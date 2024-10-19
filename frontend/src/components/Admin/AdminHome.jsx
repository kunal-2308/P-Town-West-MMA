import axios from "axios";
import { useEffect, useState } from "react";

const AdminHome = ({ onViewAllClick }) => {
  let [upcomingArray, setUpcomingArray] = useState([]);
  let [previousArray, setPreviousArray] = useState([]);

  useEffect(() => {
    const getPreviousClasses = async () => {
      try {
        let res = await axios.get(`http://localhost:5007/api/classes/admin/previous`, {
          withCredentials: true,
        });
        setPreviousArray(res.data.previousClasses);
      } catch (error) {
        console.log(error);
      }
    };

    const getUpcomingClasses = async () => {
      try {
        let res = await axios.get(`http://localhost:5007/api/classes/admin/upcoming`, {
          withCredentials: true,
        });
        setUpcomingArray(res.data.upcomingClasses);
      } catch (error) {
        console.log(error);
      }
    };

    getPreviousClasses();
    getUpcomingClasses();
  }, []);

  return (
    <div className="p-4 space-y-8 ">
      {/* First Container for Upcoming Classes */}
      <div className="border-2 border-neutral-400 rounded-3xl p-5">
        <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
        <div className="div-container-main grid grid-cols-3 gap-4">
          {upcomingArray.slice(0, 3).map((classItem) => (
            <div className="div-card-container border p-5 gap-y-4 flex flex-col justify-center items-center rounded-2xl shadow-sm" key={classItem._id}>
              <h3 className="text-lg font-bold">{classItem.name}</h3>
              <div className="div-content flex flex-col justify-start items-start">
                <span className="text-xs text-black/60">Date: {new Date(classItem.date).toLocaleDateString()}</span>
                <span className="text-xs text-black/60">Time: {classItem.timeIn} - {classItem.timeOut}</span>
                <span className="text-xs text-black/60">Slots: {classItem.slots}</span>
                <button className="text-xs bg-customYellow p-2 rounded-lg hover:font-semibold">Edit Event</button>
              </div>
            </div>
          ))}
        </div>
        {upcomingArray.length > 3 && (
          <div className="mt-4 text-center">
            <button onClick={() => onViewAllClick("Upcoming Class")} className="text-sm bg-customBlue p-2 text-white font-semibold rounded-md hover:transition-transform hover:scale-105">
              View All
            </button>
          </div>
        )}
      </div>

      {/* Second Container for Previous Classes */}
      <div className="border-2 border-neutral-400 rounded-3xl p-5">
        <h2 className="text-xl font-semibold mb-4">Previous Classes</h2>
        <div className="div-container-main grid grid-cols-3 gap-4">
          {previousArray.slice(0, 3).map((classItem) => (
            <div className="div-card-container border p-5 gap-y-4 flex flex-col justify-center items-center rounded-2xl shadow-sm" key={classItem._id}>
              <h3 className="text-lg font-bold">{classItem.name}</h3>
              <div className="div-content flex flex-col justify-start items-start">
                <span className="text-xs text-black/60">Date: {new Date(classItem.date).toLocaleDateString()}</span>
                <span className="text-xs text-black/60">Time: {classItem.timeIn} - {classItem.timeOut}</span>
                <span className="text-xs text-black/60">Slots: {classItem.slots}</span>
                <button className="text-xs bg-customYellow p-2 rounded-lg hover:font-semibold">View Details</button>
              </div>
            </div>
          ))}
        </div>
        {previousArray.length >= 3 && (
          <div className="mt-4 text-center">
            <button onClick={() => onViewAllClick("Previous Class")} className="text-sm bg-customBlue p-2 text-white font-semibold rounded-md hover:transition-transform hover:scale-105">
              View All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
