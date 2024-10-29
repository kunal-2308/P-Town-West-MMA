import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../configure';

// Utility function to convert 24-hour format time to 12-hour format with AM/PM
const convertTo12HourFormat = (time24) => {
  let [hours, minutes] = time24.split(':');
  hours = parseInt(hours, 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format, handling 0 as 12
  return `${hours}:${minutes} ${ampm}`;
};

function ViewClassModal({ isOpen, onClose, classItem }) {
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    if (classItem) {  // Ensure classItem is defined
      let getData = async () => {
        try {
          let response = await axios.get(`${API_URL}/api/admin/view/${classItem._id}`, {
            withCredentials: true
          });
          setClassDetails(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, [classItem]);
  
  if (!isOpen || !classDetails) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-customDark p-8 rounded-lg shadow-xl w-full max-w-3xl mx-4 md:mx-0 relative">
        <button className="text-black dark:text-white text-2xl absolute top-4 right-4" onClick={onClose}>
          &times;
        </button>

        <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-6 text-center">
          Class Details
        </h2>

        <div className="space-y-4 text-lg">
          <p><strong>Name:</strong> {classDetails.name}</p>
          <p><strong>Date:</strong> {new Date(classDetails.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {convertTo12HourFormat(classDetails.timeIn)} - {convertTo12HourFormat(classDetails.timeOut)}</p>
          <p><strong>Instructor:</strong> {classDetails.instructor}</p>
          <p><strong>Slots:</strong> {classDetails.slots}</p>
          <p><strong>Category:</strong> {classDetails.category}</p>
        </div>

        <div className="mt-8 overflow-y-auto max-h-48 border-t-2 border-gray-300 pt-4">
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300 text-sm">
              {classDetails.applicants && classDetails.applicants.length > 0 ? (
                classDetails.applicants.map((applicant, index) => (
                  <tr
                    key={applicant._id || index}
                    className={`border-b border-gray-300 dark:border-gray-600 ${index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-700'}`}
                  >
                    <td className="py-3 px-4">{applicant.name}</td>
                    <td className="py-3 px-4">{applicant.email}</td>
                    <td className="py-3 px-4">{applicant.phoneNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-500 dark:text-gray-400">No applicants</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition-all duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewClassModal;
