import React from 'react'

function BenefitSection() {
    return (
        <>
            <div className='relative'>
                {/* Text Layer */}
                <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-end items-start md:justify-center md:items-start lg:items-center'>
                    <div className="div flex justify-start items-start flex-col pl-6 pb-5 md:pb-0 sm:pl-10 lg:pl-0 lg:text-center">
                        <span className='text-gray-700 text-3xl lg:text-6xl font-thin'>BENEFITS OF </span>
                        <span className='text-customYellow text-5xl lg:text-9xl font-bold leading-none'>KICKBOXING</span>
                    </div>
                </div>

                {/* Image Layer */}
                <img src="/images/Kickboxing/5.png" alt="Kickboxing" className='h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full object-cover' />
            </div>
        </>
    )
}

export default BenefitSection
