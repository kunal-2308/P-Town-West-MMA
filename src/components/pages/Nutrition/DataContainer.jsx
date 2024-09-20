import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import React from 'react'

function DataContainer() {
    return (
        <>
            <div className="div-main-container bg-white w-auto h-auto mb-12">
                <div className="div-content-title-container flex flex-col justify-start items-start lg:pl-48 lg:pt-8 lg:gap-y-10">
                    <div className="div-1-title lg:pt-10 lg:gap-x-2 flex lg:justify-start lg:items-center">
                        <span className='text-3xl font-semibold text-gray-300 mr-2'>////</span><span className='text-3xl font-semibold pt-1 pt-2'>Start Your Nutrition Journey Today!</span>
                    </div>
                    <div className="div-content-container lg:w-[65%] lg:text-start lg:pl-12">
                        <span className='font-semibold'>Transform your health and achieve your fitness goals with our comprehensive Nutrition Program at P-TOWN WEST MMA in Pune, Baner. Our expert nutritionists are here to guide you every step of the way, providing personalized plans and ongoing support to help you succeed. Contact us today to schedule your consultation and take the first step towards a healthier, happier you!</span>
                    </div>
                    <div className="div lg:pl-10">
                        <Button className='bg-customYellow text-black rounded-full w-[160px] hover:bg-customYellow hover:cursor-pointer'><span className='mr-3'>Contact Us</span><MoveRight></MoveRight></Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataContainer
