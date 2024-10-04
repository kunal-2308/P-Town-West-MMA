import React from 'react';

function HeroSection2() {
    return (
        <>
            <div className="div-1 pl-32 lg:px-28 pt-16 flex flex-col bg-white max-h-min"> {/* Added mb-20 */}
                {/* Top Section */}
                <div className="flex justify-start items-start mb-10">
                    <span className="text-3xl font-bold text-gray-400 mr-4">////</span>
                    <span className="text-black font-semibold text-xl lg:text-2xl pt-1 leading-snug">
                        Whether You Are A Beginner Or An <br />
                        Advanced Practitioner, Our Classes Are <br />
                        Tailored To Meet Your Needs.
                    </span>
                </div>

                {/* Middle Section with Two Columns */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start w-full gap-x-12">
                    {/* Left Column - Classes for Beginners */}
                    <div className="flex-1">
                        <div className="pl-4 lg:pl-14 mt-10 lg:mt-14">
                            <span className="text-black font-semibold text-xl lg:text-2xl">Classes for Beginners</span>
                            <span className="text-sm block mt-2">
                                Our beginner classes focus on:
                            </span>
                        </div>
                        <div className="flex flex-col mt-8 lg:mt-6 pl-10 lg:pl-[55px] gap-y-3">
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Basic Positions and Techniques:</span>
                                <span className="text-sm font-medium">Learn the fundamental positions, escapes, and submissions.</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Introduction to Sparring:</span>
                                <span className="text-sm font-medium">Controlled sparring sessions to apply learned techniques.</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Building Fitness:</span>
                                <span className="text-sm font-medium">Improve your overall fitness with targeted conditioning exercises.</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Personalized Attention:</span>
                                <span className="text-sm font-medium">Small class sizes ensure you receive personalized instruction.</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Advanced BJJ Classes */}
                    <div className="flex-1 lg:pr-20">
                        <div className="pl-4 lg:pl-14 mt-10 lg:mt-14">
                            <span className="text-black font-semibold text-xl lg:text-2xl">Advanced Brazilian Jiu-Jitsu Classes</span>
                            <span className="text-sm block mt-2">
                                Our advanced classes are designed for practitioners looking to refine their skills:
                            </span>
                        </div>
                        <div className="flex flex-col mt-8 lg:mt-6 pl-10 lg:pl-[55px] gap-y-3">
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Advanced Techniques:</span>
                                <span className="text-sm font-medium">Master complex submissions, sweeps, and transitions.</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Sparring Sessions:</span>
                                <span className="text-sm font-medium">Engage in high-level sparring sessions to test your skills.</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Competitive Training:</span>
                                <span className="text-sm font-medium">Prepare for BJJ competitions with expert coaching and strategy development.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="flex justify-end items-end w-full mt-10 mr-[120px] lg:mt-16"> {/* Adjusted bottom margin */}
                    <img src="public/images/Kickboxing/7.png" alt="Kickboxing Image" className="w-full lg:w-[1000px] max-w-full h-[600px]" />
                </div>
            </div>
        </>
    );
}

export default HeroSection2;
