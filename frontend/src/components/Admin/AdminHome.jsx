import { useState, useEffect } from "react";
import axios from "axios";
import EditEventModal from "./EditEventModal";
import ViewClassModal from "./ViewClassModal";

const AdminHome = ({ onViewAllClick }) => {
  const [upcomingArray, setUpcomingArray] = useState([]);
  const [previousArray, setPreviousArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

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

  const handleEditClick = (classItem) => {
    setSelectedClass(classItem); // Set the selected class for editing
    setIsModalOpen(true); // Open the modal
  };

  const handleSave = () => {
    // Refresh data after saving (optional: you can trigger a refetch here)
    setIsModalOpen(false);
    // Optionally re-fetch upcoming and previous classes to reflect updates
  };

  let [viewClass, setViewClass] = useState(null);
  const handleViewDetails = (_id) => {
    setIsModalOpen(true);
    setViewClass(_id);
  }
  return (
    <div className="space-y-3">
      {/* First Container for Upcoming Classes */}
      <div className="border-2 bg-black rounded-3xl p-5">
        <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">Upcoming Classes</h2>
        <div className="div-container-main grid grid-cols-3 gap-4">
          {upcomingArray.slice(0, 3).map((classItem) => (
            <div className="div-card-container bg-customDark text-white rounded-3xl h-auto w-auto p-5" key={classItem._id}>
              <h3 className="text-lg font-bold text-customYellow">{classItem.name}</h3>
              <div className="div-content flex flex-col justify-start items-start mt-2">
                <div className="div-content-item flex flex-row gap-2">
                  <span className="text-sm text-white">Date:</span> <span className="text-sm text-white/80">{new Date(classItem.date).toLocaleDateString()}</span>
                </div>
                <div className="div-content-item flex flex-row gap-2">
                  <span className="text-sm text-white">Time:</span> <span className="text-sm text-white/80">{classItem.timeIn} - {classItem.timeOut}</span>
                </div>
                <div className="div-content-item flex flex-row gap-2">
                  <span className="text-sm text-white">Slots:</span> <span className="text-sm text-white/80">{classItem.slots}</span>
                </div>
                <div className="div-content-item flex flex-row gap-2">
                  <span className="text-sm text-white">Booked:</span> <span className="text-sm text-white/80">{classItem.applicants.length}</span>
                </div>
                <div className="div-main-button flex flex-row gap-2">
                <button
                  className="text-sm bg-customYellow p-2 rounded-lg hover:font-semibold mt-5 text-black"
                  onClick={() => handleEditClick(classItem)}
                >
                  Edit Event
                </button>
                <button
                  className="text-sm bg-customYellow p-2 rounded-lg hover:font-semibold mt-5 text-black"
                  onClick={() => handleViewDetails(classItem._id)}
                >
                  View Details
                </button>
                </div>
               
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
      <div className="border-2 bg-black rounded-3xl p-5">
        <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">Previous Classes</h2>
        <div className="div-container-main grid grid-cols-3 gap-4">
          {previousArray.slice(0, 3).map((classItem) => (
            <div className="div-card-container bg-customDark text-white rounded-3xl h-auto w-auto p-5" key={classItem._id}>
              <h3 className="text-lg font-bold text-customYellow">{classItem.name}</h3>
              <div className="div-content flex flex-col justify-start items-start mt-2">
                <div className="div-content-item flex flex-row gap-2">
                  <span className="text-sm text-white">Date:</span> <span className="text-sm text-white/80">{new Date(classItem.date).toLocaleDateString()}</span>
                </div>
                <div className="div-content-item flex flex-row gap-2">
                  <span className="text-sm text-white">Time:</span> <span className="text-sm text-white/80">{classItem.timeIn} - {classItem.timeOut}</span>
                </div>
                <div className="div-content-item flex flex-row gap-2">
                  <span className="text-sm text-white">Slots:</span> <span className="text-sm text-white/80">{classItem.slots}</span>
                </div>
                <div className="div-content-item flex flex-row gap-2">
                  <span className="text-sm text-white">Booked:</span> <span className="text-sm text-white/80">{classItem.applicants.length}</span>
                </div>
                <button
                  className="text-sm bg-customYellow p-2 rounded-lg hover:font-semibold mt-5 text-black"
                  onClick={() => handleViewDetails(classItem._id)}
                >
                  View Details
                </button>
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

      {/* Modal for Editing */}
      <EditEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classItem={selectedClass}
        onSave={handleSave}
      />
      <ViewClassModal
        isOpen={viewClass}
        onClose={() => setViewClass(null)}
        classItem={viewClass}
      />
    </div>
  );
};

export default AdminHome;
