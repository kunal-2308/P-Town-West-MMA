import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScrollToTop from "../src/components/shared/ScrollToTop"; // Adjust the path if needed
import Home from "./components/pages/Home/Home";
import KickBoxing from "./components/pages/KickBoxing/KickBoxing";
import Jitsu from "./components/pages/Jitsu/Jitsu";
import Kids from "./components/pages/Kids/Kids";
import About from "./components/pages/About/About";
import Nutrition from "./components/pages/Nutrition/Nutrition";
import Contact from "./components/pages/Contact/Contact";
import Strength from "./components/pages/Strength/Strength";
import Trainer from "./components/pages/Trainers/Trainer";
import { Toaster } from "./components/ui/sonner";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ClassDetails from "./components/pages/Dashboard/ClassDetails";
import Login from "./components/Auth/Login";
import AdminLogin from "./components/Admin/Login";
import Signup from "./components/Auth/SignUp";
import GuestDashboard from "./components/pages/Dashboard/GuestDashboard";
import ClassDetailsGuest from "./components/pages/Dashboard/ClassDetailsGuest";

function App() {
  const createRouter = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/kickboxing", element: <KickBoxing /> },
    { path: "/jitsu", element: <Jitsu /> },
    { path: "/kids", element: <Kids /> },
    { path: "/about", element: <About /> },
    { path: "/nutrition", element: <Nutrition /> },
    { path: "/contact", element: <Contact /> },
    { path: "/strength", element: <Strength /> },
    { path: "/trainer", element: <Trainer /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/login", element: <Login /> },
    { path: "/admin/login", element: <AdminLogin /> },
    { path: "/signup", element: <Signup /> },
    { path: "/classes/:classId", element: <ClassDetails /> },
    { path: "/guest/classes/:classId", element: <ClassDetailsGuest /> },
    { path: "/class/schedule", element: <Dashboard /> },
    { path: "/guest/dashboard", element: <GuestDashboard /> },
  ]);

  return (
    <>
      <RouterProvider router={createRouter}>
        <ScrollToTop />
      </RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
