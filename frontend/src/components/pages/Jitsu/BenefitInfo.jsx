import React from 'react'
import BenefitCard from '../KickBoxing/BenefitCard'

function BenefitInfo() {
  return (
    <div className="main-div-container p-4 sm:p-8 md:p-12 lg:pl-40 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 h-auto  z-999 overflow-y-scroll mb-10">
            <BenefitCard
                title="Enhance Cardiovascular Fitness"
                desc="Brazilian Jiu-Jitsu training sessions are physically demanding, helping you build exceptional cardiovascular endurance. The intense drills and sparring sessions increase your stamina and overall fitness level.
                "
            />
            <BenefitCard
                title="Increase Strength and Flexibility"
                desc="BJJ requires the use of almost every muscle group, which helps build strength and flexibility. Regular training improves your core strength, enhances your mobility, and reduces the risk of injuries.
                "
            />
            <BenefitCard
                title="Boost Self-Defense Skills"
                desc="BJJ is highly effective for self-defense. You'll learn how to protect yourself against larger or stronger opponents by using technique, leverage, and strategy. This makes BJJ an invaluable skill for real-world self-defense situations.
                "
            />
            <BenefitCard
                title="Relieve Stress and Improve Mental Health"
                desc="Engaging in BJJ is a great way to relieve stress. The focus required during training sessions helps clear your mind, and the physical exertion releases endorphins, improving your mood and mental well-being."
            />
            <BenefitCard
                title="Improve Ground Control and Grappling Skills"
                desc="BJJ is renowned for its focus on ground fighting and control. Through consistent practice, you'll learn how to dominate your opponent on the ground using leverage and technique rather than brute strength."
            />
        </div>
  )
}

export default BenefitInfo
