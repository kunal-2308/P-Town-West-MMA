import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../configure";
import { toast } from "sonner";
import Modal from "../../components/shared/Modal";
import { FaUsers } from "react-icons/fa";
import Cookies from "js-cookie";

const AdminHome = () => {
  const [classes, setClasses] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/all`);
      setClasses(
        Array.isArray(response.data.classes) ? response.data.classes : []
      );
      console.log(response.data);
    } catch {
      toast.error("Failed to fetch class details.");
    }
  };

  const fetchApplicants = async (classId) => {
    try {
      const token = Cookies.get("jwt_token");
      if (!token) {
        toast.error("User not authenticated.");
        return;
      }

      const response = await axios.get(`${API_URL}/api/admin/view/${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const applicantsData = response.data.applicantsByDate || {};
      const flattenedApplicants = Object.entries(applicantsData).flatMap(
        ([date, applicants]) => applicants.map((app) => ({ ...app, date }))
      );

      setApplicants(flattenedApplicants);
      console.log(applicants);
      setAvailableDates(Object.keys(applicantsData));
      setFilterDate("");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      toast.error("Failed to fetch applicants.");
    }
  };

  const openEditModal = (cls) => {
    setSelectedClass(cls);
    setEditModal(true);
  };

  useEffect(() => {
    if (!selectedClass) {
      setEditModal(false);
    }
  }, [selectedClass]);

  const handleUpdate = async () => {
    try {
      const token = Cookies.get("jwt_token");
      if (!token) {
        toast.error("User not authenticated.");
        return;
      }
      await axios.put(
        `${API_URL}/api/admin/update/${selectedClass._id}`,
        selectedClass,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            withCredentials: true,
          },
        }
      );
      toast.success("Class updated successfully.");
      setEditModal(false);
      fetchClasses();
    } catch {
      toast.error("Failed to update class.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = Cookies.get("jwt_token");
      if (!token) {
        toast.error("User not authenticated.");
        return;
      }
      await axios.delete(`${API_URL}/api/admin/delete/${selectedClass._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          withCredentials: true,
        },
      });
      toast.success("Class deleted successfully.");
      setEditModal(false);
      fetchClasses();
    } catch {
      toast.error("Failed to delete class.");
    }
  };

  const filteredApplicants = filterDate
    ? applicants.filter((app) => app.date === filterDate)
    : applicants;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-customDark shadow-lg rounded-lg">
      <h2 className="text-2xl text-customYellow font-semibold mb-6">
        All Classes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {Array.isArray(classes) && classes.length > 0 ? (
          classes.map((cls) => (
            <div
              key={cls._id}
              className="bg-neutral-700 text-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl mb-5 font-bold text-customPurple">
                {cls.title}
              </h3>
              <p className="text-sm">Type: {cls.type}</p>
              <p className="text-sm">Instructor: {cls.instructor}</p>
              <p className="text-sm">Description: {cls.description}</p>
              <p className="text-sm">Time: {cls.startTime}</p>
              <p className="text-sm">
                Recurring Days: {cls.recurringDays.join(", ")}
              </p>
              <p className="text-sm">Weeks: {cls.recurrenceWeeks}</p>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => fetchApplicants(cls._id)}
                  className="flex items-center mt-3 text-sm bg-customYellow text-black p-2 rounded hover:bg-customYellow/70 transition"
                >
                  <FaUsers className="mr-2" /> View Applicants
                </button>
                <button
                  onClick={() => openEditModal(cls)}
                  className="flex items-center mt-3 text-sm bg-customYellow text-black p-2 rounded hover:bg-customYellow/70 transition"
                >
                  Edit Class
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No classes available.</p>
        )}
      </div>

      {showModal && (
        <Modal title="Applicants" onClose={() => setShowModal(false)}>
          <div className="bg-white p-6 rounded-lg w-full max-h-[80vh] overflow-y-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Date
            </label>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            >
              <option value="">All Dates</option>
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>

            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-3">
              {filteredApplicants.length > 0 ? (
                <ul className="space-y-2">
                  {filteredApplicants.map((app) => (
                    <li key={`${app._id}-${app.date}`} className="p-3 border-b">
                      <p className="text-sm font-semibold">{app.name}</p>
                      <p className="text-xs">{app.email}</p>
                      <p className="text-xs">{app.phoneNumber}</p>
                      <p className="text-xs">Date: {app.date}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No applicants found.</p>
              )}
            </div>
          </div>
        </Modal>
      )}
      {editModal && selectedClass && (
        <Modal
          title={selectedClass?.title || "Edit Class"}
          onClose={() => setEditModal(false)}
        >
          <div className="bg-white p-6 rounded-lg w-full h-[60vh] overflow-y-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={selectedClass.title}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, title: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <input
              type="text"
              value={selectedClass.type}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, type: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructor
            </label>
            <input
              type="text"
              value={selectedClass.instructor}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  instructor: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={selectedClass.startTime}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  startTime: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={selectedClass.duration}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  duration: Number(e.target.value),
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity
            </label>
            <input
              type="number"
              value={selectedClass.capacity}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  capacity: Number(e.target.value),
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={selectedClass.description}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  description: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              value={selectedClass.difficulty}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  difficulty: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recurring Days
            </label>
            <input
              type="text"
              value={selectedClass.recurringDays.join(", ")}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  recurringDays: e.target.value.split(", "),
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recurring Weeks
            </label>
            <input
              type="number"
              value={selectedClass.recurrenceWeeks}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  recurrenceWeeks: Number(e.target.value),
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <input
              type="color"
              value={selectedClass.color}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, color: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
              >
                Update Class
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminHome;
