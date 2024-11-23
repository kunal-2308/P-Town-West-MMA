import { Button } from "../../ui/button";
import { MoveRight } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <div className="relative w-screen h-[250px] md:h-[700px] lg:h-[800px] xl:h-[900px] flex flex-col justify-center items-center mt-16 md:mt-24 overflow-x-hidden">
        {/* Background Image */}
        <div
          className="
          absolute top-0 left-0 w-full h-full 
          bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Photos_Ptown/KickBoxing/Hero_PTown MMA.png')`,
          }}
        ></div>

        {/* Content Section */}
        <div className="w-screen mt-40 relative z-10 flex flex-col items-center justify-center">
          {/* Boxing/Kickboxing Text */}
          <div className="div1 mt-36 lg:mt-28 xl:mt-[200px]">
            <span className=" font-semibold md:font-extrabold text-white text-2xl md:text-7xl">
              BOXING / KICK BOXING
            </span>
          </div>

          {/* Lower Content Section */}
          <div className="w-full h-full hidden md:flex md:flex-row justify-between items-center px-5 md:px-10 lg:px-5 lg:gap-x-40 mt-16 lg:mt-32">
            {/* Left Section */}
            <div className="flex flex-col justify-start items-start w-full lg:w-[600px] mb-8 lg:mb-0 pl-10">
              <div className="flex justify-center items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-400 mr-4">
                  ////
                </span>
                <span className="text-xl sm:text-2xl text-white font-thin pt-2">
                  Master Kickboxing with Expert Training
                </span>
              </div>
              <div className="flex justify-start items-start mt-4 pl-14">
                <span className="text-customYellow text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-loose">
                  Kickboxing / Boxing <br />
                  Training Program in <br />
                  Pune, Baner
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col w-full lg:w-[400px] pr-10">
              <span className="text-white text-sm sm:text-base md:text-sm font-thin">
                Discover the power and intensity of our Kickboxing Training
                Program at P-TownWest MMA in Pune, Baner. Designed for all skill
                levels, our program helps you master striking techniques, build
                endurance, and enhance your overall fitness under the guidance
                of our expert trainers.
              </span>
              <NavLink to="/contact">
                <Button className="bg-customYellow text-black w-[150px] flex justify-center items-center gap-x-3 rounded-full mt-5 h-[30px] hover:bg-customYellow hover:cursor-pointer">
                  Contact Us <MoveRight />
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="div-mobile-view block md:hidden bg-black w-screen h-auto -mt-1 pl-5">
        <div className="div-a flex justify-start items-center pl-5">
          <span className="text-3xl md:text-4xl font-semibold text-gray-400 mr-4">
            ////
          </span>
          <span className="text-xs text-white font-thin pt-2">
            Master Kickboxing with Expert Training
          </span>
        </div>
        <div className="div-b flex justify-start items-start mt-3 pl-4  w-screen pr-10">
          <span className=" text-customYellow text-3xl md:text-4xl lg:text-5xl font-medium">
            Kickboxing / Boxing <br />
            Training Program in Pune, Baner
          </span>
        </div>
        <div className="div-2-2a flex flex-col justify-start items-start pl-4 pr-10 w-full lg:w-screen mt-4 pb-10 ">
          <span className="text-white text-xs sm:text-base md:text-sm font-thin">
            Discover the power and intensity of our Kickboxing Training Program
            at P-TownWest MMA in Pune, Baner. Designed for all skill levels, our
            program helps you master striking techniques, build endurance, and
            enhance your overall fitness under the guidance of our expert
            trainers.
          </span>
          <Button className="bg-customYellow text-black w-[150px] flex justify-center items-center gap-x-3 rounded-full mt-5 h-[30px] hover:bg-customYellow hover:cursor-pointer">
            Contact Us <MoveRight />
          </Button>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
