import { useEffect, useState } from "react";
import axios from "axios";
import ViewClassModal from "./ViewClassModal"; // Import the ViewClassModal component

const AdminPrevious = () => {
  const [previousArray, setPreviousArray] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewClassItem, setViewClassItem] = useState(null); // State to hold selected class for viewing

  // Fetch data when component mounts
  useEffect(() => {
    const getPreviousClasses = async () => {
      try {
        let res = await axios.get(
          `http://localhost:5007/api/classes/admin/previous`,
          {
            withCredentials: true,
          }
        );
        setPreviousArray(res.data.previousClasses);
      } catch (error) {
        console.log(error);
      }
    };

    getPreviousClasses();
  }, []);

  const handleViewDetails = (classItem) => {
    setViewClassItem(classItem); // Set the selected class data
    setIsViewModalOpen(true); // Open the modal
  };

  return (
    <div className="border-2 bg-black rounded-3xl p-5">
      <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">
        Previous Classes
      </h2>
      <div className="div-container-main grid grid-cols-3 gap-4">
        {previousArray.slice(0, 3).map((classItem) => (
          <div
            className="div-card-container bg-customDark text-white rounded-3xl h-auto w-auto p-5"
            key={classItem._id}
          >
            <h3 className="text-lg font-bold text-customYellow">
              {classItem.name}
            </h3>
            <div className="div-content flex flex-col justify-start items-start mt-2">
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
              <button
                className="text-sm bg-customYellow p-2 rounded-lg hover:font-semibold mt-5 text-black"
                onClick={() => handleViewDetails(classItem)} // Pass the class item to view details
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ViewClassModal Component */}
      {viewClassItem && (
        <ViewClassModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          classItem={viewClassItem} // Pass the selected class item
        />
      )}
    </div>
  );
};

export default AdminPrevious;
