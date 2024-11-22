import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from "../../../configure";

const AdminView = () => {
  const [admin, setAdmin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  // Calculate the total number of pages
  const totalPages = Math.ceil(admin.length / entriesPerPage);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/allAdmin`, {
          withCredentials: true,
        });
        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    getData();
  }, []);

  // Slice the admin array for pagination
  const currentEntries = admin.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      console.log(id);
      let response = await axios.delete(`${API_URL}/api/admin/deleteAdmin/${id}`,{
        withCredentials:true
      });
      console.log("Admin Deleted Successfully");
      toast.success("Admin deleted successfully");
    } catch (error) {
      toast.error("Error deleting admin");
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">Admin List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.length > 0 ? (
              currentEntries.map((adminItem) => (
                <tr key={adminItem._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{adminItem.name}</td>
                  <td className="py-2 px-4 border">{adminItem.email}</td>
                  <td className="py-2 px-4 border">{adminItem.role}</td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 ml-2"
                      onClick={() => handleDelete(adminItem._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center">No admin data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-800 text-white rounded disabled:bg-gray-400"
          >
            Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1 ? 'bg-customYellow text-black' : 'bg-gray-800 text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-800 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default AdminView;
