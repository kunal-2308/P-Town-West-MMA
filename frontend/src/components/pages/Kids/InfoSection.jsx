import React from 'react'

function InfoSection() {
  return (
    <>
            <div className="div-1-title md:pt-10 pl-5 md:pl-40 gap-x-2 flex justify-start items-center">
                <span className='text-3xl font-semibold text-gray-300'>////</span><span className='text-xl font-semibold pt-6 md:pt-2'>Why Choose Our Kids Martial Arts Program?</span>
            </div>
            <div className="flex justify-center items-center p-4 lg:p-8">
                <div className="container flex flex-col md:flex-row justify-center items-center sm:gap-y-6 md:gap-x-4">
                    {/* Left Image */}
                    <div className="flex-shrink-0 w-full md:w-[40%]">
                        <img
                            src="/images/Kids/33.png"
                            alt="image"
                            className="h-[240px] sm:h-[300px] md:h-[360px] lg:h-[460px] xl:h-[430px] object-cover w-full rounded-lg"
                        />
                    </div>

                    {/* Text Sections */}
                    <div className="flex flex-col gap-y-3 w-full md:w-[50%]">
                        {/* First Content Block */}
                        <div className="bg-customYellow flex flex-col justify-center items-center w-auto md:w-[550px] h-auto rounded-lg p-4 md:p-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 mt-2 md:mt-0">
                            <div className="flex justify-start items-start flex-col gap-y-1 text-start px-4 sm:px-6 md:px-7">
                                <span className="font-semibold text-lg sm:text-xl md:text-2xl">Improve Physical Fitness <br />and Coordination</span>
                                <span className="font-medium text-xs sm:text-sm md:text-sm mt-2">
                                Our program emphasizes physical fitness, helping children improve their strength, flexibility, and coordination. Martial arts training involves a variety of movements that enhance motor skills and promote healthy physical development. Regular practice also helps kids stay active and maintain a healthy lifestyle.
                                </span>
                            </div>
                        </div>

                        {/* Second Content Block */}
                        <div className="bg-black text-white flex flex-col justify-center items-center w-auto md:w-[550px] h-auto rounded-lg p-4 md:p-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                            <div className="flex justify-center items-center flex-col gap-y-2 text-center px-4 sm:px-6 md:px-10">
                                <span className="font-semibold text-lg sm:text-xl md:text-2xl">Practical Self-Defense Skills</span>
                                <span className="font-light text-xs sm:text-sm md:text-sm mt-3">
                                Our Kids Martial Arts Program includes age-appropriate self-defense techniques. Children learn how to protect themselves in a safe and controlled environment. These skills not only enhance their physical safety but also give them the confidence to handle challenging situations responsibly.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default InfoSection
