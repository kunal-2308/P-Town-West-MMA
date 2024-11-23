import React from "react";
import TrainingCard from "./TrainingCard";
import { Link } from "react-router-dom";

function TrainingPrograms() {
  return (
    <div className="bg-black h-full w-full">
      {/* Title Section */}
      <div className="flex flex-col justify-start items-start w-full max-w-4xl p-8 md:p-16 mt-4">
        <span className="font-medium text-gray-400 text-2xl md:text-4xl">
          ////
          <span className="text-white ml-3 text-xl">OUR TRAINING PROGRAMS</span>
        </span>
        <span className="text-white text-xs md:text-base font-extralight mt-3 pl-10 md:pl-16">
          Elevate your combat skills with our comprehensive MMA, Muay Thai,
          kickboxing, boxing, and wrestling training programs in Pune, Baner,
          designed for all levels.
        </span>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center items-center gap-8 p-5 max-w-fullxl mx-auto">
        <Link to="/kickboxing">
          <TrainingCard
            link="/Photos_Ptown/Home/image.png"
            title="BOXING"
            desc="Experience the art of eight limbs with our Muay Thai training program in Pune, Baner, where you'll learn authentic techniques, build strength, and enhance your fitness under the guidance of experienced trainers."
          />
        </Link>
        <Link to="/jitsu">
          <TrainingCard
            link="/Photos_Ptown/Home/image-1.png"
            title="BRAZILIAN JIU-JITSU"
            desc="Unlock the power of Brazilian Jiu-Jitsu with our specialized training program in Pune, Baner. Learn effective grappling techniques, enhance your ground game, and boost your fitness with personalized instruction."
          />
        </Link>
        <TrainingCard
          link="/Photos_Ptown/Home/image-2.png"
          title="MUAY THAI"
          desc="Join our Thai Boxing training program in Pune, Baner, to master traditional techniques, enhance striking skills, and achieve peak fitness with expert guidance."
        />
      </div>
    </div>
  );
}

export default TrainingPrograms;
