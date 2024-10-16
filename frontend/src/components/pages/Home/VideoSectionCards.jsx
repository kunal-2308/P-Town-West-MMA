import React, { useState } from 'react';

function VideoSectionCards({ thumbnail, video, title }) {
  // State to track whether the video has been clicked
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Function to handle button click to play video
  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <>
      <div className="div-main flex flex-col justify-center items-center p-4">
        {/* Video or Thumbnail */}
        <div className="div-2-video-section relative flex justify-center items-center lg:w-[300px] max-w-[310px] md:max-w-[450px]">
          {/* Conditionally render the iframe or the thumbnail */}
          {!isVideoPlaying ? (
            <div className="relative cursor-pointer w-full" onClick={handlePlayVideo}>
              {/* Thumbnail Image */}
              <img
                src={thumbnail} // Use the passed thumbnail prop
                alt="Video Thumbnail"
                className="w-full h-auto object-cover rounded-lg"
              />

              {/* Play Button */}
              <button className="absolute inset-0 flex justify-center items-center">
                <span className="bg-white rounded-full flex justify-center items-center h-12 w-12">
                  <img src="/images/Home/Trainings/polygon.png" alt="arrowhead" className="h-6 w-6" />
                </span>
              </button>
            </div>
          ) : (
            <div className="w-full aspect-w-16 aspect-h-9">
              <iframe
                src={`${video}?autoplay=1`} // Dynamically use video prop for the video URL
                width="100%"
                height="100%"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={title}
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          )}
        </div>

        {/* Video Title */}
        <div className="mt-4 text-center">
          <span className="text-lg md:text-xl text-white font-medium">{title}</span>
        </div>
      </div>
    </>
  );
}

export default VideoSectionCards;
