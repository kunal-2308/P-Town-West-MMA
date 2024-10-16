import { useContext, useEffect } from "react";
// import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
// import { logout } from "../../../auth";
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-5xl font-bold text-gray-800">
            {user.displayName || "Welcome!"}
          </h1>
          <p className="py-4 text-gray-600">{user.email}</p>
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
