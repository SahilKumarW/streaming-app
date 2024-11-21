import React, { useState, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import VideoService from "../api/videoService";
import VideoPlayer from "../pages/VideoPlayer";

const MovieCard = ({ movie, section }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handlePlay = () => {
    if (movie.url) {
      setVideoUrl(movie.url);
      setIsVideoModalOpen(true);
    } else {
      toast.error("No video URL found for this movie.");
    }
  };

  const handleCloseModal = () => {
    setIsVideoModalOpen(false);
    setVideoUrl("");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (isVideoModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoModalOpen]);

  const handleFavorite = async () => {
    try {
      if (!isFavorited) {
        await VideoService.addFavoriteVideo({
          videoId: movie.uuid,
          userId: localStorage.getItem("userId"),
        });
        setIsFavorited(true);
        toast.success(`${movie.name} added to your favorites!`);
      } else {
        await VideoService.removeFavoriteVideo(movie.uuid);
        setIsFavorited(false);
        toast.info(`${movie.name} removed from your favorites.`);
      }
    } catch (error) {
      console.error("Error managing favorites:", error);
      toast.error("There was an error updating your favorites. Please try again.");
    }
  };

  const handleRating = async (newRating) => {
    const userRating = localStorage.getItem(`rating_${movie.uuid}`);
    const confirmRating = userRating
      ? window.confirm(`You have already rated this video ${userRating}/5. Do you want to update your rating to ${newRating}/5?`)
      : window.confirm(`Are you sure you want to rate this video ${newRating}/5? This cannot be undone.`);

    if (!confirmRating) return;

    try {
      await VideoService.rateVideo({
        videoId: movie.uuid,
        userId: localStorage.getItem("userId"),
        rating: newRating,
      });

      localStorage.setItem(`rating_${movie.uuid}`, newRating);
      setCurrentRating(newRating);

      const updatedAverageRating = await VideoService.getAverageRating(movie.uuid);
      setAverageRating(updatedAverageRating);
      localStorage.setItem(`avgRating_${movie.uuid}`, updatedAverageRating);

      toast.success(`You rated ${movie.name} ${newRating}/5 successfully!`);
    } catch (error) {
      console.error("Error rating video:", error);
      toast.error("There was an error rating the video. Please try again.");
    }
  };

  useEffect(() => {
    const fetchAverageRating = async () => {
      const cachedRating = localStorage.getItem(`avgRating_${movie.uuid}`);
      if (cachedRating) {
        setAverageRating(Number(cachedRating));
      } else {
        try {
          const avgRating = await VideoService.getAverageRating(movie.uuid);
          setAverageRating(avgRating);
          localStorage.setItem(`avgRating_${movie.uuid}`, avgRating);
        } catch (error) {
          console.error("Error fetching average rating:", error);
          toast.error("Failed to fetch the average rating.");
        }
      }
    };

    fetchAverageRating();

    const userRating = localStorage.getItem(`rating_${movie.uuid}`);
    if (userRating) {
      setCurrentRating(Number(userRating));
    }
  }, [movie.uuid]);

  return (
    <div
      key={movie.uuid}
      className="min-w-[calc(33.333%-1rem)] w-[calc(33.333%-1rem)] rounded-lg overflow-hidden relative flex-shrink-0 cursor-pointer"
      onClick={handlePlay}
    >
      <img
        src={movie.thumbnailUrl || movie.thumbnail?.thumbnailUrl || "fallback-image.jpg"}
        alt={movie.name || "Movie Thumbnail"}
        className="w-full h-[150px] object-cover rounded-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white capitalize">{movie.name || "Untitled Movie"}</h3>
        <div className="flex justify-between items-center mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className={`cursor-pointer ${hoverRating >= star || currentRating >= star ? "text-yellow-500" : "text-gray-400"}`}
              />
            ))}
          </div>
          <FaHeart
            onClick={handleFavorite}
            className={`cursor-pointer ${isFavorited ? "text-red-500" : "text-gray-400"}`}
          />
        </div>
        <p className="mt-1 text-sm text-gray-400">Average Rating: {averageRating}/5</p>
      </div>

      {/* Conditional Progress Bar based on the section */}
      {section === "continueWatching" && movie.progress !== undefined && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-red-500"
          style={{ width: `${movie.progress}%` }}
        >
          {/* Debugging log */}
          <span className="text-white text-xs">{movie.progress}%</span>
        </div>
      )}

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg relative w-[75%] h-[75%] max-w-[1200px] max-h-[800px]">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-black text-2xl"
            >
              &times;
            </button>
            <VideoPlayer src={videoUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
