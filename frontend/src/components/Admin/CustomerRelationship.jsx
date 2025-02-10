import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../configure";
import { toast } from "sonner";
import { CSVLink } from "react-csv";
import Cookies from "js-cookie";

function CustomerRelationship() {
  const [userName, setUserName] = useState("");
  const [list, setList] = useState([]);
  const [selectedRepresentative, setSelectedRepresentative] = useState(null);
  const [clients, setClientsList] = useState([]);

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let token = Cookies.get("jwt_token");
      const response = await axios.post(
        `${API_URL}/api/admin/add/customer/representative`,
        { name: userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setList((prev) => [...prev, { name: userName, visibility: false }]);
        setUserName("");
      }
    } catch {
      toast.error("Failed to add representative");
    }
  };

  const handleDelete = async (name, _id) => {
    try {
      let token = Cookies.get("jwt_token");
      const response = await axios.delete(
        `${API_URL}/api/admin/delete/representative/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Representative deleted successfully");
        setList((prev) => prev.filter((rep) => rep.name !== name));
      }
    } catch {
      toast.error("Failed to delete representative");
    }
  };

  const toggleVisibility = async (index, ele) => {
    setList((prev) =>
      prev.map((rep, i) =>
        i === index ? { ...rep, visibility: !rep.visibility } : rep
      )
    );
    try {
      let token = Cookies.get("jwt_token");
      const response = await axios.post(
        `${API_URL}/api/admin/client/list`,
        { name: ele.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        const newClients = response.data.clients.map((client) => ({
          name: client.name,
          email: client.email,
          phoneNumber: client.phoneNumber,
        }));

        setClientsList(newClients);
        setSelectedRepresentative(ele);
      }
    } catch {
      toast.error("Failed to fetch client list");
    }
  };

  useEffect(() => {
    const fetchRepresentatives = async () => {
      try {
        let token = Cookies.get("jwt_token");
        const response = await axios.get(
          `${API_URL}/api/admin/list/customer/representative`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedList = response.data.list.map((rep) => ({
          ...rep,
          visibility: false,
        }));
        setList(fetchedList);
      } catch {
        toast.error("Error loading representatives");
      }
    };

    fetchRepresentatives();
  }, []);

  return (
    <>
      {selectedRepresentative && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-40">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-2xl max-h-[70vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Clients of {selectedRepresentative.name}
            </h2>
            <table className="w-full border-collapse border border-gray-300 text-left shadow-md">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">
                    Client Name
                  </th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">
                    Email
                  </th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2">
                      {client.name}
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2">
                      {client.email}
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2">
                      {client.phoneNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setSelectedRepresentative(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-full"
              >
                Close
              </button>
              <CSVLink
                data={clients}
                headers={[
                  { label: "Name", key: "name" },
                  { label: "Email", key: "email" },
                  { label: "Phone Number", key: "phoneNumber" },
                ]}
                filename={`clients_of_${selectedRepresentative.name}.csv`}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full"
              >
                Export to CSV
              </CSVLink>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-y-6 sm:gap-y-10 p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          Customer Representatives
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md"
        >
          <input
            type="text"
            name="name"
            id="name"
            required
            value={userName}
            onChange={handleChange}
            placeholder="Enter representative name here"
            className="h-12 sm:h-14 w-full border-2 rounded-full pl-4 placeholder-gray-400 font-medium shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-customYellow px-4 py-2 sm:px-6 rounded-full font-semibold transition w-full sm:w-auto"
          >
            Add
          </button>
        </form>

        <div className="w-full max-w-3xl overflow-x-auto">
          {list.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300 text-left shadow-md">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">
                    Name
                  </th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">
                    View Clients
                  </th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((ele, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-2 sm:px-4 py-2">
                      {ele.name}
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition"
                        onClick={() => toggleVisibility(index, ele)}
                      >
                        View
                      </button>
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(ele.name, ele._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No representatives found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default CustomerRelationship;
