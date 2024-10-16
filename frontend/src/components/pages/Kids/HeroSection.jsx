import { Button } from "../../ui/button";
import { MoveRight } from "lucide-react";

function HeroSection() {
  return (
    <>
      {/* Hero Image Section */}
      <div className="relative div-1">
        <div className="div-main-img pt-10">
          <img
            src="/images/Kids/32.png"
            alt="image"
            className="h-auto w-full"
          />
          {/* Text at the bottom center of the image */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-10 md:mb-24 lg:mb-36">
            <p className="text-white text-3xl lg:text-6xl font-bold md:font-extralight  text-center">
              KIDS MARTIAL ARTS PROGRAM
            </p>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="div-2 bg-black h-auto md:h-[280px] flex flex-col lg:flex-row justify-between items-center px-6 lg:px-16 py-8">
        {/* Left Section */}
        <div className="div-1 hidden md:flex flex-col justify-start items-start w-full lg:w-[600px] mb-8 lg:mb-0">
          <div className="div-a flex justify-start items-start">
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-400 mr-4">
              {"////"}
            </span>
            <span className="lg:text-5xl sm:text-2xl font-medium text-customYellow pt-0">
              Empowering Kids <br />
              Through Martial Arts <br />
              Training
            </span>
          </div>
        </div>
        <div className="div-1 block md:hidden flex-col justify-start items-start w-full lg:w-[600px] mb-8 lg:mb-0">
          <div className="div-a flex justify-start items-start">
            <span className="lg:text-5xl text-2xl font-medium text-customYellow pt-0">
              Empowering Kids 
              Through Martial Arts 
              Training
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="div-2 flex flex-col w-full lg:w-[400px]">
          <span className="text-white text-sm sm:text-base md:text-sm font-thin">
            At P-Town West MMA in Pune, Baner, we offer a dynamic Kids Martial
            Arts Program designed to help children develop physical fitness,
            self-discipline, and confidence in a fun and supportive environment.
            Our program is tailored to meet the needs of young learners,
            focusing on age-appropriate techniques and positive character
            development.
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
