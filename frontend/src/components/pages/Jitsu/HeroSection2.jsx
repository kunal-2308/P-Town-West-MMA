import React from 'react';

function HeroSection2() {
    return (
        <>
            <div className="hidden md:flex flex-col bg-white pt-16 lg:px-28 pl-8 lg:pl-32 max-h-min">
                {/* Top Section */}
                <div className="flex justify-start items-start mb-8 lg:mb-10">
                    <span className="text-3xl font-bold text-gray-400 mr-4">////</span>
                    <span className="text-black font-semibold text-lg lg:text-2xl leading-snug">
                        Whether You Are A Beginner Or An <br />
                        Advanced Practitioner, Our Classes Are <br />
                        Tailored To Meet Your Needs.
                    </span>
                </div>

                {/* Middle Section with Two Columns */}
                <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-x-6 lg:gap-x-12">
                    {/* Left Column */}
                    <div className="flex-1">
                        <div className="pl-6 lg:pl-14 mt-8 lg:mt-14">
                            <span className="text-black font-semibold text-lg lg:text-2xl">Jiu-Jitsu GI Classes for Beginners</span>
                            <span className="text-sm mt-2 block">
                                Our beginner classes focus on:
                            </span>
                        </div>
                        <div className="flex flex-col mt-6 lg:mt-8 pl-10 lg:pl-[55px] gap-y-4">
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

                    {/* Right Column */}
                    <div className="flex-1 lg:pr-12">
                        <div className="pl-6 lg:pl-14 mt-8 lg:mt-14">
                            <span className="text-black font-semibold text-lg lg:text-2xl">Advanced Brazilian Jiu-Jitsu Classes</span>
                            <span className="text-sm block mt-2">
                                Our advanced classes are designed for practitioners looking to refine their skills:
                            </span>
                        </div>
                        <div className="flex flex-col mt-6 lg:mt-8 pl-10 lg:pl-[55px] gap-y-4">
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
                <div className="flex justify-end items-end w-full mt-8 lg:mt-16 mr-6 lg:mr-20">
                    <img src="/images/Kickboxing/7.png" alt="Kickboxing Image" className="w-full lg:w-[1000px] max-w-full h-[500px] lg:h-[600px]" />
                </div>
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden bg-white w-screen flex-col pb-10">
                {/* Top Section */}
                <div className="flex justify-start items-start px-6 mt-10">
                    <span className="text-3xl font-bold text-gray-400 mr-4">////</span>
                    <span className="text-black font-semibold text-lg">
                        Whether You Are A Beginner Or An Advanced Practitioner, Our Classes Are Tailored To Meet Your Needs.
                    </span>
                </div>

                {/* Image Section */}
                <div className="flex justify-center mt-8">
                    <img src="/images/Kickboxing/7.png" alt="Kickboxing Image" className="w-[380px] h-[220px]" />
                </div>

                {/* Class Information */}
                <div className="px-6 mt-8">
                    <span className="text-black font-semibold text-xl">Jiu-Jitsu GI Classes for Beginners</span>
                    <span className="text-sm block mt-2">Our beginner classes focus on:</span>
                </div>

                <div className="px-6 mt-6 flex flex-col gap-y-4">
                    <div className="flex flex-col">
                        <span className="text-base font-semibold">Basic Positions and Techniques:</span>
                        <span className="text-xs font-medium">Learn the fundamental positions, escapes, and submissions.</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-semibold">Introduction to Sparring:</span>
                        <span className="text-xs font-medium">Controlled sparring sessions to apply learned techniques.</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-semibold">Building Fitness:</span>
                        <span className="text-xs font-medium">Improve your overall fitness with targeted conditioning exercises.</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-semibold">Personalized Attention:</span>
                        <span className="text-xs font-medium">Small class sizes ensure you receive personalized instruction.</span>
                    </div>
                </div>

                {/* Advanced Classes */}
                <div className="px-6 mt-8">
                    <span className="text-black font-semibold text-xl">Advanced Brazilian Jiu-Jitsu Classes</span>
                    <span className="text-sm block mt-2">Our advanced classes are designed for practitioners looking to refine their skills:</span>
                </div>

                <div className="px-6 mt-6 flex flex-col gap-y-4">
                    <div className="flex flex-col">
                        <span className="text-base font-semibold">Advanced Techniques:</span>
                        <span className="text-xs font-medium">Master complex submissions, sweeps, and transitions.</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-semibold">Sparring Sessions:</span>
                        <span className="text-xs font-medium">Engage in high-level sparring sessions to test your skills.</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-semibold">Competitive Training:</span>
                        <span className="text-xs font-medium">Prepare for BJJ competitions with expert coaching and strategy development.</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection2;
