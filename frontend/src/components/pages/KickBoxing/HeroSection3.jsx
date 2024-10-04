import React from 'react';

function HeroSection3() {
  return (
    <>
      <div
        className="div-main-container w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[660px] 
        flex flex-col justify-start bg-cover bg-center bg-no-repeat 
        pl-6 sm:pl-12 md:pl-24 lg:pl-52 pt-16 sm:pt-20 md:pt-24 lg:pt-32"
        style={{ backgroundImage: `url('public/images/Kickboxing/3.png')` }}
      >
        {/* Title Section */}
        <div className="div-1-title">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-customYellow font-medium leading-tight">
            WHY CHOOSE OUR <br /> KICKBOXING PROGRAM?
          </span>
        </div>

        {/* Technique Mastery Section */}
        <div className="div-2 mt-10 sm:mt-12 md:mt-16 lg:mt-24 flex flex-col w-[90%] sm:w-[80%] md:w-[60%] lg:w-[400px] mb-10 sm:mb-12 md:mb-16 lg:mb-16">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight text-white">
            Technique Mastery
          </span>
          <span className="text-sm sm:text-base md:text-lg lg:text-base text-white mt-4 sm:mt-6 md:mt-8 font-extralight pl-1 sm:pl-2">
            Under the guidance of experienced coaches, participants will learn the fundamental punches, kicks, defensive maneuvers, and combinations essential for effective striking. Emphasis is placed on mastering proper form and technique to ensure steady skill progression in both boxing and kickboxing.
          </span>
        </div>
      </div>
    </>
  );
}

export default HeroSection3;
