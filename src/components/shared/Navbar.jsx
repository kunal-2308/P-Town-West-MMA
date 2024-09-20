import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

function Navbar() {
  // State to control the dropdown visibility
  const [viewDropdown, setViewDropdown] = useState(false);

  return (
    <>
      <nav className="w-full overflow-x-hidden fixed top-0 z-50 bg-white">
        <div className="lg:h-[100px] h-auto flex justify-between items-center px-6 lg:px-20 w-full">
          <div className="flex items-center">
            <div className="logo">
              <img src="public/images/logo/mainLogo.png" alt="logo" className="h-16 lg:h-20" />
            </div>
            <div className="hidden lg:block ml-6 lg:ml-10">
              <ul className="flex space-x-4 lg:space-x-8 items-center">
                <li className="hover:cursor-pointer font-semibold text-sm lg:text-base">
                  <Link to="/">Home</Link>
                </li>

                {/* Dropdown Container */}
                <div
                  className="div-dropdown-container flex justify-center items-center relative"
                  onMouseEnter={() => setViewDropdown(true)}
                  onMouseLeave={() => setViewDropdown(false)}
                >
                  {/* Training Programs link with Chevron */}
                  <li className="hover:cursor-pointer font-semibold text-sm lg:text-base pr-1">
                    Training Programs
                  </li>
                  <ChevronDown className={`transition-transform duration-500 ${viewDropdown ? 'rotate-180' : 'rotate-0'}`} />

                  {/* Dropdown Menu */}
                  {viewDropdown && (
                    <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg p-4 w-[200px] z-[1000]">
                      <ul className="space-y-2">
                        <li>
                          <Link to="/training/program1" className="hover:text-blue-600">
                            Program 1
                          </Link>
                        </li>
                        <li>
                          <Link to="/training/program2" className="hover:text-blue-600">
                            Program 2
                          </Link>
                        </li>
                        <li>
                          <Link to="/training/program3" className="hover:text-blue-600">
                            Program 3
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
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
          <div className="mr-6 lg:mr-9">
            <Button className="bg-customYellow text-black hover:bg-customYellow rounded-full font-medium text-sm lg:text-sm">
              Book a Free Trial Class
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="block lg:hidden px-6">
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
