import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection2() {
    return (
        <>
            <div className="flex items-center justify-center w-full">
                <div
                    className="
                      w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[600px]
                      bg-cover bg-center flex items-center justify-start
                      px-8 sm:px-16 lg:px-40 gap-6 lg:gap-20"
                    style={{ backgroundImage: `url('public/images/Home/Trainings/30.png')` }}
                >
                    <div className="flex flex-col ml-4 sm:ml-10 justify-start items-start">
                        <div className="flex items-center">
                            <span className='font-medium text-xl sm:text-2xl lg:text-4xl text-gray-400 mr-3'>////</span>
                            <span className='font-semibold text-2xl sm:text-4xl lg:text-4xl text-white'>WELCOME TO</span>
                        </div>
                        <div>
                            <span className="text-5xl sm:text-7xl lg:text-8xl font-semibold text-customYellow">P-TOWN</span>
                        </div>
                        <div>
                            <span className="text-5xl sm:text-7xl lg:text-8xl font-semibold text-customYellow">WEST MMA</span>
                        </div>
                    </div>

                    <div className="mt-20 lg:mt-40 min-w-max">
                        <Button className='bg-customYellow text-black hover:bg-customYellow rounded-full flex justify-center items-center px-6 py-2 sm:px-8 lg:px-10 lg:py-4'>
                            <Link to='/contact' className='flex justify-center items-center font-semibold text-sm sm:text-base lg:text-base'>
                                Contact Us
                                <MoveRight className='ml-2' />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection2;
