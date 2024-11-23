import React, { useEffect, useRef } from "react";

const VideoPlayer = ({ src, startAt, onClose, videoRef }) => {
  useEffect(() => {
    if (videoRef.current) {
      console.log("StartAt:", startAt); // Log to verify
      if (!isNaN(startAt)) {
        videoRef.current.currentTime = startAt; // Set currentTime in seconds
      } else {
        videoRef.current.currentTime = 0; // Fallback to 0 if invalid
      }
    }
  }, [startAt, videoRef]);

  // Handle video end and pass watch duration
  const handleVideoEnded = () => {
    if (videoRef.current) {
      const watchDuration = videoRef.current.duration;
      onClose(watchDuration);
    }
  };

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      autoPlay
      className="w-full h-full"
      onEnded={handleVideoEnded}
    />
  );
};

export default VideoPlayer;
