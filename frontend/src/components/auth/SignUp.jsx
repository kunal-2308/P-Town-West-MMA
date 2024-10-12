import { useState } from "react";
import { signUpWithEmail, signInWithGoogle, setCookie } from "../../auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signUpWithEmail(email, password);
      setCookie("userToken", userCredential.user.uid, 7);
      navigate("/dashboard");
    } catch (error) {
      toast.error(`Signup failed: ${error.message}`);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const userCredential = await signInWithGoogle();
      setCookie("userToken", userCredential.user.uid, 7);
      navigate("/dashboard");
    } catch (error) {
      toast.error(`Google signup failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white m-10 shadow-2xl rounded-3xl overflow-hidden w-full sm:max-w-6xl max-w-xl flex flex-col lg:flex-row">
        {/* Static Image */}
        <div className="hidden relative lg:flex w-full lg:w-1/2 items-center justify-center p-12 bg-red-500">
          <div className="text-center">
            <div className="relative mb-6">
              <img
                src="https://via.placeholder.com/400"
                alt="P-Town MMA"
                className="w-48 h-48 object-cover rounded-full mx-auto opacity-90"
                style={{
                  clipPath: "polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)",
                }}
              />
            </div>
            <blockquote className="text-2xl font-semibold text-white">
              "Join the best fitness community in P-Town."
            </blockquote>
            <p className="mt-6 text-lg font-medium text-white">P-Town MMA</p>
          </div>
        </div>

        {/* Signup Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-12 bg-white relative z-10">
          <div className="w-full max-w-md">
            {/* P-Town MMA Heading */}
            <h2 className="text-3xl font-bold text-red-500 mb-4">P-Town MMA</h2>
            <h2 className="text-3xl font-bold text-neutral-800 my-2">
              Create an Account
            </h2>
            <p className="text-xs font-bold text-neutral-500 mb-6">
              Join us today by filling in your details.
            </p>
            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-neutral-800 text-white p-3 rounded-md hover:bg-neutral-700 transition duration-200"
              >
                Sign Up
              </button>
            </form>
            <div className="flex items-center justify-between my-4">
              <hr className="w-full border-gray-300" />
              <div className="text-gray-600 mx-4">OR</div>
              <hr className="w-full border-gray-300" />
            </div>
            <button
              onClick={handleGoogleSignup}
              className="w-full flex flex-row gap-2 items-center justify-center bg-neutral-100 text-gray-800 p-3 rounded-md hover:bg-neutral-200 transition duration-200"
            >
              <img
                src="/images/Dashboard/icons8-google.svg"
                alt="google"
                className="w-7"
              />
              Sign Up with Google
            </button>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-neutral-900 font-semibold hover:underline"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default Signup;
