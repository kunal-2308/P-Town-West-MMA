import React from 'react'

function HeroSection5() {
    return (
        <>
            <div className="hidden md:block relative w-full h-auto items-center">
                {/* Background Image */}
                <img src="/images/Training/6.png" alt="image" className="w-full h-auto object-cover" />

                {/* Text Overlay */}
                <div className="absolute top-12 left-0 h-full flex flex-col justify-start items-center pl-6 sm:pl-12 lg:pl-20 w-full md:w-[50%] md: lg:gap-y-20 lg:mt-10">
                    {/* First Text Block */}
                    <div className="flex flex-col justify-start items-start text-white gap-y-4 w-full sm:w-[60%] md:w-[70%]">
                        <span className='text-xl sm:text-base md:text-4xl'>Efficiency and Effectiveness:</span>
                        <span className='text-xs sm:text-sm md:text-sm font-medium'>Personal training sessions are focused and efficient, making the most of your time in the gum and ensuring that every workout brings you closer to your strength and conditioning objectives</span>
                    </div>

                    {/* Second Text Block */}
                    <div className="flex flex-col justify-start items-start text-white gap-y-4 w-full sm:w-[80%] md:w-[70%]">
                        <span className='text-xl sm:text-xl md:text-4xl'>Goal Tracking:</span>
                        <span className='text-xs sm:text-sm md:text-sm font-medium'>Track your progrese over time with measurable benchmarke and <br />assesemente, allowing for adjustmente to your program to keep you on
                            track toward your goals.
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection5
