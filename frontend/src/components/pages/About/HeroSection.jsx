import React from 'react';

function HeroSection() {
    return (
        <>
            <div className="relative w-full h-auto pt-16">
                {/* Image */}
                <img src="public/images/About/1.png" alt="image" className="w-full h-auto object-cover" />

                {/* Text Overlay */}
                <div className="absolute top-44 sm:top-52 w-full h-full flex flex-col justify-center items-center gap-y-10 sm:gap-y-20">
                    {/* Welcome Text */}
                    <div className="flex flex-col justify-start items-start text-center">
                        <span className="text-customYellow text-3xl sm:text-4xl lg:text-6xl font-thin">
                            Welcome to
                        </span>
                        <span className="text-customYellow text-5xl sm:text-6xl lg:text-9xl font-semibold mt-2">
                            P-Town West MMA
                        </span>
                    </div>

                    {/* Description */}
                    <div className="text-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex justify-center items-center text-center px-4 sm:px-8">
                        <span className="text-sm sm:text-sm md:text-base">
                            Founded in 2018, P-Town West MMA stands as Pune's premier destination for authentic Mixed Martial Arts (MMA) training. As the city's first MMA academy, we pride ourselves on offering a comprehensive range of disciplines, including Boxing, Brazilian Jiu-Jitsu (BJJ), Muay Thai, and Judo. Our mission is to foster inclusivity and skill advancement at every level, welcoming beginners and seasoned practitioners alike to embark on a journey of exploration and growth in the vibrant world of martial arts.
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection;
