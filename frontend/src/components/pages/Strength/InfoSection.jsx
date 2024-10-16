import React from 'react'

function InfoSection() {
    return (
        <>
            {/* Wrapper to prevent horizontal scrolling */}
            <div className="overflow-x-hidden">
                {/* Title Section */}
                <div className="pt-10 px-4 md:px-8 lg:px-12 xl:pl-52 gap-x-2 flex justify-start items-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300">////</span>
                    <span className="text-lg sm:text-xl lg:text-2xl font-semibold pt-1">Comprehensive Training Approach</span>
                </div>

                {/* Main Content Section */}
                <div className="flex flex-col sm:flex-row justify-center items-center p-4 lg:p-8 xl:ml-[115px] gap-y-8 sm:gap-x-6 w-full h-auto">
                    <div className="flex flex-col md:flex-row justify-center items-center w-full gap-y-6 md:gap-x-8">
                        
                        {/* Left Image */}
                        <div className="flex-shrink-0 w-full sm:w-[60%] md:w-[40%] lg:w-[40%] xl:w-[40%] max-w-full">
                            <img
                                src="/images/Training/2.png"
                                alt="image"
                                className="h-[200px] sm:h-[300px] md:h-[360px] lg:h-[460px] xl:h-[480px] object-cover w-full rounded-lg"
                            />
                        </div>

                        {/* Text Sections */}
                        <div className="flex flex-col gap-y-6 w-full sm:w-[90%] md:w-[55%] lg:w-[50%]">
                            
                            {/* First Content Block */}
                            <div className="bg-customYellow flex flex-col justify-center items-center w-full md:w-[70%] h-auto rounded-lg p-4 md:p-5 lg:p-8 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                                <div className="flex justify-start items-start flex-col gap-y-1 text-start px-2 sm:px-4 md:px-3 lg:px-4">
                                    <span className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">Resistance Training</span>
                                    <span className="font-medium text-xs sm:text-sm md:text-sm lg:text-sm mt-2">
                                        Resistance training is the cornerstone of our program, focusing on building muscle strength, endurance, and hypertrophy (muscle growth). We utilize a variety of equipment, including free weights (dumbbells, barbells), resistance bands, and weight machines.
                                    </span>
                                </div>
                            </div>

                            {/* Second Content Block */}
                            <div className="bg-black text-white flex flex-col justify-center items-center w-full md:w-[70%] h-auto rounded-lg p-4 md:p-6 lg:p-8 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                                <div className="flex justify-center items-center flex-col gap-y-2 text-center px-2 sm:px-6 md:px-3 lg:px-5">
                                    <span className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">Cardiovascular Conditioning</span>
                                    <span className="font-light text-xs sm:text-sm md:text-sm lg:text-sm mt-2 text-start">
                                        Cardiovascular conditioning is another key component, aimed at improving heart health and endurance through methods like high-intensity interval training (HIIT), steady-state cardio, and circuit training. We also offer low-impact cardio options to accommodate different fitness levels and needs, ensuring that everyone can benefit from enhanced cardiovascular fitness.
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoSection
