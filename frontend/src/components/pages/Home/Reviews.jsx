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
    ];

    const descriptions = [
        "At P-TownWest MMA in Pune, Baner, we are dedicated to providing the best training in MMA, Muay Thai, Brazilian Jiu-Jitsu, kickboxing, and wrestling. Our expert coaches and state-of-the-art facilities offer an unparalleled training environment. Read our students' testimonials to see how they've achieved remarkable progress in their combat skills and fitness through our comprehensive programs.",
        "Our students come from diverse backgrounds, and they all have one thing in common - they leave stronger and more confident. See how our programs have helped them on their journey.",
        "Join the ever-growing P-TownWest MMA community in Baner and start your transformation. Read more testimonials to see the impact of our training."
    ];


    const [currentIndex, setCurrentIndex] = useState(0);


    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
    };


    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="div-main-container  w-screen bg-white p-6 sm:p-10 md:p-20">
            {/* Title Section */}
            <div className="div-1 flex md:hidden  justify-center items-center">
                <span className="text-black text-4xl md:text-4xl font-semibold text-center">WHAT <br />THEY SAY</span>
            </div>
            <div className="div-2 hidden md:flex flex-row  justify-center md:justify-start items-center">
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
                    {descriptions[currentIndex]}
                </span>
                <div className="div-3-a flex justify-center items-center gap-3 mt-10 md:mt-0">
                    <span className="bg-black rounded-full p-2 cursor-pointer" onClick={handlePrevious}>
                        <ChevronLeft className="text-white" size="30px" />
                    </span>
                    <span className="bg-black rounded-full p-2 cursor-pointer" onClick={handleNext}>
                        <ChevronRight className="text-white" size="30px" />
                    </span>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="div-review-container flex flex-col md:flex-row justify-center items-center mt-12 md:mt-20 gap-10 md:gap-x-32">
                <div className="div-3 flex gap-x-5 transition-all duration-300 ease-in-out">
                    <img src="/images/Home/Trainings/up.png" alt="Review Icon" className="h-10 w-10 md:h-16 md:w-16" />
                    <div className="div-content flex flex-col w-full md:w-[400px] pt-4 md:pt-10">
                        <span className="text-sm md:text-base font-semibold transition-all duration-300 ease-in-out">
                            {reviews[0].text}
                        </span>
                        <span className="mt-4 md:mt-7 text-lg md:text-2xl font-semibold">
                            {reviews[0].author}
                        </span>
                    </div>
                </div>
                <div className="div-3 flex gap-x-5 transition-all duration-300 ease-in-out">
                    <img src="/images/Home/Trainings/up.png" alt="Review Icon" className="h-10 w-10 md:h-16 md:w-16" />
                    <div className="div-content flex flex-col w-full md:w-[400px] pt-4 md:pt-10">
                        <span className="text-sm md:text-base font-semibold transition-all duration-300 ease-in-out">
                            {reviews[1].text}
                        </span>
                        <span className="mt-4 md:mt-7 text-lg md:text-2xl font-semibold">
                            {reviews[1].author}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reviews;
