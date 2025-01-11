import React from 'react'
import BenefitCard from '../KickBoxing/BenefitCard'

function BenefitInfo() {
  return (
    <div className="main-div-container p-4 sm:p-8 md:p-12 lg:pl-40 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 h-auto  z-999 overflow-y-scroll mb-10">
            <BenefitCard
                title="Full-Body Workout"
                desc="Muay Thai engages every muscle group, combining cardio and strength training for improved endurance, flexibility, and overall fitness.
                "
            />
            <BenefitCard
                title="Effective Self-Defense"
                desc="Master striking techniques and defensive moves that are practical and applicable in real-life situations, boosting your confidence and safety.
                "
            />
            <BenefitCard
                title="Stress Relief and Mental Clarity"
                desc="The high-intensity nature of Muay Thai helps release endorphins, reduce stress, and improve focus, promoting better mental health.
                "
            />
            <BenefitCard
                title="Improved Discipline and Focus"
                desc="Training in Muay Thai requires consistency, discipline, and mental sharpness, which carry over into other areas of your life."
            />
            <BenefitCard
                title="Build Confidence and Resilience"
                desc="By overcoming physical challenges and learning new skills, Muay Thai helps you develop mental resilience and a sense of accomplishment."
            />
        </div>
  )
}

export default BenefitInfo
