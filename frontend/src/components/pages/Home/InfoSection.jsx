import { Button } from "../../ui/button";
import { MoveRight } from "lucide-react";
import React from "react";

function InfoSection() {
  return (
    <>
      <div className="div-main-container bg-white p-4 sm:p-8 md:p-16 flex flex-col lg:flex-col md:flex-row justify-center items-center gap-y-8 lg:gap-y-4">
        <div className="div-1 mt-8 flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Left Image */}
          <div className="div-1-image flex-shrink-0">
            <img
              src="/Photos_Ptown/Home/4Card.png"
              alt="image"
              className="h-[240px] sm:h-[300px] md:h-[360px] lg:h-[500px] xl:h-[535px] object-cover w-full md:w-[420px] rounded-lg"
            />
          </div>
          {/* Text Sections */}
          <div className="div-2 flex flex-col gap-4">
            <div className="div-2-1-content bg-customYellow flex flex-col w-full max-w-[360px] sm:max-w-[440px] h-auto md:h-[260px] rounded-lg p-4 md:p-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
              <span className="font-semibold text-lg sm:text-xl md:text-2xl">
                Separate floor for Striking, MMA and Grappling Training
              </span>
              <span className="font-light text-xs sm:text-sm md:text-sm mt-3">
                Looking for a dedicated space to train in striking, MMA, and
                grappling? Our facility offers a separate floor for each
                discipline, allowing you to focus on your specific training
                needs. With top-of-the-line equipment and experienced trainers,
                you'll have everything you need to take your skills to the next
                level.
              </span>
            </div>
            <div className="div-2-2-content bg-black flex flex-col w-full max-w-[360px] sm:max-w-[440px] h-auto md:h-[260px] rounded-lg p-4 md:p-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
              <span className="text-white font-semibold text-lg sm:text-xl md:text-2xl">
                Top Tier Coaches {"–"} One of the Five Gyms in India with a
                Black BJJ Coach
              </span>
              <span className="font-thin text-xs sm:text-sm md:text-sm text-white mt-6">
                One of the five gyms in India with a black BJJ coach. Our
                experienced coach is dedicated to helping you achieve your
                fitness goals and improve your BJJ skills. Join our community
                today and take your training to the next level!
              </span>
            </div>
          </div>
        </div>

        {/* Background Image Section */}
        <div
          className="div bg-cover bg-center bg-no-repeat h-[260px] sm:h-[300px] lg:h-[330px] w-full max-w-[890px] rounded-lg flex flex-col pl-4 sm:pl-8 md:pl-12 pt-12 sm:pt-16 md:pt-20"
          style={{
            backgroundImage: `url('/images/Home/Trainings/23.png')`,
          }}
        >
          <div className="div-1 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] flex flex-col gap-y-3">
            <span className="text-customYellow text-xl sm:text-2xl md:text-3xl font-medium">
              World class gym equipment
            </span>
            <span className="text-white text-xs sm:text-sm md:text-sm">
              Looking for world-class gym equipment to take your MMA training to
              the next level? Our gym offers top-of-the-line machines and
              accessories designed to help you build strength, endurance, and
              agility. Whether you're a seasoned pro or just starting out, our
              equipment will help you achieve your goals.
            </span>
          </div>

          <Button className="bg-customYellow text-black rounded-full hover:bg-customYellow hover:cursor-pointer font-semibold text-xs sm:text-sm md:text-sm p-1 sm:p-2 w-[140px] sm:w-[160px] md:w-[170px] h-[28px] sm:h-[30px] mt-6">
            Book a free trial
            <MoveRight className="ml-2" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default InfoSection;
