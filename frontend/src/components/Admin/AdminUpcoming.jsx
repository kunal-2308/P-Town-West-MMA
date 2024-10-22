import { useEffect, useState } from "react";
import axios from "axios";
import EditEventModal from "./EditEventModal";
import ViewClassModal from "./ViewClassModal";

const AdminUpcoming = () => {
  const [upcomingArray, setUpcomingArray] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for Edit Modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State for View Modal
  const [selectedClass, setSelectedClass] = useState(null); // State for selected class (edit)
  const [viewClass, setViewClass] = useState(null); // State for class to view details

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

  // Open the Edit Modal
  const handleEditClick = (classItem) => {
    setSelectedClass(classItem); // Set the class to edit
    if (!isViewModalOpen) {
      setIsEditModalOpen(true); // Only open edit modal if view modal is not open
    }
  };

  // Open the View Modal
  const handleViewDetails = (classItem) => {
    setViewClass(classItem); // Set the class to view details
    if (!isEditModalOpen) {
      setIsViewModalOpen(true); // Only open view modal if edit modal is not open
    }
  };

  // Close the Edit Modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedClass(null);
  };

  // Close the View Modal
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewClass(null);
  };

  // Close modals and refresh data if needed after save
  const handleSave = () => {
    closeEditModal(); // Close edit modal after save
    closeViewModal(); // Optionally, close view modal if needed
    // Optionally, refresh the data here
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
                  onClick={() => handleViewDetails(classItem)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing */}
      {isEditModalOpen && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          classItem={selectedClass}
          onSave={handleSave}
        />
      )}

      {/* Modal for Viewing Details */}
      {isViewModalOpen && (
        <ViewClassModal
          isOpen={isViewModalOpen}
          onClose={closeViewModal}
          classItem={viewClass}
        />
      )}
    </div>
  );
};

export default AdminUpcoming;
