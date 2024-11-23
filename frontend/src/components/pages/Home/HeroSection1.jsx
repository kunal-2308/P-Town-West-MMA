import { Button } from "../../ui/button";
import { MoveRight } from "lucide-react";
import React from "react";

function HeroSection1() {
  return (
    <div className="relative w-[100%] h-[230px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px] flex justify-center items-center overflow-x-hidden lg:mt-10 md:mt-0 mt-0">
      <img
        src="/Photos_Ptown/Home/1.Hero_PTown MMA.png"
        alt="Hero Section"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="z-10 hidden md:flex md:pt-[380px] lg:pt-[430px] justify-center items-center h-full">
        <Button className=" bg-customYellow text-black rounded-full hover:bg-customYellow hover:cursor-pointer font-semibold text-sm md:text-base lg:text-base flex items-center h-auto w-auto">
          Book a free trial
          <MoveRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection1;
