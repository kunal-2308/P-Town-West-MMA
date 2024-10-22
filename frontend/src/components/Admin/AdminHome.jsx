import { useState, useEffect } from "react";
import axios from "axios";
import EditEventModal from "./EditEventModal";
import ViewClassModal from "./ViewClassModal";

const AdminHome = ({ onViewAllClick }) => {
  const [upcomingArray, setUpcomingArray] = useState([]);
  const [previousArray, setPreviousArray] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [viewClassId, setViewClassId] = useState(null);
  const [categories, setCategories] = useState([]); 
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const getPreviousClasses = async () => {
      try {
        const res = await axios.get(`http://localhost:5007/api/classes/admin/previous`, {
          withCredentials: true,
        });
        setPreviousArray(res.data.previousClasses);
      } catch (error) {
        console.log(error);
      }
    };

    const getUpcomingClasses = async () => {
      try {
        const res = await axios.get(`http://localhost:5007/api/classes/admin/upcoming`, {
          withCredentials: true,
        });
        setUpcomingArray(res.data.upcomingClasses);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategoriesAndInstructors = async () => {
      try {
        const categoriesRes = await axios.get('API_URL_FOR_CATEGORIES'); // Replace with your API endpoint for categories
        const instructorsRes = await axios.get('API_URL_FOR_INSTRUCTORS'); // Replace with your API endpoint for instructors
        setCategories(categoriesRes.data); // Set categories
        setInstructors(instructorsRes.data); // Set instructors
      } catch (error) {
        console.error('Error fetching categories or instructors', error);
      }
    };

    getPreviousClasses();
    getUpcomingClasses();
    fetchCategoriesAndInstructors(); // Fetch categories and instructors
  }, []);

  const handleEditClick = (classItem) => {
    setSelectedClass(classItem);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    setIsEditModalOpen(false);
    // Optionally re-fetch upcoming and previous classes to reflect updates
  };

  const handleViewDetails = (classId) => {
    setViewClassId(classId);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-3">
      {/* Upcoming Classes Container */}
      <div className="border-2 bg-black rounded-3xl p-5">
        <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">Upcoming Classes</h2>
        <div className="div-container-main grid grid-cols-3 gap-4">
          {upcomingArray.slice(0, 3).map((classItem) => (
            <div className="div-card-container bg-customDark text-white rounded-3xl h-auto w-auto p-5" key={classItem._id}>
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

      {/* Previous Classes Container */}
      <div className="border-2 bg-black rounded-3xl p-5">
        <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">Previous Classes</h2>
        <div className="div-container-main grid grid-cols-3 gap-4">
          {previousArray.slice(0, 3).map((classItem) => (
            <div className="div-card-container bg-customDark text-white rounded-3xl h-auto w-auto p-5" key={classItem._id}>
              <h3 className="text-lg font-bold text-customYellow">{classItem.name}</h3>
              <div className="div-content flex flex-col justify-start items-start mt-2">
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
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        classItem={selectedClass}
        onUpdate={handleSave}
        categories={categories} // Pass categories to the modal
        instructors={instructors} // Pass instructors to the modal
      />
      {/* Modal for Viewing Class Details */}
      <ViewClassModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        classId={viewClassId}
      />
    </div>
  );
};

export default AdminHome;
