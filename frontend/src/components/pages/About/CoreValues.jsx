import Navbar from "../../shared/Navbar";
import React from "react";

function CoreValues() {
  return (
    <>
      <Navbar />
      <div className="bg-white h-full w-full flex flex-col items-center mb-20 px-4 sm:px-8">
        {/* Main Title */}
        <div className="mt-20 text-center">
          <span className="text-5xl md:text-6xl lg:text-9xl font-[20] md:text-black/45 text-black/45">
            Our Core Values
          </span>
        </div>

        {/* Core Values Section */}
        <div className="flex flex-col sm:flex-row sm:justify-evenly items-center mt-16 sm:mt-32 gap-y-12 lg:gap-x-20 sm:gap-y-0">
          {/* Core Value Item */}
          <div className="flex flex-col justify-center items-center w-full sm:w-[300px] gap-y-4 px-4">
            <span className="text-lg sm:text-xl font-semibold text-black">
              Excellence:
            </span>
            <span className="text-center text-sm sm:text-base">
              We strive for excellence in every aspect of training, empowering
              our members to unleash their full potential.
            </span>
          </div>

          {/* Core Value Item */}
          <div className="flex flex-col justify-center items-center w-full sm:w-[300px] gap-y-4 px-4">
            <span className="text-lg sm:text-xl font-semibold text-black">
              Respect and Discipline:
            </span>
            <span className="text-center text-sm sm:text-base">
              Respect and discipline are the foundation of our community,
              fostering an environment of mutual support and growth.
            </span>
          </div>

          {/* Core Value Item */}
          <div className="flex flex-col justify-center items-center w-full sm:w-[300px] gap-y-4 px-4">
            <span className="text-lg sm:text-xl font-semibold text-black">
              Continuous Learning:
            </span>
            <span className="text-center text-sm sm:text-base">
              We are dedicated to continuous learning and improvement, providing
              opportunities for personal and martial arts development.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoreValues;
