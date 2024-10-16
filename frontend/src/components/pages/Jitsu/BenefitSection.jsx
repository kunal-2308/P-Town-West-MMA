import React from 'react';

function BenefitSection() {
    return (
        <>
            <div className='relative'>
                {/* Text Layer */}
                <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start lg:items-center px-6 sm:px-10 lg:px-0'>
                    <div className="flex justify-start items-start lg:items-start flex-col lg:text-center">
                        <span className='text-white/40 text-4xl sm:text-5xl lg:text-6xl font-thin'>
                            BENEFITS OF 
                        </span>
                        <span className='text-customYellow text-6xl sm:text-7xl lg:text-9xl font-bold leading-none'>
                            JIU-JITSU GI
                        </span>
                    </div>
                </div>

                {/* Image Layer */}
                <img
                    src="/images/Kickboxing/10.png"
                    alt="jiu-jitsu"
                    className='h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full object-cover'
                />
            </div>
        </>
    );
}

export default BenefitSection;
