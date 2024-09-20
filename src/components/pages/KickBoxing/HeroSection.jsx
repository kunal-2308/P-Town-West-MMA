import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import React from 'react';

function HeroSection() {
    return (
        <div className="div">
            <div
                className="
                    w-full h-[800px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px]
                    bg-cover flex flex-col justify-center items-center"
                style={{
                    backgroundImage: `url('/images/Home/Trainings/26.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Boxing/Kickboxing Text */}
                <div className="div1 mt-72 lg:mt-64 xl:mt-[400px]">
                    <span className='font-extrabold text-white text-5xl sm:text-6xl lg:text-7xl'>BOXING / KICK BOXING</span>
                </div>

                {/* Lower Content Section */}
                <div className="div2 mt-16 lg:mt-32 flex flex-col lg:flex-row justify-between items-center w-full px-5 md:px-10 lg:px-20">
                    {/* Left Section */}
                    <div className="div-1-1a flex flex-col justify-start items-start w-full lg:w-[600px] mb-8 lg:mb-0">
                        <div className="div-a flex justify-center items-center">
                            <span className='text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-400 mr-4'>////</span>
                            <span className='text-xl sm:text-2xl text-white font-thin pt-2'>Master Kickboxing with Expert Training</span>
                        </div>
                        <div className="div-b flex justify-start items-start mt-4 pl-14">
                            <span className=' text-customYellow text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-loose'>Kickboxing / Boxing <br />
                                Training Program in <br />
                                Pune, Baner</span>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="div-2-2a flex flex-col w-full lg:w-[400px]">
                        <span className='text-white text-sm sm:text-base md:text-sm font-thin'>
                            Discover the power and intensity of our Kickboxing Training Program at P-TownWest MMA in Pune, Baner. Designed for all skill levels, our program helps you master striking techniques, build endurance, and enhance your overall fitness under the guidance of our expert trainers.
                        </span>
                        <Button className='bg-customYellow text-black w-[150px] flex justify-center items-center gap-x-3 rounded-full mt-5 h-[30px] hover:bg-customYellow hover:cursor-pointer'>
                            Contact Us <MoveRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
