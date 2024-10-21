import { useEffect, useState } from "react";
import axios from "axios";

const AdminUpcoming = () => {
  const [upcomingArray, setUpcomingArray] = useState([]);

  // Fetch data when component mounts
  useEffect(() => {
    const getUpcomingClasses = async () => {
      try {
        let res = await axios.get(
          `http://localhost:5007/api/classes/admin/upcoming`,
          {
            withCredentials: true,
          }
        );
        setUpcomingArray(res.data.upcomingClasses);
      } catch (error) {
        console.log(error);
      }
    };

    getUpcomingClasses();
  }, []);

  return (
    <div className="border-2 bg-black rounded-3xl p-5">
      <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">
        Upcoming Classes
      </h2>
      <div className="div-container-main grid grid-cols-3 gap-4">
        {upcomingArray.map((classItem) => (
          <div
            className="div-card-container bg-customDark text-white rounded-3xl h-auto w-auto p-5"
            key={classItem._id}
          >
            <h3 className="text-lg font-bold text-customYellow">
              {classItem.name}
            </h3>
            <div className="div-content flex flex-col justify-start items-start mt-2">
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Date:</span>{" "}
                <span className="text-sm text-white/80">
                  {new Date(classItem.date).toLocaleDateString()}
                </span>
              </div>
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Time:</span>{" "}
                <span className="text-sm text-white/80">
                  {classItem.timeIn} - {classItem.timeOut}
                </span>
              </div>
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Slots:</span>{" "}
                <span className="text-sm text-white/80">{classItem.slots}</span>
              </div>
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Booked:</span>{" "}
                <span className="text-sm text-white/80">
                  {classItem.applicants.length}
                </span>
              </div>
              <button
                className="text-sm bg-customYellow p-2 rounded-lg hover:font-semibold mt-5 text-black"
                onClick={() => handleEditClick(classItem)}
              >
                Edit Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUpcoming;
