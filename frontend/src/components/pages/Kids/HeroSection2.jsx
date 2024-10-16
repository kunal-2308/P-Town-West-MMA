import React from 'react';

function HeroSection2() {
    return (
        <>
            <div className="hidden md:block relative w-full h-auto items-center">
                {/* Background Image */}
                <img src="/images/Kids/34.png" alt="image" className="w-full h-auto object-cover" />

                {/* Text Overlay */}
                <div className="absolute top-12 left-0 h-full flex flex-col justify-start items-center pl-6 sm:pl-12 lg:pl-20 w-full md:w-[50%] gap-y-12">
                    {/* First Text Block */}
                    <div className="flex flex-col justify-start items-start text-white gap-y-4 w-full sm:w-[80%] md:w-[70%]">
                        <span className='text-xl sm:text-2xl md:text-3xl'>Fun and Engaging Classes</span>
                        <span className='text-xs sm:text-sm md:text-base'>We believe that learning martial arts should be fun and engaging for kids. Our classes are designed to keep children excited and motivated, with a mix of drills, games, and interactive activities. This approach ensures that kids enjoy their training while making steady progress.</span>
                    </div>

                    {/* Second Text Block */}
                    <div className="flex flex-col justify-start items-start text-white gap-y-4 w-full sm:w-[80%] md:w-[70%]">
                        <span className='text-xl sm:text-2xl md:text-3xl'>Flexible Class Schedules</span>
                        <span className='text-xs sm:text-sm md:text-base'>We offer flexible class schedules to accommodate busy families. Whether your child is a beginner or has previous martial arts experience, we have classes that fit their level and your schedule. Choose from a variety of class times that work best for your family's routine.</span>
                    </div>
                </div>
            </div>

            <div className="div-sm-block block md:hidden h-auto relative">
                <img src="/images/Kids/34.png" alt="image" className="w-screen h-auto" />

                {/* Black Gradient on Border Top */}
                <div className="div-b bg-black p-10 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-4 before:bg-gradient-to-b before:from-black before:to-transparent">
                    <div className="top-12 left-0 h-full flex flex-col justify-start items-center pl-6 sm:pl-12 lg:pl-20 w-full md:w-[50%] gap-y-12">
                        {/* First Text Block */}
                        <div className="flex flex-col justify-start items-start text-white gap-y-4 w-full sm:w-[80%] md:w-[70%]">
                            <span className="text-2xl md:text-3xl">Fun and Engaging Classes</span>
                            <span className="text-xs sm:text-sm md:text-base">
                                We believe that learning martial arts should be fun and engaging for kids. Our classes are designed to keep children excited and motivated, with a mix of drills, games, and interactive activities. This approach ensures that kids enjoy their training while making steady progress.
                            </span>
                        </div>

                        {/* Second Text Block */}
                        <div className="flex flex-col justify-start items-start text-white gap-y-4 w-full sm:w-[80%] md:w-[70%]">
                            <span className="text-2xl md:text-3xl">Flexible Class Schedules</span>
                            <span className="text-xs sm:text-sm md:text-base">
                                We offer flexible class schedules to accommodate busy families. Whether your child is a beginner or has previous martial arts experience, we have classes that fit their level and your schedule. Choose from a variety of class times that work best for your family's routine.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default HeroSection2;
