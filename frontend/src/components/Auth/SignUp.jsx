import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { API_URL } from "../../../configure";

const SignUp = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state for button
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "confirmPassword" || name === "password") {
      if (name === "confirmPassword" && formData.password !== value) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else if (name === "password" && formData.confirmPassword !== value) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Show spinner
      try {
        const response = await fetch(
          `${API_URL}/api/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (data.token) {
          Cookies.set("token", data.token, { path: "/", secure: true });
          Cookies.set("name", formData.name, { path: "/", secure: true });
          Cookies.set("email", formData.email, { path: "/", secure: true });
          Cookies.set("phoneNumber", formData.phoneNumber, {
            path: "/",
            secure: true,
          });
          toast.success("Account created successfully!");
          setTimeout(() => {
            window.location.href = "/dashboard"; // Redirect to dashboard after a short delay
          }, 2000);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred during registration.");
        console.error("Error during registration:", error);
      } finally {
        setLoading(false); // Hide spinner
      }
    } else {
      toast.error("Form validation failed.");
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
                Create an Account
              </h2>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="relative">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                </div>

                <div className="relative">
                  <label className="block text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                  ) : (
                    "Create an Account"
                  )}
                </button>
              </form>

              {/* Already have an account? */}
              <div className="mt-4 text-center">
                <p>
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default SignUp;
