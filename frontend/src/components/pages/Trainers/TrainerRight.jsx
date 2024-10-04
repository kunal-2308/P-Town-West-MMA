import React from 'react'

function TrainerRight({img,name,role,desc}) {
    return (
        <>
            <div className="div-card-container flex w-full items-center justify-between pl-20">
                <div className="div-2  w-[50%] flex flex-col justify-start items-start lg:pt-20">
                    <div className="div-main flex flex-col justify-start items-start gap-y-2">
                        <span className='text-blue-800 font-semibold text-5xl'>{name}</span>
                        <span className='text-blue-800 font-semibold text-xs'>{role}</span>
                    </div>
                    <div className="div-2 mt-7">
                        <span className='text-sm font-medium'>{desc}</span>
                    </div>
                </div>
                <img src={img} alt="image1" className='w-[40%]' />
            </div>
        </>
    )
}

export default TrainerRight
