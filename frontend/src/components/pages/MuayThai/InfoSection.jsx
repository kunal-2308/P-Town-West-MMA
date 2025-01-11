import React from 'react';

function InfoSection() {
    return (
        <>
            <div className="flex justify-center items-center p-4 lg:p-8">
                <div className="container flex flex-col md:flex-row justify-center items-center sm:gap-y-10 md:gap-x-4">
                    {/* Left Image */}
                    <div className="flex-shrink-0 w-full md:w-[40%]">
                        <img
                            src="/images/MuayThai/image.png"
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
                                <ul className='list-disc text-sm'>
                                    <li>Powerful striking techniques using fists, elbows, knees, and shins.</li>
                                    <li>Defensive movements and counters.</li>
                                    <li>Clinch work for close-range control and domination.</li>
                                    <li>Each class builds progressively, allowing you to develop confidence and competence at your own pace.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Second Content Block */}
                        <div className="bg-black text-white flex flex-col justify-center items-center w-full h-auto rounded-lg p-4 md:p-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                            <div className="flex justify-center items-center flex-col gap-y-3 text-center px-4 sm:px-6 md:px-10">
                                <span className="font-semibold text-lg sm:text-xl md:text-2xl">Personalized Attention and Support</span>
                                <span className="font-light text-xs sm:text-sm md:text-sm mt-3">
                                    At P-Town MMA, we prioritize personalized learning. Our class sizes are intentionally kept small, ensuring that every student receives focused instruction. Whether you’re perfecting a roundhouse kick or mastering the clinch, our coaches are dedicated to helping you achieve your goals.

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
