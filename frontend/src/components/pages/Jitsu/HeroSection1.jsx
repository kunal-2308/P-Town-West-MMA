import { Button } from "../../ui/button";
import { MoveRight } from "lucide-react";
import React from "react";

function HeroSection1() {
  return (
    <>
      {/* Hero Image Section */}
      <div className="relative div-1 mt-12 md:mt-4">
        <div className="div-main-img">
          <img
            src="/images/Kickboxing/6.png"
            alt="image"
            className="h-auto w-full"
          />
          {/* Text at the bottom center of the image */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-10 md:mb-24 lg:mb-36">
            <p className="text-white text-3xl lg:text-8xl font-medium md:font-extralight text-center">
              JIU-JITSU GI PROGRAM
            </p>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="div-2 hidden md:flex bg-black h-auto flex-col lg:flex-row justify-between items-center px-6 lg:px-16 py-8 -mt-1">
        {/* Left Section */}
        <div className="div-1 flex flex-col justify-start items-start w-full lg:w-[600px] mb-8 lg:mb-0">
          <div className="div-a flex justify-center items-center">
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-400 mr-4">
              ////
            </span>
            <span className="text-xl sm:text-2xl text-white font-thin pt-2">
              Master Jiu-Jitsu with Expert Training
            </span>
          </div>
          <div className="div-b flex justify-start items-start mt-4 pl-4 sm:pl-8 md:pl-12 flex-col gap-y-2">
            <span className="text-customYellow text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
              Jiu-Jitsu GI Training
            </span>
            <span className="text-customYellow text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-loose">
              Program in Pune, Baner
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="div-2 flex flex-col w-full lg:w-[400px]">
          <span className="text-white text-sm sm:text-base md:text-sm font-thin">
            Unlock the power and technique of Brazilian Jiu-Jitsu (BJJ) with our
            specialized training program at P-Town MMA in Pune, Baner. Whether
            you&apos;re a beginner or an advanced practitioner, our program is
            designed to help you master grappling, submissions, and ground
            control under the guidance of our expert coaches.
          </span>
          <Button className="bg-customYellow text-black w-[150px] flex justify-center items-center gap-x-3 rounded-full mt-5 h-[30px] hover:bg-customYellow hover:cursor-pointer">
            Contact Us <MoveRight />
          </Button>
        </div>
      </div>

      {/* Mobile Section */}
      <div className="div-mobile-view block md:hidden bg-black w-screen h-auto -mt-1 pl-5">
        <div className="div-a flex justify-start items-center pl-5">
          <span className="text-3xl md:text-4xl font-semibold text-gray-400 mr-4">
                ////
          </span>
          <span className="text-xs text-white font-thin pt-2">
          Master Jiu-Jitsu with Expert Training
          </span>
        </div>
        <div className="div-b flex flex-col justify-start items-start mt-3 pl-4  w-screen pr-10">
          <span className=" text-customYellow text-3xl md:text-4xl lg:text-5xl font-medium">
          Jiu-Jitsu GI Training
          </span>
          <span className=" text-customYellow text-3xl md:text-4xl lg:text-5xl font-medium">
          Program in Pune, Baner
          </span>
        </div>
        <div className="div-2-2a flex flex-col justify-start items-start pl-4 pr-10 w-full lg:w-screen mt-4 pb-10 ">
          <span className="text-white text-xs sm:text-base md:text-sm font-thin">
          Unlock the power and technique of Brazilian Jiu-Jitsu (BJJ) with our specialized training program at [P-Town MMA  in Pune, Baner. Whether you’re a beginner or an advanced practitioner, our program is designed to help you master grappling, submissions, and ground control under the guidance of our expert coaches.
          </span>
          <Button className="bg-customYellow text-black w-[150px] flex justify-center items-center gap-x-3 rounded-full mt-5 h-[30px] hover:bg-customYellow hover:cursor-pointer">
            Contact Us <MoveRight />
          </Button>
        </div>
      </div>
    </>
  );
}

export default HeroSection1;
