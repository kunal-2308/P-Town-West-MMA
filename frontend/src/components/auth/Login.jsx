import { useState, useEffect } from "react";
import {
  signInWithEmail,
  signInWithGoogle,
  setCookie,
  getCookie,
} from "../../auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("Guest");

  const navigate = useNavigate();

  useEffect(() => {
    const storedName = getCookie("userName");
    if (storedName) {
      const firstNameOnly = storedName.split(" ")[0];
      setUserName(firstNameOnly);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmail(email, password);
      setCookie("userToken", userCredential.user.uid, 70);
      setCookie("userName", userCredential.user.displayName || "User", 70);
      navigate("/dashboard");
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithGoogle();
      setCookie("userToken", userCredential.user.uid, 70);
      setCookie("userName", userCredential.user.displayName || "User", 70);
      navigate("/dashboard");
    } catch (error) {
      toast.error(`Google login failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white m-10 shadow-2xl rounded-3xl overflow-hidden w-full sm:max-w-6xl max-w-xl flex flex-col lg:flex-row">
        <div className="hidden relative lg:flex w-full lg:w-1/2 items-center justify-center p-12 bg-blue-500">
          <div className="text-center">
            <div className="relative mb-6">
              <img
                src="https://via.placeholder.com/400"
                alt="Login Image"
                className="w-48 h-48 object-cover rounded-full mx-auto opacity-90"
              />
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-12 bg-white relative z-10">
          <div className="w-full max-w-md">
            {/* P-Town MMA Heading */}
            <h2 className="text-3xl font-bold bg-transparent bg-clip-text text-blue-500 mb-4">
              P-Town MMA
            </h2>
            <h2 className="text-3xl font-bold text-neutral-800 my-2">
              Welcome back, {userName}
            </h2>
            <p className="text-xs font-bold text-neutral-500 mb-6">
              Welcome back! Please enter your details.
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
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
                Log in
              </button>
            </form>
            <div className="flex items-center justify-between my-4">
              <hr className="w-full border-gray-300" />
              <div className="text-gray-600 mx-4">OR</div>
              <hr className="w-full border-gray-300" />
            </div>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex flex-row gap-2 items-center justify-center bg-neutral-100 text-gray-800 p-3 rounded-md hover:bg-neutral-200 transition duration-200"
            >
              <img
                src="/images/Dashboard/icons8-google.svg"
                alt="google"
                className="w-7"
              />
              Log in with Google
            </button>
            <p className="mt-4 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-neutral-900 font-semibold hover:underline"
              >
                Sign up for free
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

export default Login;
