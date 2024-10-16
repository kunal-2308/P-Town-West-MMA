import React from 'react';

function HeroSection4() {
    return (
        <>
            <div className="relative hidden md:block w-full h-auto lg:h-screen">
                {/* Image Section */}
                <div className="absolute top-0 right-0 w-full h-[350px] sm:h-[500px] lg:w-[40%] lg:h-full">
                    <img src="/images/Training/5.png" alt="Boxer Image" className="w-full h-full object-cover" />
                </div>

                {/* Text Section */}
                <div className="relative z-10 p-4 sm:p-6 lg:p-20 w-full lg:absolute lg:top-0 lg:left-0 lg:pl-40 lg:pt-20">
                    <div className="flex items-start justify-start gap-x-2 lg:gap-x-4 lg:pl-4">
                        <span className="text-lg sm:text-xl lg:text-3xl font-semibold text-gray-300">////</span>
                        <span className="text-xl sm:text-2xl lg:text-4xl font-[600] text-gray-800">
                            PERSONAL TRAINING FOR STRENGTH AND CONDITIONING
                        </span>
                    </div>
                    <div className="div-content mt-4 sm:mt-6 lg:ml-[65px] flex flex-col lg:mt-24 lg:gap-y-[65px] gap-y-4">
                        <div className="div-card-1 flex flex-col w-full sm:w-[80%] lg:w-[40%] gap-2 lg:gap-3">
                            <span className='text-lg sm:text-xl lg:text-2xl font-semibold'>Tailored Programs:</span>
                            <span className='text-xs sm:text-sm lg:text-base'>
                                Receive personalized strength and conditioning programs designed to target your specific goals, whether it's building muscle, increasing strength, or improving athletic performance.
                            </span>
                        </div>
                        <div className="div-card-2 flex flex-col w-full sm:w-[80%] lg:w-[40%] gap-2 lg:gap-3">
                            <span className='text-lg sm:text-xl lg:text-2xl font-semibold'>Proper Form and Technique:</span>
                            <span className='text-xs sm:text-sm lg:text-base'>
                                Learn correct lifting techniques and form under the guidance of a certified personal trainer, reducing the risk of injury and maximizing results.
                            </span>
                        </div>
                        <div className="div-card-3 flex flex-col w-full sm:w-[80%] lg:w-[40%] gap-2 lg:gap-3">
                            <span className='text-lg sm:text-xl lg:text-2xl font-semibold'>Progressive Overload:</span>
                            <span className='text-xs sm:text-sm lg:text-base'>
                                Your trainer will gradually increase the intensity of your workouts to ensure continuous progress and adaptation, preventing plateaus and optimizing gains.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection4;
