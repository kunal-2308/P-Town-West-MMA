import { Button } from "../../ui/button";
import { MoveRight } from "lucide-react";
import React from "react";

function HeroSection() {
  return (
    <>
      {/* Hero Image Section */}
      <div className="relative div-1">
        <div className="div-main-img">
          <img
            src="public/images/Nutrition/1.png"
            alt="image"
            className="h-[800px] w-full"
          />
          {/* Text at the center of the image */}
          <div className="absolute inset-0 flex items-end justify-start pb-40 pl-48">
            <p className="text-white text-4xl sm:text-3xl lg:text-6xl font-normal text-center">
              Nutrition Program
            </p>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="div-2 bg-black h-auto md:h-[280px] flex flex-col lg:flex-row justify-between items-center px-6 lg:px-16 py-8">
        {/* Left Section */}
        <div className="div-1 flex flex-col justify-start items-start w-full lg:w-[600px] mb-8 lg:mb-0">
          <div className="div-a flex justify-start items-start">
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-400 mr-4">
              {"////"}
            </span>
            <span className="lg:text-5xl sm:text-2xl font-medium text-customYellow pt-0">
              Transform Your Health <br />
              with Our Comprehensive <br /> Nutrition Program
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="div-2 flex flex-col w-full lg:w-[400px]">
          <span className="text-white text-sm sm:text-base md:text-sm font-thin">
            At P-TOWN WEST in Pune, Baner, our Nutrition Program is designed to
            complement your fitness goals and promote overall well-being.
            Whether you&apos;re aiming to lose weight, build muscle, enhance
            athletic performance, or simply adopt a healthier lifestyle, our
            personalized nutrition plans and expert guidance will help you
            achieve sustainable results.{" "}
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
