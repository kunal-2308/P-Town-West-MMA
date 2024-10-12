import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronDown, Menu } from "lucide-react";
import { getCookie, onAuthStateChangedListener } from "../../auth";

function Navbar() {
  let [navStatus, setNavStatus] = useState(false);
  let [dropdownClick, setDropDownClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuBarClick = (e) => {
    e.preventDefault();
    setNavStatus(!navStatus);
  };

  const dropdownClicked = (e) => {
    e.preventDefault();
    setDropDownClick(!dropdownClick);
  };

  useEffect(() => {
    const checkAuthState = () => {
      const userToken = getCookie("userToken");
      setIsLoggedIn(!!userToken);
    };

    checkAuthState();

    onAuthStateChangedListener((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <>
      <nav className="w-full fixed top-0 z-[1000] bg-white">
        <div className="lg:h-[100px] h-auto flex justify-between items-center px-6 lg:px-20 w-full md:mt-0">
          <div className="flex items-center">
            <div className="logo sm:mt-10 md:mt-0">
              <img
                src="public/images/logo/mainLogo.png"
                alt="logo"
                className="h-16 lg:h-20"
              />
            </div>
            <div className="hidden md:block ml-6 lg:ml-10">
              <ul className="flex space-x-4 lg:space-x-8 items-center">
                <li className="hover:cursor-pointer font-semibold text-sm lg:text-base">
                  <Link to="/">Home</Link>
                </li>

                <div className="relative">
                  <div
                    className="div-nav-drop flex justify-center items-center lg:gap-x-1 cursor-pointer"
                    onClick={dropdownClicked}
                  >
                    <li className="font-semibold text-sm lg:text-base">
                      Training Programs
                    </li>
                    <ChevronDown
                      className={`transform transition-transform duration-300 ml-1 ${
                        dropdownClick ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>

                  {/* Dropdown Content */}
                  <ul
                    className={`absolute left-0 mt-2 py-2 w-40 bg-white shadow-lg rounded-md transition-opacity duration-300 ease-in-out ${
                      dropdownClick
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    <li className="px-4 py-2 text-sm hover:bg-gray-200">
                      <Link to="/jitsu">
                        <span className="text-sm hover:font-semibold">
                          Brazilian Jitsu
                        </span>
                      </Link>
                    </li>
                    <li className="px-4 py-2 text-sm hover:bg-gray-200">
                      <Link to="/kickboxing">
                        <span className="text-sm hover:font-semibold">
                          KickBoxing
                        </span>
                      </Link>
                    </li>
                    <li className="px-4 py-2 text-sm hover:bg-gray-200">
                      <Link to="/strength">
                        <span className="text-sm hover:font-semibold">
                          Stregth Program
                        </span>
                      </Link>
                    </li>
                    <li className="px-4 py-2 text-sm hover:bg-gray-200">
                      <Link to="/kids">
                        <span className="text-sm hover:font-semibold">
                          Kids
                        </span>
                      </Link>
                    </li>
                    <li className="px-4 py-2 text-sm hover:bg-gray-200">
                      <Link to="/nutrition">
                        <span className="text-sm hover:font-semibold">
                          Nutrition
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <li className="hover:cursor-pointer font-semibold text-sm lg:text-base">
                  <Link to="/trainer">Our Trainers</Link>
                </li>
                <li className="hover:cursor-pointer font-semibold text-sm lg:text-base">
                  <Link to="/about">About Us</Link>
                </li>
                <li className="hover:cursor-pointer font-semibold text-sm lg:text-base">
                  <Link to="/schedule">Class Schedule</Link>
                </li>
                <li className="hover:cursor-pointer font-semibold text-sm lg:text-base">
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mr-6 lg:mr-9 hidden md:block">
            <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
              <Button className="bg-customYellow text-black hover:bg-customYellow rounded-full font-medium text-sm lg:text-sm">
                {isLoggedIn ? "Go to Dashboard" : "Book a Free Trial Class"}
              </Button>
            </Link>
          </div>
          <div className="div-burgerMenu lg:hidden pr-5 hover:cursor-pointer">
            <Menu className="text-black" onClick={menuBarClick}></Menu>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-800 ease-in-out ${
            navStatus ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col space-y-4 items-center mt-4">
            <li className="hover:cursor-pointer font-semibold text-sm">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:cursor-pointer font-semibold text-sm">
              <Link to="/training/programs">Training Programs</Link>
            </li>
            <li className="hover:cursor-pointer font-semibold text-sm">
              <Link to="/trainer">Our Trainers</Link>
            </li>
            <li className="hover:cursor-pointer font-semibold text-sm">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hover:cursor-pointer font-semibold text-sm">
              <Link to="/schedule">Class Schedule</Link>
            </li>
            <li className="hover:cursor-pointer font-semibold text-sm">
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;