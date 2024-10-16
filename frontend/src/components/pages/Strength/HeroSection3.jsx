import React from 'react';

function HeroSection3() {
    return (
        <div className="bg-white pt-16 px-6 lg:px-20">
          
          <div className="flex items-center gap-4 mb-10">
            <span className="text-3xl font-semibold text-gray-300">////</span>
            <h2 className="text-2xl lg:text-4xl font-semibold text-gray-800">
              Why Choose Our Strength & Conditioning Program?
            </h2>
          </div>
    
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between lg:pl-16">
            
            <div className="lg:w-1/3 text-left lg:mt-4">
             
              <div className="mb-14">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
                  Expert Trainers With Proven Experience
                </h3>
                <p className="text-sm lg:text-base text-gray-600">
                  Our program is led by certified strength and conditioning specialists who bring years of experience in training individuals across various fitness levels. Our trainers employ evidence-based techniques and customized workout plans to ensure you progress safely and effectively towards your goals.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
                  Personalized Training Plans
                </h3>
                <p className="text-sm lg:text-base text-gray-600">
                  We understand that each individual has unique fitness objectives and capabilities. Our trainers conduct thorough assessments to create personalized training programs tailored to your specific needs, whether it's building muscle mass, improving endurance, enhancing athletic performance, or promoting weight loss.
                </p>
              </div>
            </div>
    
            <div className="lg:w-1/2 flex justify-center lg:justify-end pt-4">
              <img
                src="/images/Training/4.png"
                alt="Boxer"
                className="h-[300px] lg:h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      );
}

export default HeroSection3;
