import React from 'react';
import BenefitCard from './BenefitCard';

function BenefitInfo() {
    return (
        <div className="main-div-container p-4 sm:p-8 md:p-12 lg:pl-40 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 h-auto max-h-[600px] overflow-y-scroll z-[100] mb-10">
            <BenefitCard
                title="Increase Strength and Power"
                desc="Through a combination of striking techniques, bodyweight exercises, and resistance training, kickboxing helps build muscle and improve overall strength. You'll develop powerful legs, core, and upper body, enhancing your ability to deliver effective strikes."
            />
            <BenefitCard
                title="Enhance Coordination and Balance"
                desc="Kickboxing requires precise movements and control, which improves your coordination and balance. Practicing combinations of punches and kicks helps synchronize your body movements, making you more agile and balanced."
            />
            <BenefitCard
                title="Relieve Stress"
                desc="Kickboxing is a great stress reliever. The physical activity and focus required in training help reduce stress levels, release endorphins, and improve mental well-being. It's an effective way to channel your energy and emotions positively."
            />
            <BenefitCard
                title="Improve Self-Defense Skills"
                desc="Kickboxing teaches practical self-defense techniques. You'll learn how to defend yourself effectively, improving your confidence and preparedness in potentially dangerous situations."
            />
            <BenefitCard
                title="Burn Calories and Aid Weight Loss"
                desc="Kickboxing is an effective calorie-burning workout. The combination of high-intensity cardio and strength training helps you burn fat, build lean muscle, and achieve your weight loss goals."
            />
            <BenefitCard
                title="Increase Flexibility"
                desc="Kickboxing training includes various stretching exercises that improve flexibility. Enhanced flexibility reduces the risk of injuries and improves overall physical performance."
            />
        </div>
    );
}

export default BenefitInfo;
