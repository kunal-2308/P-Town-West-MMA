import React from 'react'

function HeroSection3() {
    return (
        <>
            <div
                className="div-main-container w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[680px] 
        flex flex-col justify-start bg-cover bg-center bg-no-repeat 
        pl-6 sm:pl-12 md:pl-24 lg:pl-52 pt-24 sm:pt-28 md:pt-32 lg:pt-40" /* Adjusted top padding */
                style={{ backgroundImage: `url('/images/Kickboxing/8.png')` }}
            >
                {/* Title Section */}
                <div className="div-1-title">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-customYellow font-medium leading-tight">
                        WHY CHOOSE OUR <br /> MUAY THAI PROGRAM?
                    </span>
                </div>

                {/* Technique Mastery Section */}
                <div className="div-2 mt-10 sm:mt-12 md:mt-16 lg:mt-24 flex flex-col w-[90%] sm:w-[80%] md:w-[80%] lg:w-[700px] mb-10 sm:mb-12 md:mb-16 lg:mb-16">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight text-white">
                    Professional Coaching:
                    </span>
                    <span className="text-sm sm:text-base md:text-lg lg:text-sm text-white mt-4 sm:mt-6 md:mt-8 font-extralight pl-1 sm:pl-2">
                    Our Muay Thai program is led by highly skilled instructors who bring years of training and competition experience to the mat. Their deep understanding of Muay Thai techniques, combined with real-world insights, ensures that you learn practical and effective skills for both self-defense and competitive scenarios.</span>                </div>
            </div>
        </>
    )
}

export default HeroSection3;
