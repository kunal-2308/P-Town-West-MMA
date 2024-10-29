import { useEffect, useState } from "react";
import axios from "axios";
import EditEventModal from "./EditEventModal";
import ViewClassModal from "./ViewClassModal";
import { API_URL } from "../../../configure";

const AdminUpcoming = () => {
  const [upcomingArray, setUpcomingArray] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [viewClass, setViewClass] = useState(null);

  useEffect(() => {
    const getUpcomingClasses = async () => {
      try {
        let res = await axios.get(`${API_URL}/api/classes/admin/upcoming`, {
          withCredentials: true,
        });
        setUpcomingArray(res.data.upcomingClasses);
      } catch (error) {
        console.log(error);
      }
    };

    getUpcomingClasses();
  }, []);

  const handleEditClick = (classId) => {
    setSelectedClassId(classId); // Set only classId
    if (!isViewModalOpen) {
      setIsEditModalOpen(true);
    }
  };

  const handleViewDetails = (classItem) => {
    console.log("View clicked for:", classItem);
    setViewClass(classItem);
    if (!isEditModalOpen) {
      setIsViewModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedClassId(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewClass(null);
  };

  const handleSave = () => {
    closeEditModal();
    closeViewModal();
    // Optionally refresh data here
  };

  return (
    <div className="border-2 bg-black rounded-3xl p-5">
      <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">Upcoming Classes</h2>
      <div className="div-container-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingArray.map((classItem) => (
          <div className="div-card-container bg-customDark text-white rounded-3xl p-5" key={classItem._id}>
            <h3 className="text-lg font-bold text-customYellow">{classItem.name}</h3>
            <div className="div-content flex flex-col mt-2">
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Date:</span>
                <span className="text-sm text-white/80">{new Date(classItem.date).toLocaleDateString()}</span>
              </div>
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Time:</span>
                <span className="text-sm text-white/80">{classItem.timeIn} - {classItem.timeOut}</span>
              </div>
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Slots:</span>
                <span className="text-sm text-white/80">{classItem.slots}</span>
              </div>
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Booked:</span>
                <span className="text-sm text-white/80">{classItem.applicants.length}</span>
              </div>
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Instructor:</span>
                <span className="text-sm text-white/80">{classItem.instructor}</span>
              </div>
              <div className="div-content-item flex flex-row gap-2">
                <span className="text-sm text-white">Category:</span>
                <span className="text-sm text-white/80">{classItem.category}</span>
              </div>
              <div className="div-main-button flex flex-row gap-2 mt-5">
                <button
                  type="button" // Added type="button"
                  className="text-sm bg-customYellow p-2 rounded-lg hover:font-semibold text-black"
                  onClick={() => handleEditClick(classItem._id)} // Pass only classId
                >
                  Edit Event
                </button>
                <button
                  type="button" // Added type="button"
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

      {isEditModalOpen && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          classId={selectedClassId} // Pass only classId
          onSave={handleSave}
        />
      )}

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
