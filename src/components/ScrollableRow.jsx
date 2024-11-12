import React, { useState, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";
import VideoService from "../api/videoService";

const ScrollableRow = ({ title, movies, loading }) => {
  const scrollRef = useRef(null);
  const [playingUrl, setPlayingUrl] = useState(null);

  const playVideo = (url) => {
    setPlayingUrl(url); // Set video URL to play
    document.body.style.overflow = "hidden"; // Prevent scrolling on the background
  };

  const closeVideo = () => {
    setPlayingUrl(null); // Close video modal
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
                index={index}
                playVideo={playVideo} // Pass the playVideo function to MovieCard
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

      {playingUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="w-full h-[90vh] max-w-5xl flex justify-center items-center relative overflow-hidden">
            <video className="w-full h-full object-contain" controls autoPlay>
              <source src={playingUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
