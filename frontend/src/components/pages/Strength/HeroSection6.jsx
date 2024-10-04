import React from 'react'

function HeroSection6() {
  return (
    <>
    <div className='relative'>
        {/* Text Layer */}
        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start lg:items-center'>
            <div className="div flex justify-start items-start flex-col lg:mr-20  lg:text-start lg:gap-y-4">
                <span className='text-gray-700 text-4xl sm:text-5xl lg:text-6xl font-thin'>BENEFITS OF </span>
                <span className='text-customYellow text-6xl sm:text-7xl lg:text-7xl font-bold leading-loose'>OUR STRENGTH & </span><span className='text-customYellow text-6xl sm:text-7xl lg:text-7xl font-bold'> CONDITIONING PROGRAM</span>
            </div>
        </div>

        {/* Image Layer */}
        <img src="public/images/Training/7.png" alt="Lifting" className='h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full object-cover' />
    </div>
</>
  )
}

export default HeroSection6
