import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

function Reviews() {
    const reviews = [
        {
            text: "The best sports experience in my life. This place has developed my game to a next level. Great coaches and facilities. The best time of my day is spent here. I train in the MMA pro batch and the training is really great and fun...",
            author: "-Aryan Sawant",
        },
        {
            text: "An excellent MMA class that offers a perfect balance of fitness, technique, and discipline. The instructors are highly skilled, patient, and ensure a safe yet challenging environment for all levels. Ideal for both beginners and seasoned fighters looking to hone their skills.",
            author: "-Akshay Gugnani",
        },
        {
            text: "I love going to ptown everyday I learn new stuff about MMA and Muay Thai . Just wonderful experience and friendly people around to help you all the time. I love the gym and has various facilities too. I am glad there is someone this passionate about martial arts",
            author: "-Rajat sharma",
        },
        {
            text: "P-Town West MMA offers top-notch facilities and a welcoming atmosphere. The kickboxing classes have pushed me to new limits, and I'm in the best shape of my life.",
            author: "-Kiran D.",
        },
        {
            text: "The best academy to train for MMA in Pune. I have been training here for over a year. They have the best coaches for boxing, Muay Thai, wrestling, and Jiu-Jitsu, with dedicated classes for people of every skill level (beginners, intermediate, and pros).",
            author: "-Vibhor Rajput",
        },
        {
            text: "Joining this club has been a transformative experience for me, both mentally and physically. It has pushed me to build discipline, resilience, and strength while improving my overall fitness. The supportive trainers and challenging sessions keep me motivated to grow every day. Thanks alot and Looking forward to continuing this journey!",
            author: "-Prasad Borse",
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
        <div className="div-main-container w-screen bg-white p-6 sm:p-10 md:p-20">
            {/* Title Section */}
            <div className="div-1 flex md:hidden justify-center items-center">
                <span className="text-black text-4xl md:text-4xl font-semibold text-center">WHAT <br />THEY SAY</span>
            </div>
            <div className="div-2 hidden md:flex flex-row justify-center md:justify-start items-center">
                <div className="mr-3">
                    <span className="text-gray-400 text-xl sm:text-2xl md:text-3xl font-semibold">////</span>
                </div>
                <div className='pt-1 flex justify-start items-center gap-x-5 '>
                    <span className="text-black text-4xl md:text-4xl font-semibold text-center">
                        WHAT THEY SAY
                    </span>
                    <div className="div-2 flex flex-row-reverse justify-start items-center">
                    <img src="https://static.vecteezy.com/system/resources/previews/013/948/549/non_2x/google-logo-on-transparent-white-background-free-vector.jpg" alt="" className='w-8 pt-2'/>
                    <span className='pt-2 text-xs font-semibold text-neutral-500'>Trusted by</span>
                    </div>
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
