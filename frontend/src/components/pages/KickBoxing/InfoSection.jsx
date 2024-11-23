import React from "react";

function InfoSection() {
  return (
    <>
      <div className="div flex justify-center items-center p-4 lg:p-8">
        <div className="container flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
          {/* Left Image */}
          <div className="div-1-image flex-shrink-0 w-full md:w-[50%]">
            <img
              src="/Photos_Ptown/KickBoxing/2.Card_PTown MMA.png"
              alt="image"
              className="h-[240px] sm:h-[300px] md:h-[360px] lg:h-[460px] xl:h-[455px] object-cover w-full rounded-lg"
            />
          </div>

          {/* Text Sections */}
          <div className="div-2 flex flex-col gap-4 w-full md:w-[50%]">
            {/* First Content Block */}
            <div className="div-2-1-content bg-customYellow flex flex-col justify-center items-center w-full h-auto rounded-lg p-4 md:p-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
              <div className="div-a flex justify-center items-center flex-col gap-y-3">
                <span className="font-semibold text-lg sm:text-xl md:text-2xl text-center">
                  Footwork and Movement:
                </span>
                <span className="font-light text-xs sm:text-sm md:text-base mt-3 px-4 text-center">
                  Effective movement and footwork are crucial in striking
                  sports. Participants will receive specialized instruction on
                  how to move efficiently, maintain balance, and control
                  distance, enabling them to engage opponents effectively in
                  both boxing and kickboxing scenarios.
                </span>
              </div>
            </div>

            {/* Second Content Block */}
            <div className="div-2-1-content bg-black text-white flex flex-col justify-center items-center w-full h-auto rounded-lg p-4 md:p-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
              <div className="div-a flex justify-center items-center flex-col gap-y-3">
                <span className="font-semibold text-lg sm:text-xl md:text-2xl text-center">
                  Conditioning and Fitness:
                </span>
                <span className="font-light text-xs sm:text-sm md:text-base mt-3 px-4 text-center">
                  Striking requires exceptional cardiovascular endurance and
                  overall fitness. Through targeted workouts, participants will
                  improve their stamina, strength, and agility, preparing them
                  for the physical demands of both sports. Conditioning drills,
                  circuit training, and core exercises will enhance their
                  performance and resilience.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoSection;
