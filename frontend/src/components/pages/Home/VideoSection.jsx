import React from 'react';
import VideoSectionCards from './VideoSectionCards';

const videos = [
    {
        video: '/videos/beginnerFriendly.mp4',
        title: 'Beginner Friendly Training',
    },
    {
        video: '/videos/muay_thai.mp4',
        title: 'Muay Thai Classes',
    },
    {
        video: '/videos/brazilian_jiu_jitsu.mp4',
        title: 'Brazilian Jiu-Jitsu',
    },
];

function VideoSection() {
    return (
        <div className="div-main-container bg-black p-8 sm:p-10 md:p-16">
            <div className="div-1-title flex justify-start items-center gap-x-3 ml-2 md:ml-20">
                <span className="font-semibold text-gray-400 text-2xl sm:text-3xl">////</span>
                <span className="md:text-3xl text-2xl text-white font-medium">LIFE@ P-TOWN MMA</span>
            </div>

            {/* Video or Thumbnail Section */}
            <div className="div mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
                {videos.map((video, index) => (
                    <VideoSectionCards key={index} video={video.video} title={video.title} />
                ))}
            </div>
        </div>
    );
}

export default VideoSection;
