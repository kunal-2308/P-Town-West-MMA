import React from 'react'

function HeroSection2() {
    return (
        <>
            <div className="hidden md:block relative w-full h-auto items-center">
                {/* Background Image */}
                <img src="/images/Training/3.png" alt="image" className="w-full h-auto object-cover" />

                {/* Text Overlay */}
                <div className="absolute top-12 left-0 h-full flex flex-col justify-start items-center pl-6 sm:pl-12 lg:pl-20 w-full md:w-[50%] md: lg:gap-y-20 lg:mt-10">
                    {/* First Text Block */}
                    <div className="flex flex-col justify-start items-start text-white gap-y-4 w-full sm:w-[80%] md:w-[90%]">
                        <span className='text-xl sm:text-base md:text-4xl'>Functional training</span>
                        <span className='text-xs sm:text-sm md:text-xs'>Functional training is integrated into our program to enhance your ability to perform daily activities with ease. This includes multi-planar movements that improve coordination and body awareness, balance and stability exercises, and core training to ensure a strong foundation for all your physical activities.</span>
                    </div>

                    {/* Second Text Block */}
                    <div className="flex flex-col justify-start items-start text-white gap-y-4 w-full sm:w-[80%] md:w-[90%]">
                        <span className='text-xl sm:text-xl md:text-4xl'>Flexibility and mobility work</span>
                        <span className='text-xs sm:text-sm md:text-xs'>Flexibility and mobility work is crucial for injury prevention and overall performance, so we incorporate dynamic stretching before workouts to prepare your muscles, and static stretching post-workout to improve flexibility and aid recovery. Mobility drills focus on joint health and movement efficiency, which is essential for maintaining long-term physical wellness.</span>
                    </div>
                </div>
            </div>
            <div className="mobile-view block md:hidden">
                <img src="/images/Training/3.png" alt="image" className="w-full h-auto object-cover" />
                <div className="bg-black p-10 flex flex-col gap-y-8">
                    <div className="flex flex-col justify-start items-start text-white gap-y-3 w-full sm:w-[80%] md:w-[90%]">
                        <span className='text-2xl md:text-4xl'>Functional training</span>
                        <span className='text-xs sm:text-sm md:text-xs'>Functional training is integrated into our program to enhance your ability to perform daily activities with ease. This includes multi-planar movements that improve coordination and body awareness, balance and stability exercises, and core training to ensure a strong foundation for all your physical activities.</span>
                    </div>

                    {/* Second Text Block */}
                    <div className="flex flex-col justify-start items-start text-white gap-y-3 w-full sm:w-[80%] md:w-[90%]">
                        <span className='text-2xl md:text-4xl'>Flexibility and mobility work</span>
                        <span className='text-xs sm:text-sm md:text-xs'>Flexibility and mobility work is crucial for injury prevention and overall performance, so we incorporate dynamic stretching before workouts to prepare your muscles, and static stretching post-workout to improve flexibility and aid recovery. Mobility drills focus on joint health and movement efficiency, which is essential for maintaining long-term physical wellness.</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection2
