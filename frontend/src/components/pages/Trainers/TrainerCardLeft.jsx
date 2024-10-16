import React from 'react'

function TrainerCardLeft({ img, name, role, desc }) {
    return (
        <>
            <div className="div-card-container flex flex-col md:flex-row w-full items-center justify-between md:pr-20">
                <img src={img} alt="image1" className='md:w-[45%] w-[80%]' />
                <div className="div-2 w-[80%]  md:w-[50%] flex flex-col md:justify-start md:items-start justify-center items-center lg:pt-20">
                    <div className="div-main flex flex-col justify-start items-start gap-y-2">
                        <span className='text-blue-800 font-semibold text-5xl'>{name}</span>
                        <span className='text-blue-800 font-semibold text-xs'>{role}</span>
                    </div>
                    <div className="div-2 w-screen md:w-auto mt-7 flex justify-center items-center text-start pl-10 md:pl-0 pr-5">
                        <span className='text-sm font-medium'>{desc}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrainerCardLeft
