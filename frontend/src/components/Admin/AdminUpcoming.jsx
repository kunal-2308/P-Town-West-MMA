import { useEffect, useState } from "react";
import axios from "axios";
import EditEventModal from "./EditEventModal"; // Assuming these modal components exist
import ViewClassModal from "./ViewClassModal";

const AdminUpcoming = () => {
  const [upcomingArray, setUpcomingArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [viewClass, setViewClass] = useState(null);

  // Fetch upcoming classes
  useEffect(() => {
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

    getUpcomingClasses();
  }, []);

  // Open edit modal
  const handleEditClick = (classItem) => {
    setSelectedClass(classItem); // Set the selected class for editing
    setIsModalOpen(true); // Open the modal
  };

  // Open view details modal
  const handleViewDetails = (classId) => {
    setViewClass(classId); // Set the class to view
  };

  // Close modals and refresh data if needed after save
  const handleSave = () => {
    setIsModalOpen(false);
    // Optionally refresh the data here
  };

  return (
    <div className="border-2 bg-black rounded-3xl p-5">
      <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">Upcoming Classes</h2>
      <div className="div-container-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingArray.map((classItem) => (
          <div
            className="div-card-container bg-customDark text-white rounded-3xl p-5"
            key={classItem._id}
          >
            <h3 className="text-lg font-bold text-customYellow">
              {classItem.name}
            </h3>
            <div className="div-content flex flex-col mt-2">
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Date:</span>
                <span className="text-sm text-white/80">
                  {new Date(classItem.date).toLocaleDateString()}
                </span>
              </div>
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Time:</span>
                <span className="text-sm text-white/80">
                  {classItem.timeIn} - {classItem.timeOut}
                </span>
              </div>
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Slots:</span>
                <span className="text-sm text-white/80">{classItem.slots}</span>
              </div>
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Booked:</span>
                <span className="text-sm text-white/80">
                  {classItem.applicants.length}
                </span>
              </div>

              <div className="div-main-button flex flex-row gap-2 mt-5">
                <button
                  className="text-sm bg-customYellow p-2 rounded-lg hover:font-semibold text-black"
                  onClick={() => handleEditClick(classItem)}
                >
                  Edit Event
                </button>
                <button
                  className="text-sm bg-customYellow p-2 rounded-lg hover:font-semibold text-black"
                  onClick={() => handleViewDetails(classItem._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing */}
      <EditEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classItem={selectedClass}
        onSave={handleSave}
      />

      {/* Modal for Viewing Details */}
      <ViewClassModal
        isOpen={viewClass !== null}
        onClose={() => setViewClass(null)}
        classItem={viewClass}
      />
    </div>
  );
};

export default AdminUpcoming;
