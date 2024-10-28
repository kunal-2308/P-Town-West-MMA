
function HeroSection() {
    return (
        <>

            <div className="relative hidden md:block w-full h-auto pt-16">
                <img src="/images/About/1.png" alt="image" className="w-full h-auto object-cover" />
                <div className="absolute top-44 w-full h-full flex flex-col justify-center items-center gap-y-6 lg:gap-y-10 px-4">

                    <div className="flex flex-col justify-start items-center text-center">
                        <span className="text-customYellow text-3xl lg:text-5xl font-light">
                            Welcome to
                        </span>
                        <span className="text-customYellow text-5xl lg:text-8xl font-semibold mt-2">
                            P-Town West MMA
                        </span>
                    </div>
                    <div className="text-white w-[85%] lg:w-[60%] text-center">
                        <span className="text-sm lg:text-base leading-relaxed">
                            Founded in 2018, P-Town West MMA stands as Pune's premier destination for authentic Mixed Martial Arts (MMA) training. As the city's first MMA academy, we pride ourselves on offering a comprehensive range of disciplines, including Boxing, Brazilian Jiu-Jitsu (BJJ), Muay Thai, and Judo. Our mission is to foster inclusivity and skill advancement at every level, welcoming beginners and seasoned practitioners alike to embark on a journey of exploration and growth in the vibrant world of martial arts.
                        </span>
                    </div>
                </div>
            </div>

            <div className="relative block md:hidden w-full h-auto pt-16">
                {/* Background Image */}
                <img src="/images/About/1.png" alt="image" className="w-full h-auto object-cover" />

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end items-start text-start p-5">
                    <div className="flex flex-col justify-start items-start">
                        <span className="text-customYellow text-3xl lg:text-5xl font-thin">
                            Welcome to
                        </span>
                        <span className="text-customYellow text-4xl lg:text-8xl font-medium">
                            P-Town West MMA
                        </span>
                    </div>
                </div>
            </div>
            <div className="div block md:hidden bg-black w-auto h-auto  pl-7 pr-7 pb-10 pt-5 -mt-2">
                <span className='text-white text-start font-extralight text-sm'>Founded in 2018, P-Town West MMA stands as Pune's premier destination for authentic Mixed Martial Arts (MMA) training. As the city's first MMA academy, we pride ourselves on offering a comprehensive range of disciplines, including Boxing, Brazilian Jiu-Jitsu (BJJ), Muay Thai, and Judo. Our mission is to foster inclusivity and skill advancement at every level, welcoming beginners and seasoned practitioners alike to embark on a journey of exploration and growth in the vibrant world of martial arts.
                </span>
            </div>



        </>
    );
}

export default HeroSection;
