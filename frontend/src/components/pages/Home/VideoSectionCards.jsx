import React, { useState, useRef } from 'react';

function VideoSectionCards({ video, title, poster }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.error('Video playback failed:', error);
        });
      }
    }, 0);
  };

  return (
    <div className="video-card flex flex-col justify-center items-center p-4">
      {/* Video or Thumbnail Section */}
      <div className="video-thumbnail relative flex justify-center items-center lg:w-[300px] max-w-[310px] md:max-w-[450px]">
        {!isVideoPlaying ? (
          <div
            className="thumbnail-container relative cursor-pointer w-full"
            onClick={handlePlayVideo}
            aria-label={`Play ${title}`}
          >
            {/* Thumbnail passed as poster */}
            <img
              src={poster}
              alt={`Thumbnail for ${title}`}
              className="w-full h-auto object-cover rounded-lg"
            />

            {/* Play Button */}
            <button
              className="absolute inset-0 flex justify-center items-center"
              aria-label={`Play video: ${title}`}
            >
              <span className="bg-white rounded-full flex justify-center items-center h-12 w-12">
                <img
                  src="/images/Home/Trainings/polygon.png"
                  alt="Play icon"
                  className="h-6 w-6"
                />
              </span>
            </button>
          </div>
        ) : (
          <div className="video-container w-full aspect-w-16 aspect-h-9">
            <video
              className="rounded-lg w-full"
              controls
              autoPlay
              ref={videoRef}
              aria-label={`Playing video: ${title}`}
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      {/* Video Title */}
      <div className="mt-4 text-center">
        <span className="text-lg md:text-xl text-white font-medium">{title}</span>
      </div>
    </div>
  );
}

export default VideoSectionCards;
