import React from 'react';
import VideoSectionCards from './VideoSectionCards';

function VideoSection() {
    return (
        <>
            <div className="div-main-container bg-black p-8 sm:p-10 md:p-16">
                <div className="div-1-title flex justify-start items-center gap-x-3 ml-2 md:ml-20">
                    <span className='font-semibold text-gray-400 text-2xl sm:text-3xl'>////</span>
                    <span className='md:text-3xl text-2xl text-white font-medium'>LIFE@ P-TOWN MMA</span>
                </div>

                {/* Video or Thumbnail Section */}
                <div className="div mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                    {/* Video Section Cards */}
                    <VideoSectionCards 
                      thumbnail="/images/Home/Trainings/12.png" 
                      video="https://www.youtube.com/watch?v=8-aI8Fp2bPU&pp=ygUUbW1hIHRyYWluaW5nIGF0IGhvbWU%3D" 
                      title="Beginner Friendly Training" 
                    />
                    <VideoSectionCards 
                      thumbnail="/images/Home/Trainings/13.png" 
                      video="https://www.youtube.com/watch?v=8-aI8Fp2bPU&pp=ygUUbW1hIHRyYWluaW5nIGF0IGhvbWU%3D" 
                      title="Muay Thai Classes" 
                    />
                    <VideoSectionCards 
                      thumbnail="/images/Home/Trainings/14.png" 
                      video="https://www.youtube.com/watch?v=8-aI8Fp2bPU&pp=ygUUbW1hIHRyYWluaW5nIGF0IGhvbWU%3D" 
                      title="Brazilian Jiu-Jitsu" 
                    />
                </div>
            </div>
        </>
    );
}

export default VideoSection;
