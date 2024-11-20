import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronDown, Menu } from "lucide-react";

function Navbar() {
  let [navStatus, setNavStatus] = useState(false);
  let [dropdownClick, setDropDownClick] = useState(false);
  let [mobileDropdownClick, setMobileDropdownClick] = useState(false); // For mobile view

  const menuBarClick = (e) => {
    e.preventDefault();
    setNavStatus(!navStatus);
  };

  const dropdownClicked = (e) => {
    e.preventDefault();
    setDropDownClick(!dropdownClick);
  };

  const mobileDropdownClicked = (e) => {
    e.preventDefault();
    setMobileDropdownClick(!mobileDropdownClick);
  };

  return (
    <>
      <nav className="fixed top-0 z-[1000] bg-white w-screen shadow-lg">
        <div className="lg:h-[100px] h-auto flex justify-between items-center px-6 lg:px-20 w-full md:mt-0">
          <div className="flex items-center">
            <div className="logo sm:mt-10 md:mt-0 mb-2">
              <img
                src="/images/logo/mainLogo.png"
                alt="logo"
                className="h-16 lg:h-20"
              />
            </div>
          </div>

          <div className="hidden md:block ml-6 lg:ml-10">
            <ul className="flex space-x-4 lg:space-x-8 items-center">
              <li className="hover:cursor-pointer font-semibold text-sm lg:text-base">
                <Link to="/">Home</Link>
              </li>

              <div className="relative">
                <div
                  className="flex items-center cursor-pointer"
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

                <ul
                  className={`absolute left-0 mt-2 py-2 w-48 bg-white shadow-lg rounded-md transition-opacity duration-300 ease-in-out ${
                    dropdownClick
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <li className="px-4 py-2 text-sm hover:bg-gray-200">
                    <Link to="/jitsu">Brazilian Jitsu</Link>
                  </li>
                  <li className="px-4 py-2 text-sm hover:bg-gray-200">
                    <Link to="/kickboxing">KickBoxing</Link>
                  </li>
                  <li className="px-4 py-2 text-sm hover:bg-gray-200">
                    <Link to="/strength">Strength Program</Link>
                  </li>
                  <li className="px-4 py-2 text-sm hover:bg-gray-200">
                    <Link to="/kids">Kids</Link>
                  </li>
                  <li className="px-4 py-2 text-sm hover:bg-gray-200">
                    <Link to="/nutrition">Nutrition</Link>
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
                <Link to="/timetable">Class TimeTable</Link>
              </li>
              <li className="hover:cursor-pointer font-semibold text-sm lg:text-base">
                {localStorage.getItem("role") == "admin" ? (
                  <Link to="/admin/dashboard">Class Schedule</Link>
                ) : (
                  <Link to="/class/schedule">Class Schedule</Link>
                )}
              </li>
              <li className="hover:cursor-pointer font-semibold text-sm lg:text-base">
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="mr-6 lg:mr-9 hidden md:block">
            <Button className="bg-customYellow text-black hover:bg-customYellow rounded-full font-medium text-sm lg:text-sm">
              Book a Free Trial Class
            </Button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden pr-5 hover:cursor-pointer">
            <Menu
              className="text-black w-10 h-10"
              onClick={menuBarClick}
              style={{ padding: "10px" }}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            navStatus ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col space-y-4 items-center mt-4 bg-white py-4">
            <li className="hover:cursor-pointer font-semibold text-sm">
              <Link to="/">Home</Link>
            </li>
            <li
              className="hover:cursor-pointer font-semibold text-sm flex items-center"
              onClick={mobileDropdownClicked}
            >
              Training Programs
              <ChevronDown
                className={`ml-1 transform transition-transform ${
                  mobileDropdownClick ? "rotate-180" : "rotate-0"
                }`}
              />
            </li>
            {/* Mobile dropdown items */}
            {mobileDropdownClick && (
              <ul className="flex flex-col text-center space-y-2">
                <li className="text-sm font-medium">
                  <Link to="/jitsu">Brazilian Jitsu</Link>
                </li>
                <li className="text-sm font-medium">
                  <Link to="/kickboxing">KickBoxing</Link>
                </li>
                <li className="text-sm font-medium">
                  <Link to="/strength">Strength Program</Link>
                </li>
                <li className="text-sm font-medium">
                  <Link to="/kids">Kids</Link>
                </li>
                <li className="text-sm font-medium">
                  <Link to="/nutrition">Nutrition</Link>
                </li>
              </ul>
            )}
            <li className="hover:cursor-pointer font-semibold text-sm">
              <Link to="/trainer">Our Trainers</Link>
            </li>
            <li className="hover:cursor-pointer font-semibold text-sm">
              <Link to="/about">About Us</Link>
            </li>
            <li className="text-sm font-medium">
              <Link to="/timetable">Class TimeTable</Link>
            </li>
            <li className="hover:cursor-pointer font-semibold text-sm">
              <Link to="/class/schedule">Class Schedule</Link>
            </li>
            <li className="hover:cursor-pointer font-semibold text-sm">
              <Link to="/contact">Contact Us</Link>
            </li>

            {/* Mobile Trial Button */}
            <div className="pt-4">
              <Button className="bg-customYellow text-black hover:bg-customYellow rounded-full font-medium text-sm px-6 py-2">
                Book a Free Trial Class
              </Button>
            </div>
          </ul>
        </div>
      </nav>

      {/* Custom styles for 639px to 767px */}
      <style>{`
        @media (max-width: 767px) and (min-width: 640px) {
          nav {
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            margin-top: 0;
          }

          .div-burgerMenu {
            height: 50px;
            display: flex;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
