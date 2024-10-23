import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewClassModal({ isOpen, onClose, classItem }) {
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    if (classItem && typeof classItem === 'object') {
      setClassDetails(classItem);
    } else if (classItem && typeof classItem === 'string') {
      const fetchClassDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5007/api/admin/view/${classItem}`, {
            withCredentials: true,
          });
          setClassDetails(response.data);
        } catch (error) {
          console.error("Error fetching class details:", error);
        }
      };
      fetchClassDetails();
    }
  }, [classItem]);

  if (!isOpen || !classDetails) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-customDark p-6 rounded-3xl shadow-lg w-1/2">
        <button className="text-black font-bold float-right" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Class Details</h2>

        <div className="card">
          <p><strong>Name:</strong> {classDetails.name}</p>
          <p><strong>Date:</strong> {new Date(classDetails.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {classDetails.timeIn} - {classDetails.timeOut}</p>
          <p><strong>Instructor:</strong> {classDetails.instructor}</p>
          <p><strong>Slots:</strong> {classDetails.slots}</p>
          <p><strong>Category:</strong> {classDetails.category}</p>
        </div>

        <div className="mt-6 overflow-y-scroll border-none max-h-48">
          <table className="min-w-full bg-white rounded-3xl">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {classDetails.applicants && classDetails.applicants.length > 0 ? (
                classDetails.applicants.map((applicant, index) => (
                  <tr
                    key={applicant._id} // Use applicant._id as the key to ensure uniqueness
                    className={`border-b border-gray-200 hover:bg-gray-100 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">{applicant.name}</td>
                    <td className="py-3 px-6 text-left text-black">{applicant.email}</td>
                    <td className="py-3 px-6 text-left">{applicant.phoneNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-500">No applicants</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewClassModal;
