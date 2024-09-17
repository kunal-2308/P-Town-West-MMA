import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className="w-full overflow-x-hidden">
                <div className="bg-white lg:h-[100px] h-auto flex justify-between items-center px-6 lg:px-20 w-full">
                    <div className="flex items-center">
                        <div className="logo">
                            <img src='public/images/logo/mainLogo.png' alt='logo' className='h-16 lg:h-20' />
                        </div>
                        <div className="hidden lg:block ml-6 lg:ml-10">
                            <ul className='flex space-x-4 lg:space-x-8 items-center'>
                                <li className="hover:cursor-pointer font-semibold text-sm lg:text-base"><Link to='/'>Home</Link></li>
                                <li className="hover:cursor-pointer font-semibold text-sm lg:text-base"><Link to='/training/programs'>Training Programs</Link></li>
                                <li className="hover:cursor-pointer font-semibold text-sm lg:text-base"><Link to='/trainer'>Our Trainers</Link></li>
                                <li className="hover:cursor-pointer font-semibold text-sm lg:text-base"><Link to='/about'>About Us</Link></li>
                                <li className="hover:cursor-pointer font-semibold text-sm lg:text-base"><Link to='/schedule'>Class Schedule</Link></li>
                                <li className="hover:cursor-pointer font-semibold text-sm lg:text-base"><Link to='/contact'>Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mr-6 lg:mr-9">
                        <Button className='bg-customYellow text-black hover:bg-customYellow rounded-full font-medium text-sm lg:text-base'>
                            Book a Free Trial Class
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="block lg:hidden px-6">
                    <ul className="flex flex-col space-y-4 items-center mt-4">
                        <li className="hover:cursor-pointer font-semibold text-sm"><Link to='/'>Home</Link></li>
                        <li className="hover:cursor-pointer font-semibold text-sm"><Link to='/training/programs'>Training Programs</Link></li>
                        <li className="hover:cursor-pointer font-semibold text-sm"><Link to='/trainer'>Our Trainers</Link></li>
                        <li className="hover:cursor-pointer font-semibold text-sm"><Link to='/about'>About Us</Link></li>
                        <li className="hover:cursor-pointer font-semibold text-sm"><Link to='/schedule'>Class Schedule</Link></li>
                        <li className="hover:cursor-pointer font-semibold text-sm"><Link to='/contact'>Contact Us</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
