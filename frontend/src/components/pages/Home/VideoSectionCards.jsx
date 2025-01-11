import React, { useState, useEffect, useRef } from 'react';

function VideoSectionCards({ video, title }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const videoRef = useRef(null);

  // Generate thumbnail from the video
  useEffect(() => {
    const generateThumbnail = () => {
      const videoElement = document.createElement('video');
      videoElement.src = video;

      videoElement.addEventListener('loadeddata', () => {
        // Seek to a specific timestamp (e.g., 2 seconds)
        videoElement.currentTime = 2;
      });

      videoElement.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const thumbnailURL = canvas.toDataURL('image/png');
        setThumbnail(thumbnailURL);
      });

      videoElement.load();
    };

    generateThumbnail();
  }, [video]);

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
            {/* Dynamically generated Thumbnail */}
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={`Thumbnail for ${title}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-56 bg-gray-700 flex items-center justify-center rounded-lg">
                <span className="text-gray-400">Loading Thumbnail...</span>
              </div>
            )}

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
