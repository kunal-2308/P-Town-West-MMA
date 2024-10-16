import { Button } from "../../ui/button";
import { MoveRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function HeroSection2() {
  return (
    <div className="relative w-screen h-[300px] md:h-[700px] lg:h-[800px] xl:h-[600px] flex justify-center items-center md:justify-start overflow-x-hidden">
      <img
        src="/images/Home/Trainings/30.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-6 lg:gap-x-10 pt-16 pl-0 md:pl-20 lg:pl-40">
        <div className="flex flex-col gap-y-2 px-5 justify-center items-center md:justify-start md:items-start">
          <div className="flex justify-center items-center md:justify-start md:items-start w-[100%]">
            <span className="font-medium text-xs md:text-3xl lg:text-4xl text-gray-400 mr-1 md:mr-3">////</span>
            <span className="font-medium text-xs md:text-4xl lg:text-5xl text-white">WELCOME TO</span>
          </div>
          <div className="text-customYellow font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            P-TOWN
          </div>
          <div className="text-customYellow font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            WEST MMA
          </div>
        </div>

        <div className="hidden md:flex mt-3 lg:mt-12 justify-start items-start md:justify-end md:items-end sm:pt-24">
          <Button className="bg-customYellow text-black rounded-full flex items-center px-6 sm:px-8 md:px-5 lg:px-10 hover:bg-customYellow">
            <Link to="/contact" className="flex items-center font-semibold text-sm sm:text-base lg:text-base">
              Contact Us
              <MoveRight className="ml-2" />
            </Link>
          </Button>
        </div>
        <div className="block h-auto md:hidden mt-1 lg:mt-5 justify-start items-start md:justify-end md:items-end sm:pt-24">
          <Button className="bg-customYellow text-black rounded-full flex items-center px-6 sm:px-8 md:px-5 lg:px-10 hover:bg-customYellow">
            <Link to="/contact" className="flex items-center font-semibold text-sm sm:text-base lg:text-base">
              Book a free trial
              <MoveRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection2;
