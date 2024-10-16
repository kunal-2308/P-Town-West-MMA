import React from 'react';

function TrainingCard({ link, title, desc }) {
    return (
        <div className="bg-black rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 w-full sm:w-[300px] md:w-[350px] lg:w-[400px] overflow-hidden mb-10">
            {/* Image Section */}
            <div className="flex justify-center items-center">
                <img
                    src={link}
                    alt={title}
                    className="h-[250px] sm:h-[250px] md:h-[280px] lg:h-[300px] w-full object-cover rounded-t-lg"
                />
            </div>

            {/* Title Section */}
            <div className="flex justify-between items-center mt-5 px-5">
                <span className="text-white font-medium text-lg sm:text-xl md:text-2xl">
                    {title}
                </span>
                <img
                    src="/images/Home/Trainings/arrows.png"
                    alt="arrow"
                    className="h-[20px] sm:h-[22px] md:h-[25px]"
                />
            </div>

            {/* Description Section */}
            <div className="flex justify-center items-center mt-4 px-5">
                <span className="text-white font-light text-xs sm:text-sm md:text-base">
                    {desc}
                </span>
            </div>
        </div>
    );
}

export default TrainingCard;
