import React from 'react';

function HeroSection2() {
    return (
        <>
            {/* For larger screens */}
            <div className="relative hidden md:flex w-full h-auto items-center">
                {/* Background Image */}
                <img src="/images/Nutrition/3.png" alt="image" className="w-full h-auto object-cover" />

                {/* Text Overlay */}
                <div className="absolute top-12 left-0 h-full flex flex-col justify-start items-start pl-6 sm:pl-12 lg:pl-20 w-full md:w-[50%] gap-y-10">
                    {/* First Text Block */}
                    <div className="flex flex-col justify-start items-start text-white gap-y-2 w-full sm:w-[80%] md:w-[90%]">
                        <span className="text-lg sm:text-xl md:text-3xl">Sports Nutrition for Enhanced Performance</span>
                        <span className="text-xs sm:text-sm md:text-base">
                            Athletes and fitness enthusiasts can benefit greatly from our sports nutrition services. Proper nutrition is crucial for optimizing performance, enhancing recovery, and preventing injuries. Our program provides tailored advice on pre-workout and post-workout nutrition, hydration strategies, and nutrient timing to help you perform at your best.
                        </span>
                    </div>

                    {/* Second Text Block */}
                    <div className="flex flex-col justify-start items-start text-white gap-y-2 w-full sm:w-[80%] md:w-[90%]">
                        <span className="text-lg sm:text-xl md:text-3xl">Ongoing Monitoring and Adjustments</span>
                        <span className="text-xs sm:text-sm md:text-base">
                            Achieving your nutrition goals is an ongoing process. Our program includes regular check-ins and assessments to monitor your progress. Based on your results, we make necessary adjustments to your nutrition plan, ensuring that you continue to make progress and stay on track towards your goals.
                        </span>
                    </div>
                </div>
            </div>

            {/* For smaller screens */}
            <div className="block md:hidden">
                <img src="/images/Nutrition/3.png" alt="image" className="w-full h-auto object-cover" />
                <div className="bg-black p-6 sm:p-8 -mt-2">
                    {/* First Text Block */}
                    <div className="flex flex-col justify-start items-start text-white gap-y-4 w-full pt-3">
                        <span className="text-xl sm:text-xl">Sports Nutrition for Enhanced Performance</span>
                        <span className="text-xs sm:text-sm">
                            Athletes and fitness enthusiasts can benefit greatly from our sports nutrition services. Proper nutrition is crucial for optimizing performance, enhancing recovery, and preventing injuries. Our program provides tailored advice on pre-workout and post-workout nutrition, hydration strategies, and nutrient timing to help you perform at your best.
                        </span>
                    </div>

                    {/* Second Text Block */}
                    <div className="flex flex-col justify-start items-start text-white gap-y-4 w-full mt-6 pb-2">
                        <span className="text-xl sm:text-xl">Ongoing Monitoring and Adjustments</span>
                        <span className="text-xs sm:text-sm">
                            Achieving your nutrition goals is an ongoing process. Our program includes regular check-ins and assessments to monitor your progress. Based on your results, we make necessary adjustments to your nutrition plan, ensuring that you continue to make progress and stay on track towards your goals.
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection2;
