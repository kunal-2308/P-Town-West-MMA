import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

function Reviews() {
    const reviews = [
        {
            text: "Training at P-TownWest MMA in Pune, Baner has been a life-changing experience. The expert coaches and comprehensive MMA programs have significantly improved my skills and fitness.",
            author: "-Rohit S.",
        },
        {
            text: "I joined the Muay Thai classes in Baner and am amazed by the progress I've made. The trainers are incredibly knowledgeable and supportive.",
            author: "-Priya M.",
        },
        {
            text: "The Brazilian Jiu-Jitsu classes have helped me immensely in improving my self-defense skills. The trainers are incredibly supportive, and the community is amazing.",
            author: "-Ankit P.",
        },
        {
            text: "P-Town West MMA offers top-notch facilities and a welcoming atmosphere. The kickboxing classes have pushed me to new limits, and I'm in the best shape of my life.",
            author: "-Kiran D.",
        },
        {
            text: "My kids love the children's martial arts program! The instructors are great with kids, and I've seen a huge boost in their confidence and discipline.",
            author: "-Neha T.",
        },
        {
            text: "The nutrition program at P-Town West MMA complements the physical training perfectly. It's been an invaluable resource for me in my fitness journey.",
            author: "-Siddharth R.",
        }
    ];

    const descriptions = "At P-TownWest MMA in Pune, Baner, we are dedicated to providing the best training in MMA, Muay Thai, Brazilian Jiu-Jitsu, kickboxing, and wrestling. Our expert coaches and state-of-the-art facilities offer an unparalleled training environment. Read our students' testimonials to see how they've achieved remarkable progress in their combat skills and fitness through our comprehensive programs."

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 2 : prevIndex - 2));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 2 >= reviews.length ? 0 : prevIndex + 2));
    };

    return (
        <div className="div-main-container  w-screen bg-white p-6 sm:p-10 md:p-20">
            {/* Title Section */}
            <div className="div-1 flex md:hidden justify-center items-center">
                <span className="text-black text-4xl md:text-4xl font-semibold text-center">WHAT <br />THEY SAY</span>
            </div>
            <div className="div-2 hidden md:flex flex-row justify-center md:justify-start items-center">
                <div className="mr-3">
                    <span className="text-gray-400 text-xl sm:text-2xl md:text-3xl font-semibold">////</span>
                </div>
                <div className='pt-1'>
                    <span className="text-black text-4xl md:text-4xl font-semibold text-center">
                        WHAT THEY SAY
                    </span>
                </div>
            </div>

            {/* Description Section */}
            <div className="div-2 flex flex-col md:flex-row justify-between items-center mt-8 pl-4 md:pl-14">
                <span className="w-full md:w-[700px] lg:w-[900px] text-xs md:text-base font-extralight transition-all duration-300 ease-in-out">
                    {descriptions}
                </span>
            </div>

            {/* Reviews Section */}
            <div className="div-review-container w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 md:mt-20">
                {/* First Review */}
                <div className="div-3 flex gap-x-5 transition-all duration-300 ease-in-out w-full px-4">
                    <img src="/images/Home/Trainings/up.png" alt="Review Icon" className="h-10 w-10 md:h-16 md:w-16" />
                    <div className="div-content flex flex-col w-full md:w-[400px] pt-4 md:pt-10">
                        <span className="text-sm md:text-base font-semibold transition-all duration-300 ease-in-out">
                            {reviews[currentIndex].text}
                        </span>
                        <span className="mt-4 md:mt-7 text-lg md:text-2xl font-semibold">
                            {reviews[currentIndex].author}
                        </span>
                    </div>
                </div>

                {/* Second Review */}
                {currentIndex + 1 < reviews.length && (
                    <div className="div-3 flex gap-x-5 transition-all duration-300 ease-in-out w-full px-4">
                        <img src="/images/Home/Trainings/up.png" alt="Review Icon" className="h-10 w-10 md:h-16 md:w-16" />
                        <div className="div-content flex flex-col w-full md:w-[400px] pt-4 md:pt-10">
                            <span className="text-sm md:text-base font-semibold transition-all duration-300 ease-in-out">
                                {reviews[currentIndex + 1].text}
                            </span>
                            <span className="mt-4 md:mt-7 text-lg md:text-2xl font-semibold">
                                {reviews[currentIndex + 1].author}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="div-3-a w-full flex justify-center items-center md:justify-end gap-3 mt-6 md:mt-7 md:pr-5">
                <span className="bg-black rounded-full p-2 cursor-pointer" onClick={handlePrevious}>
                    <ChevronLeft className="text-white" size="30px" />
                </span>
                <span className="bg-black rounded-full p-2 cursor-pointer" onClick={handleNext}>
                    <ChevronRight className="text-white" size="30px" />
                </span>
            </div>
        </div>
    );
}

export default Reviews;
