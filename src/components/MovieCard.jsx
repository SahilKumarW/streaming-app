import React, { useState, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import VideoService from "../api/videoService";

const MovieCard = ({ movie, index, playVideo, closeModal }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [watchDuration, setWatchDuration] = useState(0);

  const handlePlay = async () => {
    if (movie.url) {
      try {
        // Add to watch history when the video starts playing
        await VideoService.watchHistoryAdd({
          userWatchHistoryRequestDTO: {
            id: generateUniqueId(), // Implement or import a unique ID generator
            userId: localStorage.getItem("userId"),
            videoId: movie.uuid,
            vedioName: movie.name,
            watchedOn: new Date().toISOString(),
            watchDuration: 0, // Initial watch duration
            isCompleted: false,
          },
        });
        playVideo(movie.url); // Trigger modal play
      } catch (error) {
        console.error("Error adding to watch history:", error);
        toast.error("Failed to add to watch history. Please try again.");
      }
    }
  };

  const handleCloseModal = async () => {
    if (watchDuration < movie.totalDuration) {
      try {
        // Update watch history if video was partially watched
        await VideoService.watchHistoryUpdate({
          userWatchHistoryRequestDTO: {
            userId: localStorage.getItem("userId"),
            videoId: movie.uuid,
            watchDuration,
            isCompleted: false,
          },
        });
        toast.info("Watch history updated.");
      } catch (error) {
        console.error("Error updating watch history:", error);
        toast.error("Failed to update watch history.");
      }
    }
    closeModal(); // Close modal after handling
  };

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

  // Mock function to generate unique ID (use a library like uuid if needed)
  const generateUniqueId = () => `id-${Date.now()}`;

  return (
    <div
      key={index}
      className="min-w-[calc(33.333%-1rem)] w-[calc(33.333%-1rem)] rounded-lg overflow-hidden relative flex-shrink-0 cursor-pointer"
      onClick={handlePlay}
    >
      <img
        src={movie.thumbnail?.thumbnailUrl || movie.imageUrl}
        alt={movie.name}
        className="w-full h-[150px] object-cover rounded-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white capitalize">{movie.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className={`cursor-pointer ${hoverRating >= star || currentRating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
              />
            ))}
          </div>
          <FaHeart
            onClick={handleFavorite}
            className={`cursor-pointer ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
          />
        </div>
        <p className="mt-1 text-sm text-gray-400">Average Rating: {averageRating}/5</p>
      </div>
    </div>
  );
};

export default MovieCard;
