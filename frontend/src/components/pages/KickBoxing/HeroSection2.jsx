import React from 'react';

function HeroSection2() {
    return (
        <>
            <div className="div-1-main bg-white w-full flex flex-col lg:flex-row">
                {/* Left Content Section */}
                <div className="div-1 w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center items-center mt-10 lg:mt-20 lg:mb-10">
                    <div className="div-1 hidden md:flex justify-start items-start">
                        <span className="text-3xl font-bold text-gray-400 mr-4">////</span>
                        <span className='text-black font-semibold text-xl lg:text-2xl pt-1'>
                            Whether You Are A Beginner Or An <br />Advanced Practitioner, Our Classes Are <br />Tailored To Meet Your Needs.
                        </span>
                    </div>
                    <div className="div-1 block md:hidden flex justify-start items-start">
                        <span className="text-3xl font-bold text-gray-400 mr-4">////</span>
                        <span className='text-black font-semibold text-xl lg:text-2xl pt-1'>
                            Whether You Are A Beginner Or An Advanced Practitioner, Our Classes Are Tailored To Meet Your Needs.
                        </span>
                    </div>
                    <div className="img-div-mobile block md:hidden flex justify-center items-center mr-10 h-auto">
                        <img src='/images/Kickboxing/2.png' alt="" />
                    </div>


                    <div className="div-2 w-[90%] flex justify-start items-start flex-col md:mt-10 lg:mt-20 md:pl-20 pl-0 pr-16 md:pr-0">
                        <span className='text-black font-semibold text-xl lg:text-2xl'>Kickboxing Classes for Beginners</span>
                        <span className='text-sm pt-2'>
                            Our beginner kickboxing classes are perfect for those new to the sport. We focus on:
                        </span>
                    </div>

                    <div className="div-type-container flex justify-start items-start flex-col mt-6 lg:mt-6 ml-30 pl-4 md:pl-[95px]">
                        <div className="div-3 flex flex-col">
                            <span className='text-base md:text-lg font-semibold'>Fundamental Techniques:</span>
                            <span className='text-xs font-medium mt-2 md:mt-0 pr-7'>Learn the basics of striking, footwork, and defensive maneuvers.</span>
                        </div>
                        <div className="div-3 flex flex-col mt-6 lg:mt-8">
                            <span className='text-base md:text-lg font-semibold'>Fitness Building:</span>
                            <span className='text-xs font-medium pr-7'>Increase your fitness levels with tailored exercises and routines.</span>
                        </div>
                        <div className="div-3 flex flex-col mt-6 lg:mt-8">
                            <span className='text-base md:text-lg font-semibold'>Safe Training Environment:</span>
                            <span className='text-xs font-medium pr-7'>Emphasis on safety and injury prevention.</span>
                        </div>
                        <div className="div-3 flex flex-col mt-6 lg:mt-8">
                            <span className='text-base md:text-lg font-semibold'>Personalized Attention:</span>
                            <span className='text-xs font-medium pr-7'>Small class sizes ensure you get the attention and support you need to progress.</span>
                        </div>
                    </div>

                    <div className="div-type-container flex justify-start items-start flex-col mt-8 lg:mt-12 pl-5">
                        <div className="div-2 w-[90%] flex justify-start items-start flex-col md:mt-10 lg:mt-20 md:pl-20 pl-0 pr-16 md:pr-0">
                            <span className='text-black font-semibold text-xl lg:text-2xl'>Advanced Kickboxing Classes</span>
                            <span className='text-sm pt-2'>
                            Our advanced kickboxing classes are designed for those with experience looking to refine their skills. We offer:                            </span>
                        </div>
                        <div className="div md:pl-20">
                        <div className="div-3 flex flex-col mt-6 lg:mt-8">
                            <span className='text-base md:text-lg font-semibold'>Sparring Sessions:</span>
                            <span className='text-xs font-medium pr-7'>Engage in controlled sparring to apply techniques in real-time scenarios.</span>
                        </div>
                        <div className="div-3 flex flex-col mt-6 lg:mt-8">
                            <span className='text-base md:text-lg font-semibold'>High-Intensity Workouts:</span>
                            <span className='text-xs font-medium pr-7'>Push your limits with challenging drills and conditioning exercises.</span>
                        </div>
                        <div className="div-3 flex flex-col mt-6 lg:mt-8">
                            <span className='text-base md:text-lg font-semibold'>Competitive Training:</span>
                            <span className='text-xs font-medium pr-7'>Prepare for competitions with specialized coaching and strategy sessions.</span>
                        </div>
                        </div>
                    </div>

                </div>

                {/* Right Image Section */}
                <div
                    className="
                        w-full lg:w-1/2 bg-cover bg-right relative lg:ml-10 pr-5"
                    style={{
                        backgroundImage: `url('/images/Kickboxing/2.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center right 10px',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            </div>
        </>
    );
}

export default HeroSection2;
