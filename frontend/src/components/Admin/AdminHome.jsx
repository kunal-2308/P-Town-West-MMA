import { useState, useEffect } from "react";
import axios from "axios";
import EditEventModal from "./EditEventModal";
import ViewClassModal from "./ViewClassModal";
import { API_URL } from "../../../configure";

const AdminHome = ({ onViewAllClick }) => {
  const [upcomingArray, setUpcomingArray] = useState([]);
  const [previousArray, setPreviousArray] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [viewClassItem, setViewClassItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const getPreviousClasses = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/classes/admin/previous`, {
          withCredentials: true,
        });
        setPreviousArray(res.data.previousClasses);
      } catch (error) {
        console.log(error);
      }
    };

    const getUpcomingClasses = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/classes/admin/upcoming`, {
          withCredentials: true,
        });
        setUpcomingArray(res.data.upcomingClasses);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategoriesAndInstructors = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/all`, {
          withCredentials: true,
        });
        setCategories(res.data.categories);
        setInstructors(res.data.instructors);
      } catch (error) {
        console.error("Error fetching categories or instructors", error);
      }
    };

    getPreviousClasses();
    getUpcomingClasses();
    fetchCategoriesAndInstructors();
  }, []);

  const formatTimeTo12Hour = (time) => {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12;
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
    setViewClassItem(classItem);
    setIsViewModalOpen(true);
  };
  

  return (
    <div className="space-y-3 p-4 sm:p-6 lg:p-8">
      {/* Upcoming Classes */}
      <div className="border-2 bg-black rounded-3xl p-5">
        <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">
          Upcoming Classes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingArray.slice(0, 3).map((classItem) => (
            <div
              className="bg-customDark text-white rounded-3xl p-5"
              key={classItem._id}
            >
              <h3 className="text-lg font-bold text-customYellow">
                {classItem.name}
              </h3>
              <div className="flex flex-col mt-2 space-y-2">
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Date:</span>
                  <span className="text-sm text-white/80">
                    {new Date(classItem.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Time:</span>
                  <span className="text-sm text-white/80">
                    {formatTimeTo12Hour(classItem.timeIn)} -{" "}
                    {formatTimeTo12Hour(classItem.timeOut)}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Slots:</span>
                  <span className="text-sm text-white/80">
                    {classItem.slots}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Booked:</span>
                  <span className="text-sm text-white/80">
                    {classItem.applicants.length}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Instructor:</span>
                  <span className="text-sm text-white/80">
                    {classItem.instructor}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Category:</span>
                  <span className="text-sm text-white/80">
                    {classItem.category}
                  </span>
                </div>
                <div className="flex flex-row gap-2 pt-5">
                  <button
                    className="text-sm bg-customYellow rounded-lg text-black w-full"
                    onClick={() => handleEditClick(classItem._id)}
                  >
                    Edit Event
                  </button>
                  <button
                    className="text-sm bg-customYellow px-3 py-2 rounded-lg text-black w-full"
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
      <div className="border-2 bg-black rounded-3xl p-5">
        <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">
          Previous Classes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {previousArray.slice(0, 3).map((classItem) => (
            <div
              className="bg-customDark text-white rounded-3xl p-5"
              key={classItem._id}
            >
              <h3 className="text-lg font-bold text-customYellow">
                {classItem.name}
              </h3>
              <div className="flex flex-col mt-2 space-y-2">
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Date:</span>
                  <span className="text-sm text-white/80">
                    {new Date(classItem.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Time:</span>
                  <span className="text-sm text-white/80">
                    {formatTimeTo12Hour(classItem.timeIn)} -{" "}
                    {formatTimeTo12Hour(classItem.timeOut)}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Slots:</span>
                  <span className="text-sm text-white/80">
                    {classItem.slots}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Booked:</span>
                  <span className="text-sm text-white/80">
                    {classItem.applicants.length}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Instructor:</span>
                  <span className="text-sm text-white/80">
                    {classItem.instructor}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-sm text-white">Category:</span>
                  <span className="text-sm text-white/80">
                    {classItem.category}
                  </span>
                </div>
                <div className="div-button-section">
                <button
                  className="text-sm bg-customYellow px-3 py-2 rounded-lg text-black w-full mt-5"
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
        classItem={viewClassItem}
      />
    </div>
  );
};

export default AdminHome;
