import { useEffect, useState } from "react";
import { API_URL } from "../../../configure";
import Cookies from "js-cookie";
import axios from "axios";

const ViewAllApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        let token = Cookies.get("jwt_token");
        const response = await axios.get(`${API_URL}/api/classes/applicants`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setApplicants(data.allApplicants);
        setFilteredApplicants(data.allApplicants);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  useEffect(() => {
    const filtered = applicants.filter(
      (applicant) =>
        applicant.userId.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        applicant.userId.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        applicant.classId.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
    setFilteredApplicants(filtered);
  }, [searchQuery, applicants]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-5">Error: {error}</div>;

  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Applicants List</h2>
      <input
        type="text"
        placeholder="Search by name, email, or class..."
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="overflow-x-auto h-[70vh] overflow-y-scroll">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white sticky top-0">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((applicant) => (
                <tr
                  key={applicant._id}
                  className="text-center hover:bg-gray-100"
                >
                  <td className="border px-4 py-2">{applicant.userId.name}</td>
                  <td className="border px-4 py-2">{applicant.userId.email}</td>
                  <td className="border px-4 py-2">
                    {applicant.userId.phoneNumber}
                  </td>
                  <td className="border px-4 py-2">
                    {applicant.classId.title}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(applicant.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No matching applicants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllApplicants;
