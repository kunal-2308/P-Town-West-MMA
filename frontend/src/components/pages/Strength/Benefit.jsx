import React from 'react'
import BenefitCard from '../KickBoxing/BenefitCard'

function Benefit() {
  return (
    <div className="main-div-container p-4 sm:p-8 md:p-12 lg:pl-40 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 h-auto lg:pt-16 ">
            <BenefitCard
                title="Increase Muscle Strength and Endurance"
                desc="Develop robust muscular strength and endurance through structured resistance training, enabling you to perform daily activities more efficiently and excel in athletic pursuits.
                "
            />
            <BenefitCard
                title="Improve Cardiovascular Health"
                desc="Strengthen your heart and lungs through comprehensive cardio training, reducing the risk of heart disease and improving overall cardiovascular fitness."
            />
            <BenefitCard
                title="Enhance Athletic Performance"
                desc="Improve speed, power, agility, and coordination with targeted exercises designed to boost athletic performance across various sports and physical activities."
            />
            <BenefitCard
                title="Improve Posture and Mobility"
                desc="Correct muscle imbalances and improve posture through targeted exercises and mobility work, leading to better movement quality and reduced discomfort during daily activities."
            />
            <BenefitCard
                title="Boost Metabolism and Promote Weight Loss"
                desc="Engage in high-intensity workouts that elevate your metabolism, aiding in fat loss and helping you achieve and maintain a healthy body composition."
            />
            <BenefitCard
                title="Enhance Mental Well-being"
                desc="Experience improved mood, reduced stress levels, and increased confidence through regular physical activity and the accomplishment of fitness milestones."
            />
        </div>
  )
}

export default Benefit
