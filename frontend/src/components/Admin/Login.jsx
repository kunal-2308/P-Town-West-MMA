import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { API_URL } from "../../../configure";

const Login = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(""); // For showing API-related errors
  const [loading, setLoading] = useState(false); // For showing loading spinner
  const navigate = useNavigate(); // For redirection after login

  const images = [
    "/images/Home/Trainings/12.png",
    "/images/Home/Trainings/13.png",
    "/images/Home/Trainings/14.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email.";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoading(true); // Set loading state to true

    if (!validateForm()) {
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/admin/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt_token", data.token, { secure: true });
        Cookies.set("userName", data.name, { secure: true });
        Cookies.set("email", formData.email, { secure: true });
        Cookies.set("id", data.userId, { secure: true });
        // Show success toast
        toast.success("Login successful!", { autoClose: 2000 });

        // Redirect to the dashboard after a slight delay
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      } else {
        setApiError(data.message || "Login failed. Please try again.");
        toast.error(data.message || "Login failed.", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false); // Stop loading after the response
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-100 mt-20">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
          {/* Left Carousel Section */}
          <div className="hidden md:flex md:w-1/2 relative">
            <img
              src={images[currentImage]}
              alt={`Carousel ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          {/* Right Form Section */}
          <div className="flex items-center justify-center w-full md:w-1/2 p-8">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-semibold mb-6 text-center">
                Login As Admin
              </h2>

              {apiError && (
                <p className="text-red-500 text-sm mb-4 text-center">
                  {apiError}
                </p>
              )}

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className={`w-full p-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`w-full p-3 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              {/* Don't have an account? */}
              <div className="mt-4 text-center">
                <p>
                  Don&apos;t have an account?{" "}
                  <a href="/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
    </>
  );
};

export default Login;
