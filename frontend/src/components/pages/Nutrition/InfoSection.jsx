import React from 'react';

function InfoSection() {
    return (
        <>
            {/* Title Section */}
            <div className="hidden md:flex pt-10 px-4 md:pl-52 gap-x-2 justify-start items-center">
                <span className="text-3xl font-semibold text-gray-300">////</span>
                <span className="text-xl md:text-2xl font-semibold">Why Choose Our Kids Martial Arts Program?</span>
            </div>

            {/* Main Section */}
            <div className="flex justify-center items-center pb-5 pt-5 pl-5 pr-5 md:pr-0 lg:p-8 sm:flex-row flex-wrap">
                <div className="container flex flex-col md:flex-row justify-center items-center gap-y-6 md:gap-x-6">
                    {/* Left Image */}
                    <div className="md:w-[30%] w-[90%]">
                        <img
                            src="/images/Nutrition/2.png"
                            alt="image"
                            className="h-[240px] sm:h-[300px] md:h-[360px] lg:h-[460px] xl:h-[430px] object-cover w-full rounded-lg"
                        />
                    </div>

                    {/* Text Sections */}
                    <div className="flex flex-col gap-y-6 w-full md:w-[50%]">
                        {/* First Content Block */}
                        <div className="bg-customYellow flex flex-col justify-center items-start rounded-lg p-4 md:p-5 transition-transform duration-300 ease-in-out hover:scale-105">
                            <div className="flex flex-col gap-y-2 text-start px-4 sm:px-6">
                                <span className="font-semibold text-lg sm:text-xl md:text-2xl">Improve Physical Fitness <br />and Coordination</span>
                                <span className="font-medium text-xs sm:text-sm md:text-base mt-2">
                                    Our program emphasizes physical fitness, helping children improve their strength, flexibility, and coordination. Martial arts training involves a variety of movements that enhance motor skills and promote healthy physical development. Regular practice also helps kids stay active and maintain a healthy lifestyle.
                                </span>
                            </div>
                        </div>

                        {/* Second Content Block */}
                        <div className="bg-black text-white flex flex-col justify-center items-start rounded-lg p-4 md:p-6 transition-transform duration-300 ease-in-out hover:scale-105">
                            <div className="flex flex-col gap-y-2 text-start px-4 sm:px-6">
                                <span className="font-semibold text-lg sm:text-xl md:text-2xl">Practical Self-Defense Skills</span>
                                <span className="font-light text-xs sm:text-sm md:text-base mt-2">
                                    Our Kids Martial Arts Program includes age-appropriate self-defense techniques. Children learn how to protect themselves in a safe and controlled environment. These skills not only enhance their physical safety but also give them the confidence to handle challenging situations responsibly.
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
