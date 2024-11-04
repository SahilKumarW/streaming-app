import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      // Create a Video.js player
      const player = videojs(videoElement, {
        controls: true,
        fluid: true,
        sources: [{ src, type: 'video/mp4' }] // Change MIME type to 'video/mp4'
      });

      playerRef.current = player;
    } else {
      // Update the source when it changes
      playerRef.current.src({ src, type: 'video/mp4' });
    }

    // Dispose the player on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default VideoPlayer;
