import { Button } from "../../ui/button";
import { MoveRight } from "lucide-react";
import React from "react";

function MmaClub() {
  return (
    <>
      <div className="div-main-container bg-white w-full h-auto flex flex-col lg:flex-row justify-between items-center p-6 sm:p-12 md:p-16 lg:p-20 gap-8">
        {/* Text Section */}
        <div className="div-1 w-full lg:w-[700px]">
          <div className="div-1-a flex flex-col text-center lg:text-left">
            {/* Title */}
            <div className="div flex justify-center lg:justify-start items-center gap-x-3">
              <span className="font-semibold text-gray-400 text-xl sm:text-2xl md:text-3xl">
                ////
              </span>
              <span className="font-semibold text-2xl sm:text-4xl md:text-5xl pt-1 text-black/85">
                P-TOWN MMA CLUB
              </span>
            </div>

            {/* Description */}
            <div className="div-2 mt-4 sm:mt-6 flex justify-center lg:justify-start items-center px-4 lg:px-0">
              <span className="text-xs sm:text-base md:text-lg leading-relaxed text-gray-600">
                Dictum quam et adipiscing faucibus orci neque curabitur. Turpis
                duis morbi in a at amet scelerisque. Dictum quam et adipiscing
                faucibus orci neque curabitur. Turpis duis morbi in a at amet
                scelerisque. Dictum quam et adipiscing faucibus orci neque
                curabitur. Turpis duis morbi in a at amet scelerisque. Dictum
                quam et adipiscing faucibus orci neque curabitur. Turpis duis
                morbi in a at amet scelerisque.
              </span>
            </div>

            {/* Button */}
            <div className="mt-8 sm:mt-6 flex justify-center lg:justify-start">
              <Button className="bg-customYellow text-black rounded-full hover:bg-customYellow hover:cursor-pointer font-semibold text-xs sm:text-sm md:text-sm px-4 py-2 sm:px-5 md:px-6">
                JOIN THE CLUB
                <MoveRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="div-2 flex justify-center items-center">
          <img
            src="/images/Home/Trainings/24.png"
            alt="image"
            className="h-[100px] sm:h-[120px] md:h-[150px] lg:h-[180px] object-contain"
          />
        </div>
      </div>
    </>
  );
}

export default MmaClub;
