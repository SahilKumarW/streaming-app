import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import httpSourceSelector from "videojs-http-source-selector";
import VideoService from "../api/videoService"; // Import the video service

// Register the plugin with Video.js
videojs.registerPlugin("httpSourceSelector", httpSourceSelector);

const VideoPlayer = ({ videoId }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [videoSources, setVideoSources] = useState([]);
  const [poster, setPoster] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    setIsMounted(true);

    // Fetch video data by ID
    const fetchVideoById = async (id) => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Reset error state before fetch
      try {
        const response = await VideoService.getVideoById(id);
        const videoData = response.data;

        // Assuming the API response contains 'sources' (an array of video sources) and 'poster'
        setVideoSources(videoData.sources || []);
        setPoster(videoData.poster || "");
      } catch (error) {
        console.error("Error fetching video by ID:", error);
        setError("Failed to load video. Please try again."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (videoId) {
      fetchVideoById(videoId);
    }

    if (isMounted && videoRef.current && videoSources.length > 0) {
      playerRef.current = videojs(
        videoRef.current,
        {
          autoplay: false,
          controls: true,
          responsive: true,
          fluid: true,
          controlBar: {
            children: [
              "playToggle",
              "volumePanel",
              "currentTimeDisplay",
              "timeDivider",
              "durationDisplay",
              "progressControl",
              "liveDisplay",
              "seekToLive",
              "remainingTimeDisplay",
              "customControlSpacer",
              "playbackRateMenuButton",
              "chaptersButton",
              "descriptionsButton",
              "subsCapsButton",
              "audioTrackButton",
              "fullscreenToggle",
              "httpSourceSelector", // Quality selection button
            ],
          },
          sources: videoSources, // Set dynamic video sources
          poster: poster, // Set dynamic poster
        },
        () => {
          console.log("Player is ready");
        }
      );

      // Creating a forward button
      const Button = videojs.getComponent("Button");
      class ForwardButton extends Button {
        constructor(player, options) {
          super(player, options);
          this.controlText("Forward 10s");
          this.addClass("vjs-forward-button");
        }

        handleClick() {
          const currentTime = playerRef.current.currentTime();
          playerRef.current.currentTime(currentTime + 10);
        }
      }

      // Creating a rewind button
      class RewindButton extends Button {
        constructor(player, options) {
          super(player, options);
          this.controlText("Rewind 10s");
          this.addClass("vjs-rewind-button");
        }

        handleClick() {
          const currentTime = playerRef.current.currentTime();
          playerRef.current.currentTime(Math.max(0, currentTime - 10));
        }
      }

      // Registering the custom buttons
      videojs.registerComponent("ForwardButton", ForwardButton);
      videojs.registerComponent("RewindButton", RewindButton);

      // Add the buttons to the control bar
      playerRef.current.getChild("controlBar").addChild("RewindButton", {}, 1);
      playerRef.current.getChild("controlBar").addChild("ForwardButton", {}, 2);

      // Initialize the HTTP Source Selector plugin
      playerRef.current.httpSourceSelector();

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          console.log("Player disposed");
        }
      };
    }
  }, [isMounted, videoId, videoSources, poster]);

  return (
    <div>
      <h2>Video Player Component</h2>
      {loading ? (
        <p>Loading...</p> // Show loading state
      ) : error ? (
        <p>{error}</p> // Show error message if any
      ) : (
        <div data-vjs-player>
          {isMounted && (
            <video ref={videoRef} className="video-js vjs-big-play-centered" />
          )}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
