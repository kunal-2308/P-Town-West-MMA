import { useEffect, useState } from "react";
import axios from "axios";
import ViewClassModal from "./ViewClassModal"; // Import the ViewClassModal component
import { API_URL } from "../../../configure";
import Cookies from "js-cookie";

const AdminPrevious = () => {
  const [previousArray, setPreviousArray] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewClassItem, setViewClassItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 6; // Number of classes per page

  // Fetch data when component mounts
  useEffect(() => {
    const getPreviousClasses = async () => {
      try {
        let token = Cookies.get("jwt_token");
        let res = await axios.get(`${API_URL}/api/classes/admin/previous`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token as a header
          },
        });
        setPreviousArray(res.data.previousClasses);
      } catch (error) {
        console.log(error);
      }
    };

    getPreviousClasses();
  }, []);

  const handleViewDetails = (classItem) => {
    setViewClassItem(classItem);
    setIsViewModalOpen(true);
  };

  // Pagination logic
  const totalPages = Math.ceil(previousArray.length / classesPerPage);
  const paginatedClasses = previousArray.slice(
    (currentPage - 1) * classesPerPage,
    currentPage * classesPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="border-2 bg-black rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-semibold mb-4 text-customYellow pl-2">
        Previous Classes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedClasses.map((classItem) => (
          <div
            className="bg-customDark text-white rounded-3xl h-auto p-5 flex flex-col items-start"
            key={classItem._id}
          >
            <h3 className="text-lg font-bold text-customYellow">
              {classItem.name}
            </h3>
            <div className="flex flex-col justify-start items-start mt-2">
              <div className="flex flex-row gap-2">
                <span className="text-sm text-white">Date:</span>
                <span className="text-sm text-white/80">
                  {new Date(classItem.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <span className="text-sm text-white">Time:</span>
                <span className="text-sm text-white/80">
                  {classItem.timeIn} - {classItem.timeOut}
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <span className="text-sm text-white">Slots:</span>
                <span className="text-sm text-white/80">{classItem.slots}</span>
              </div>
              <div className="flex flex-row gap-2">
                <span className="text-sm text-white">Booked:</span>
                <span className="text-sm text-white/80">
                  {classItem.applicants.length}
                </span>
              </div>
              <button
                className="text-sm bg-customYellow p-2 rounded-lg hover:font-semibold mt-5 text-black"
                onClick={() => handleViewDetails(classItem)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-10">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-customYellow hover:animate-pulse text-black"
          }`}
        >
          Previous
        </button>
        <span className="mx-4 text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-customYellow hover:animate-pulse text-black"
          }`}
        >
          Next
        </button>
      </div>

      {/* ViewClassModal Component */}
      {viewClassItem && (
        <ViewClassModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          classItem={viewClassItem}
        />
      )}
    </div>
  );
};

export default AdminPrevious;
