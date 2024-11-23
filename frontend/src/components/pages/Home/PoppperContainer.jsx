import { MoveRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

function PoppperContainer() {
  return (
    <>
      <div className="main-popper-container bg-white m-4 flex flex-wrap justify-center items-center gap-5">
        <div className="div-info md:hidden flex flex-col justify-center items-center  font-light text-sm pl-7 pr-7 pt-3 gap-y-5">
          <span className="text-center">
            P Town West is proud to offer the best coaches in Pune, Baner,
            providing live training to help you achieve your goals. Our team is
            dedicated to helping you succeed and reach your full potential. Join
            us today and experience the difference for yourself.
          </span>
          <Button className="bg-customYellow text-black rounded-full flex items-center px-6 sm:px-8 md:px-5 lg:px-10 hover:bg-customYellow">
            <Link
              to="/contact"
              className="flex items-center font-semibold text-sm sm:text-base lg:text-base"
            >
              Book a free trial
              <MoveRight className="ml-2" />
            </Link>
          </Button>
        </div>
        {/* First Popper */}
        <div
          className="div-1-popper bg-cover bg-center h-[480px] w-[100%] sm:w-[360px] rounded-xl flex justify-start items-end pb-4 pl-8 transform transition-transform duration-300 ease-in-out hover:scale-105"
          style={{
            backgroundImage: `url('/images/Home/Popper/1.png')`,
          }}
        >
          <div className="elements flex flex-col mb-3 gap-1">
            <span className="text-customYellow font-medium text-4xl sm:text-5xl">
              Top
            </span>
            <span className="text-customYellow font-medium text-4xl sm:text-5xl">
              Notch
            </span>
            <span className="text-customYellow font-medium text-4xl sm:text-5xl">
              Facilities
            </span>
          </div>
        </div>

        {/* Second Popper */}
        <div className="div-2-popper flex flex-col gap-2 w-[100%] sm:w-[360px]">
          <div className="div-2-a-black bg-black flex flex-col w-full h-[285px] rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="div pt-7 pl-10">
              <img
                src="/images/Home/Popper/Vector.png"
                alt="alt image"
                className="h-[60px]"
              />
            </div>
            <div className="div-2-a-black-1 flex flex-col justify-center items-start ml-3 pl-7 mt-4 pr-5">
              <span className="font-thin text-white text-2xl">
                P TOWN WEST MMA
              </span>
              <span className="font-base text-customYellow text-3xl mt-2">
                is the perfect place to start your martial arts journey
              </span>
            </div>
          </div>

          <div className="div-2-b-green bg-customYellow w-full h-[189px] rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="div-1-rating pl-7 pt-5">
              <img
                src="/images/Home/Popper/star.png"
                alt="starRating"
                className="w-[110px] h-[23px]"
              />
            </div>
            <div className="div-2-title flex flex-col">
              <span className="font-semibold text-2xl pl-7 mt-4">
                Expert Trainers
              </span>
              <span className="font-light text-sm pl-7 pr-2 mt-2">
                Master your skills with our expert-level MMA, Muay Thai,
                kickboxing, boxing, and wrestling training programs in Pune,
                Baner, led by top-tier coaches for unparalleled advancement.
              </span>
            </div>
          </div>
        </div>

        {/* Third Popper */}
        <div
          className="div-3-popper bg-cover bg-center h-[480px] w-[100%] sm:w-[360px] rounded-xl flex items-center justify-center pb-4 pl-8 transform transition-transform duration-300 ease-in-out hover:scale-105"
          style={{
            backgroundImage: `url('/Photos_Ptown/Home/2.Card__PTown MMA.png')`,
          }}
        >
          <div className="flex flex-col items-start mt-44">
            <span className="font-medium text-customYellow text-4xl sm:text-5xl">
              Beginners
            </span>
            <span className="font-medium text-customYellow text-4xl sm:text-5xl">
              Friendly
            </span>
            <span className="font-medium text-customYellow text-4xl sm:text-5xl">
              Training
            </span>
            <span className="text-white font-normal text-xs mt-5 p-2">
              Join our beginner-friendly training programs in Pune, Baner, and
              kickstart your journey in MMA, Muay Thai, kickboxing, boxing, and
              wrestling with expert coaching and a supportive community
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PoppperContainer;
