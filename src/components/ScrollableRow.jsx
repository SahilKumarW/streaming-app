import React, { useState, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";
import VideoService from "../api/videoService"; // Ensure VideoService is imported

const ScrollableRow = ({ title, movies = [], loading }) => {
  const scrollRef = useRef(null);
  const [playingVideo, setPlayingVideo] = useState(null); // Store selected video details

  // Play video with watch duration
  const playVideo = async (movie) => {
    console.log("Playing movie:", movie.name); // Debugging log

    // Fetch watch duration from user history
    try {
      const response = await VideoService.getUserWatchHistory(localStorage.getItem("userId"));
      const watchHistory = response?.data || [];
      const videoHistory = watchHistory.find((item) => item.videoId === movie.uuid);

      let watchDuration = 0;
      if (videoHistory) {
        // Convert watchDuration from HH:MM:SS to seconds
        const [hours, minutes, seconds] = videoHistory.watchDuration.split(":").map(Number);
        watchDuration = hours * 3600 + minutes * 60 + seconds;
      }

      setPlayingVideo({
        url: movie.url,
        watchDuration: watchDuration, // Set the fetched watchDuration
      });
      document.body.style.overflow = "hidden"; // Prevent scrolling on the background
    } catch (error) {
      console.error("Error fetching watch history:", error);
    }
  };

  const closeVideo = () => {
    setPlayingVideo(null); // Close video modal
    document.body.style.overflow = "auto"; // Enable scrolling on the background
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth;
      current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="mb-8 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold">{title}</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <ClipLoader color={"#fff"} loading={true} size={50} />
        </div>
      ) : (
        <div className="relative">
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide">
            {movies.map((movie, index) => (
              <MovieCard
                key={movie.uuid}
                movie={movie}
                section={title === "Continue Watching" ? "continueWatching" : ""} // Dynamically pass section
                index={index}
                playVideo={() => playVideo(movie)} // Pass the playVideo function with movie details
              />
            ))}
          </div>

          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10" onClick={() => scroll("left")}>
            <FaChevronLeft className="text-white text-4xl" />
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10" onClick={() => scroll("right")}>
            <FaChevronRight className="text-white text-4xl" />
          </div>
        </div>
      )}

      {/* Show VideoPlayer if a video is selected */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="w-full h-[90vh] max-w-5xl flex justify-center items-center relative overflow-hidden">
            <VideoPlayer
              src={playingVideo.url}
              watchDuration={playingVideo.watchDuration} // Pass watchDuration
            />
            <button onClick={closeVideo} className="absolute top-4 right-4 text-white text-4xl">
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrollableRow;
