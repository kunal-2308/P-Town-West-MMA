import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewClassModal({ isOpen, onClose, classItem }) {
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    if (classItem && typeof classItem === 'object') { // Check if classItem is an object
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
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
              </tr>
            </thead>
            <tbody>
              {classDetails.applicants && classDetails.applicants.length > 0 ? (
                classDetails.applicants.map((applicant, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-2 px-4 border-b">{applicant.name}</td>
                    <td className="py-2 px-4 border-b">{applicant.email}</td>
                    <td className="py-2 px-4 border-b">{applicant.phoneNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 text-center">No applicants</td>
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
