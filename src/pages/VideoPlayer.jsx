import React, { useEffect, useRef } from "react";

const VideoPlayer = ({ src, startAt }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && startAt) {
      videoRef.current.currentTime = parseDuration(startAt);
    }
  }, [startAt]);

  const parseDuration = (duration) => {
    // Convert duration in "HH:MM:SS" or "MM:SS" to seconds
    const parts = duration.split(":").map(Number);
    return parts.length === 3
      ? parts[0] * 3600 + parts[1] * 60 + parts[2]
      : parts[0] * 60 + parts[1];
  };

  return (
    <video ref={videoRef} src={src} controls autoPlay className="w-full h-full" />
  );
};

export default VideoPlayer;
