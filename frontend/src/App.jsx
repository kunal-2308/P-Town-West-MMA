import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
// import { AuthProvider } from "./components/auth/AuthContext";
// import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import { useEffect } from "react";
// import { onAuthStateChangedListener } from "./auth";

function App() {
  // UseEffect to manage auth state changes
  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     console.log(user);
    //   } else {
    //     console.log("User signed out");
    //   }
    // });
    // return () => unsubscribe();
  }, []);

  // Updated router to include private routes and auth-related paths
  const createRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/kickboxing",
      element: <KickBoxing />,
    },
    {
      path: "/jitsu",
      element: <Jitsu />,
    },
    {
      path: "/kids",
      element: <Kids />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/nutrition",
      element: <Nutrition />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/strength",
      element: <Strength />,
    },
    {
      path: "/trainer",
      element: <Trainer />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <>
      <RouterProvider router={createRouter}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
