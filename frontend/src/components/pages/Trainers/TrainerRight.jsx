import React from 'react'

function TrainerRight({img,name,role,desc}) {
    return (
        <>
            <div className="div-card-container flex md:flex-row flex-col-reverse  w-full items-center justify-between md:pl-20 mt-5">
                <div className="div-2 w-[80%] md:w-[50%] flex flex-col justify-start items-start lg:pt-20">
                    <div className="div-main flex flex-col justify-start items-start gap-y-2">
                        <span className='text-blue-800 font-semibold text-5xl'>{name}</span>
                        <span className='text-blue-800 font-semibold text-xs'>{role}</span>
                    </div>
                    <div className="div-2 mt-7 pr-5 text-start">
                        <span className='text-sm font-medium'>{desc}</span>
                    </div>
                </div>
                <img src={img} alt="image1" className='md:w-[45%] w-[80%]' />
            </div>
        </>
    )
}

export default TrainerRight
