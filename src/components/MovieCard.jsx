import React, { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import VideoService from "../api/videoService";
import VideoPlayer from "../pages/VideoPlayer"; // Import VideoPlayer component

const MovieCard = ({ movie, showProgress, index }) => {
  const [hoverRating, setHoverRating] = useState({});
  const [currentRating, setCurrentRating] = useState({});
  const [averageRating, setAverageRating] = useState(movie?.averageRating || 0);
  const [isPlaying, setIsPlaying] = useState(false); // State to manage playing status
  const [videoUrl, setVideoUrl] = useState(null); // Video URL state

  useEffect(() => {
    const userRating = localStorage.getItem(`rating_${movie.uuid}`);
    if (userRating) {
      setCurrentRating((prev) => ({ ...prev, [movie.uuid]: Number(userRating) }));
    }
  }, [movie.uuid]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleRating = async (movieId, rating) => {
    console.log("Rating video:", { movieId, rating });
    setCurrentRating((prev) => ({ ...prev, [movieId]: rating }));
    localStorage.setItem(`rating_${movieId}`, rating);

    try {
      await VideoService.rateVideo({
        videoId: movieId,
        userId: localStorage.getItem("userId"),
        rating,
      });
      console.log(`Rated video ${movieId} with ${rating} stars`);

      // Fetch the updated average rating from backend
      const updatedMovie = await VideoService.getVideoById(movieId); // Assuming getVideoById fetches the movie details
      setAverageRating(updatedMovie.averageRating);
    } catch (error) {
      console.error("Error rating video:", error);
    }
  };

  const handlePlay = () => {
    if (movie.url) {
      playVideo(movie.url); // Directly use movie.url to play
    } else {
      console.log("No video URL found for this movie.");
    }
  };

  const handleClose = (e) => {
    e.stopPropagation(); // Prevent bubbling
    console.log("Closing video player");
    setIsPlaying(false);
    setVideoUrl(null); // Clear video URL on close
  };

  return (
    <div
      key={index}
      className="min-w-[calc(33.333%-1rem)] w-[calc(33.333%-1rem)] rounded-lg overflow-hidden relative flex-shrink-0 cursor-pointer"
      onClick={handlePlay} // Make the card clickable to play video
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
            The chapter about {movie.name && movie.name.toLowerCase()} just wants to go out
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
            <span className="text-gray-300">
              {averageRating === 0 ? "No reviews" : `${averageRating}/5`}
            </span>
          </div>
          <p className="text-sm text-gray-400">{movie.description}</p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, starIndex) => (
              <FaStar
                key={starIndex}
                className={`cursor-pointer ${starIndex + 1 <= (hoverRating[movie.uuid] || currentRating[movie.uuid] || 0)
                  ? "text-yellow-400"
                  : "text-gray-400"
                  }`}
                onMouseEnter={() =>
                  setHoverRating((prev) => ({
                    ...prev,
                    [movie.uuid]: starIndex + 1,
                  }))
                }
                onMouseLeave={() =>
                  setHoverRating((prev) => ({
                    ...prev,
                    [movie.uuid]: currentRating[movie.uuid] || 0,
                  }))
                }
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering play on star click
                  handleRating(movie.uuid, starIndex + 1);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Video player modal */}
      {isPlaying && videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
          <div className="w-full max-w-2xl relative">
            <VideoPlayer src={videoUrl} /> {/* Use videoUrl for the source */}
            <button
              className="absolute top-4 right-4 text-white"
              onClick={handleClose} // Use handleClose function
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
