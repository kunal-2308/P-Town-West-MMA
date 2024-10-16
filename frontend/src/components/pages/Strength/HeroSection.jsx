import { Button } from "../../ui/button";
import { MoveRight } from "lucide-react";
import React from "react";

function HeroSection() {
  return (
    <>
      {/* Hero Image Section */}
      <div className="relative">
        <div>
          <img
            src="/images/Training/1.png"
            alt="image"
            className="h-[500px] md:h-[600px] lg:h-[800px] w-full object-cover"
          />
          {/* Text at the center of the image */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-start md:items-end pb-10 md:pb-40 px-6 md:pl-12 lg:pl-48">
            <div className="hidden md:flex text-center md:text-start flex-col md:gap-y-6 md:font-[220] font-bold ">
              <span className="md:tracking-wide text-white text-3xl md:text-3xl lg:text-6xl">
                STRENGTH &amp;
              </span>
              <span className="md:tracking-wide text-white text-3xl md:text-3xl lg:text-6xl">
                CONDITIONING PROGRAM
              </span>
            </div>
            <div className="block w-screen md:hidden text-center md:text-start flex-col md:gap-y-6 md:font-[220] font-bold">
              <span className="block w-full text-white text-2xl md:text-3xl lg:text-6xl">
                STRENGTH &amp; <br /> CONDITIONING PROGRAM
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Information Section */}
      <div className="bg-black h-auto flex flex-col lg:flex-row justify-between items-center px-6 md:px-12 lg:px-16 py-8">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-start items-start w-full lg:w-[600px] mb-8 lg:mb-0">
          <div className="flex justify-start items-start">
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-400 mr-4">
              ////
            </span>
            <span className="text-xl md:text-2xl lg:text-4xl font-medium text-customYellow">
              Elevate Your Fitness <br />
              with Our Comprehensive <br />
              Strength & Conditioning <br />
              Program
            </span>
          </div>
        </div>
        <div className="block md:hidden flex-col justify-start items-start w-full lg:w-[600px] mb-8 lg:mb-0">
          <div className="flex justify-start items-start">
            <span className="text-2xl md:text-2xl lg:text-4xl font-medium text-customYellow">
              Elevate Your Fitness 
              with Our Comprehensive 
              Strength & Conditioning 
              Program
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full lg:w-[400px]">
          <span className="text-white text-sm md:text-base font-thin">
            At P-Town West MMA in Pune, Baner, we offer a premium Strength &
            Conditioning Program designed to help you achieve peak physical
            performance. Whether you're an athlete aiming to enhance your
            competitive edge or someone looking to improve overall fitness, our
            program provides personalized training that delivers real results.
          </span>
          <Button className="bg-customYellow text-black w-full md:w-[200px] flex justify-center items-center gap-x-3 rounded-full mt-5 h-[40px] hover:bg-customYellow hover:cursor-pointer">
            Contact Us <MoveRight />
          </Button>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
