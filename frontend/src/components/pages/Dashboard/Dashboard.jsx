import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      // Get user name from cookies
      const userName = Cookies.get("userName");
      setUser({ displayName: userName });
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userName");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-5xl font-bold text-gray-800">
            {user.displayName || "Welcome!"}
          </h1>
          <p className="py-4 text-gray-600">Welcome back!</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-gray-800">Please log in</h1>
          <p className="py-4 text-gray-600">
            You need to be logged in to view this page.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
