import React from 'react';

function InfoSection() {
    return (
        <>
            <div className="flex justify-center items-center p-4 lg:p-8">
                <div className="container flex flex-col md:flex-row justify-center items-center sm:gap-y-10 md:gap-x-4">
                    {/* Left Image */}
                    <div className="flex-shrink-0 w-full md:w-[40%]">
                        <img
                            src="/images/Kickboxing/9.png"
                            alt="image"
                            className="h-[240px] sm:h-[300px] md:h-[360px] lg:h-[460px] xl:h-[430px] object-cover w-full rounded-lg"
                        />
                    </div>

                    {/* Text Sections */}
                    <div className="flex flex-col gap-y-5 w-full md:w-[50%] mt-5 md:mt-0">
                        {/* First Content Block */}
                        <div className="bg-customYellow flex flex-col justify-center items-center w-full h-auto rounded-lg p-4 md:p-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                            <div className="flex justify-start items-start flex-col gap-y-1 text-start px-4 sm:px-6 md:px-10">
                                <span className="font-semibold text-lg sm:text-xl md:text-2xl">Structured and <br />Comprehensive Curriculum</span>
                                <span className="font-medium text-xs sm:text-sm md:text-sm mt-2">
                                    We offer a well-structured curriculum that covers all aspects of Brazilian Jiu-Jitsu, from foundational techniques to advanced submissions and strategies. Our program is designed to ensure steady progression, with each class building on the previous one.
                                </span>
                            </div>
                        </div>

                        {/* Second Content Block */}
                        <div className="bg-black text-white flex flex-col justify-center items-center w-full h-auto rounded-lg p-4 md:p-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                            <div className="flex justify-center items-center flex-col gap-y-3 text-center px-4 sm:px-6 md:px-10">
                                <span className="font-semibold text-lg sm:text-xl md:text-2xl">Personalized Attention and Support</span>
                                <span className="font-light text-xs sm:text-sm md:text-sm mt-3">
                                    We believe in the importance of personalized instruction. Our class sizes are intentionally kept small to ensure that each participant receives individual attention from our coaches. Whether you're struggling with a particular technique or looking to refine your skills, our instructors are always available to provide guidance and support.
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
