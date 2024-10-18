import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import httpSourceSelector from "videojs-http-source-selector";

// Register the plugin with Video.js
videojs.registerPlugin("httpSourceSelector", httpSourceSelector);

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (isMounted && videoRef.current) {
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
          sources: [
            {
              src: "https://www.w3schools.com/html/mov_bbb.mp4", // Dummy high-quality video
              type: "video/mp4",
              label: "1080p",
            },
            {
              src: "https://www.w3schools.com/html/movie.mp4", // Dummy medium-quality video
              type: "video/mp4",
              label: "720p",
            },
            {
              src: "https://www.w3schools.com/html/mov_bbb.mp4", // Dummy low-quality video (same as 1080p for example purposes)
              type: "video/mp4",
              label: "480p",
            },
          ],
          poster: "https://vjs.zencdn.net/v/oceans.png",
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
  }, [isMounted]);

  return (
    <div>
      <p>Video Player Component</p>
      <div data-vjs-player>
        {isMounted && (
          <video ref={videoRef} className="video-js vjs-big-play-centered" />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
