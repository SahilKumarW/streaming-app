import React, { useRef, useEffect } from "react";

const VideoPlayer = ({ src, watchDuration }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && watchDuration) {
      videoRef.current.currentTime = watchDuration; // Set video start time based on watchDuration
    }
  }, [watchDuration]);

  return (
    <video ref={videoRef} controls className="w-full h-full">
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
