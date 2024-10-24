import { useState, useEffect } from "react";
import axios from "axios";
import EditEventModal from "./EditEventModal";
import ViewClassModal from "./ViewClassModal";

const AdminHome = ({ onViewAllClick }) => {
  const [upcomingArray, setUpcomingArray] = useState([]);
  const [previousArray, setPreviousArray] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [viewClassItem, setViewClassItem] = useState(null); // Store class item for viewing details
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
        const res = await axios.get('http://localhost:5007/api/admin/all', {
          withCredentials: true,
        });
        setCategories(res.data.categories);
        setInstructors(res.data.instructors);
      } catch (error) {
        console.error('Error fetching categories or instructors', error);
      }
    };

    getPreviousClasses();
    getUpcomingClasses();
    fetchCategoriesAndInstructors();
  }, []);

  // Function to convert 24-hour format to 12-hour format with AM/PM
  const formatTimeTo12Hour = (time) => {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12; // Convert '0' or '12' to '12' for 12-hour format
    return `${adjustedHours}:${minutes} ${period}`;
  };

  const handleEditClick = (classId) => {
    setSelectedClassId(classId);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    setIsEditModalOpen(false);
  };

  const handleViewDetails = (classItem) => {
    setViewClassItem(classItem); // Store the entire class object
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-3">
      {/* Upcoming Classes */}
      <div className="border-2 bg-black rounded-3xl p-5">
        <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">Upcoming Classes</h2>
        <div className="grid grid-cols-3 gap-4">
          {upcomingArray.slice(0, 3).map((classItem) => (
            <div className="bg-customDark text-white rounded-3xl p-5" key={classItem._id}>
              <h3 className="text-lg font-bold text-customYellow">{classItem.name}</h3>
              <div className="flex flex-col mt-2">
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Date:</span>
                  <span className="text-sm text-white/80">{new Date(classItem.date).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Time:</span>
                  <span className="text-sm text-white/80">
                    {formatTimeTo12Hour(classItem.timeIn)} - {formatTimeTo12Hour(classItem.timeOut)}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Slots:</span>
                  <span className="text-sm text-white/80">{classItem.slots}</span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Booked:</span>
                  <span className="text-sm text-white/80">{classItem.applicants.length}</span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Instructor:</span>
                  <span className="text-sm text-white/80">{classItem.instructor}</span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Category:</span>
                  <span className="text-sm text-white/80">{classItem.category}</span>
                </div>
                <div className="flex flex-row gap-2">
                  <button
                    className="text-sm bg-customYellow p-2 rounded-lg mt-5 text-black"
                    onClick={() => handleEditClick(classItem._id)}
                  >
                    Edit Event
                  </button>
                  <button
                    className="text-sm bg-customYellow p-2 rounded-lg mt-5 text-black"
                    onClick={() => handleViewDetails(classItem)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Classes */}
      <div className="space-y-3">
        <div className="border-2 bg-black rounded-3xl p-5">
          <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">Previous Classes</h2>
          <div className="grid grid-cols-3 gap-4">
            {previousArray.slice(0, 3).map((classItem) => (
              <div className="bg-customDark text-white rounded-3xl p-5" key={classItem._id}>
                <h3 className="text-lg font-bold text-customYellow">{classItem.name}</h3>
                <div className="flex flex-col mt-2">
                  <div className="flex flex-row gap-2">
                    <span className="text-sm text-white">Date:</span>
                    <span className="text-sm text-white/80">{new Date(classItem.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <span className="text-sm text-white">Time:</span>
                    <span className="text-sm text-white/80">
                      {formatTimeTo12Hour(classItem.timeIn)} - {formatTimeTo12Hour(classItem.timeOut)}
                    </span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <span className="text-sm text-white">Slots:</span>
                    <span className="text-sm text-white/80">{classItem.slots}</span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <span className="text-sm text-white">Booked:</span>
                    <span className="text-sm text-white/80">{classItem.applicants.length}</span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <span className="text-sm text-white">Instructor:</span>
                    <span className="text-sm text-white/80">{classItem.instructor}</span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <span className="text-sm text-white">Category:</span>
                    <span className="text-sm text-white/80">{classItem.category}</span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <button
                      className="text-sm bg-customYellow p-2 rounded-lg mt-5 text-black"
                      onClick={() => handleViewDetails(classItem)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Editing */}
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        classId={selectedClassId}
        onUpdate={handleSave}
        categories={categories}
        instructors={instructors}
      />

      {/* Modal for Viewing Class Details */}
      <ViewClassModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        classItem={viewClassItem} // Pass the entire class object
      />
    </div>
  );
};

export default AdminHome;
