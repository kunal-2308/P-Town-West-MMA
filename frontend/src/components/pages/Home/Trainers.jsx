import { MoveRight } from 'lucide-react';
import React from 'react';

function Trainers() {
  return (
    <>
      <div 
        className="div-main-container w-full min-h-max flex flex-col justify-center items-center h-auto"
        style={{ backgroundImage: `url('/images/Poster/SmokeBg.png')` }}
      >
        {/* Title Section */}
        <div className="div-1-a flex justify-center items-center mt-5 md:mt-10">
          <span className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-400 mr-2 md:mr-3'>
            ////
          </span>
          <span className='text-xl sm:text-2xl md:text-3xl font-medium text-white'>
            MEET OUR TRAINERS
          </span>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-auto flex justify-center items-center mt-8">
          <img 
            src="/images/Home/Trainings/22.png" 
            alt="Trainers" 
            className="w-full h-[500px] object-cover rounded-lg"
          />

          {/* Button on top of the image */}
          <button
            className="absolute flex bottom-5 mb-10 gap-x-3 left-1/2 transform -translate-x-1/2 bg-customYellow text-black font-semibold py-2 px-4 sm:px-5 rounded-full hover:bg-customYellow-light transition-all text-xs sm:text-sm md:text-base"
          >
            <span>Know More</span>
            <MoveRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default Trainers;
