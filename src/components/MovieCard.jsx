import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import VideoService from "../api/videoService";

const MovieCard = ({ movie, showProgress, index }) => {
  const [hoverRating, setHoverRating] = useState({});
  const [currentRating, setCurrentRating] = useState({});

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleRating = async (movieId, rating) => {
    console.log("Rating video:", { movieId, rating }); // Debugging line
    setCurrentRating((prev) => ({ ...prev, [movieId]: rating }));
    try {
      await VideoService.rateVideo({
        videoId: movieId,
        userId: localStorage.getItem("userId"), // Ensure userId is included
        rating,
      });
      console.log(`Rated video ${movieId} with ${rating} stars`);
    } catch (error) {
      console.error("Error rating video:", error);
    }
  };

  return (
    <div
      key={index}
      className="min-w-[calc(33.333%-1rem)] w-[calc(33.333%-1rem)] rounded-lg overflow-hidden relative flex-shrink-0"
    >
      <img
        src={movie.imageUrl}
        alt={movie.name}
        className="w-full h-[150px] object-cover rounded-lg"
      />
      {showProgress ? (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-lg font-semibold text-white capitalize mb-2">
            {`Chapter ${index + 1}`}
          </h3>
          <p className="text-sm text-gray-300 mb-2">
            The chapter about {movie.name && movie.name.toLowerCase()} just want to go out
            from his palace to get freedom...
          </p>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{formatTime(movie.progress * 1.2)}</span>
            <span>{formatTime(120)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div
              className="bg-green-500 h-1 rounded-full"
              style={{ width: `${movie.progress}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white capitalize mb-2">
            {movie.name}
          </h3>
          <div className="flex items-center mb-2">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-gray-300">{movie.rating || "N/A"}</span>
          </div>
          <p className="text-sm text-gray-400">{movie.description}</p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, starIndex) => (
              <FaStar
                key={starIndex}
                className={`cursor-pointer ${starIndex + 1 <= (hoverRating[movie.id] || currentRating[movie.id] || 0)
                  ? "text-yellow-400"
                  : "text-gray-400"
                  }`}
                onMouseEnter={() =>
                  setHoverRating((prev) => ({
                    ...prev,
                    [movie.id]: starIndex + 1,
                  }))
                }
                onMouseLeave={() =>
                  setHoverRating((prev) => ({
                    ...prev,
                    [movie.id]: currentRating[movie.id] || 0,
                  }))
                }
                onClick={() => handleRating(movie.id, starIndex + 1)} // Use movie.id here
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
