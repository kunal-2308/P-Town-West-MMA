import React from 'react';

function BenefitCard({ title, desc }) {
    return (
        <div className="div-card-container max-w-full sm:max-w-[530px] w-full h-auto flex flex-col p-4 rounded-lg bg-white">
            <span className='text-black text-lg sm:text-2xl font-semibold'>{title}</span>
            <span className='text-sm pt-4'>
                {desc}
            </span>
        </div>
    );
}

export default BenefitCard;
