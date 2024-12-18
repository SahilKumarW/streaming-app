import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import VideoService from "../api/videoService";
import VideoPlayer from "../pages/VideoPlayer";

const MovieCard = ({ movie, section }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteVideoIds, setFavoriteVideoIds] = useState([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [watchDuration, setWatchDuration] = useState(0); // Store watch duration
  const userId = localStorage.getItem("userId");

  const videoRef = useRef(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isVideoModalOpen) {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isVideoModalOpen]);

  // Fetch favorite videos on mount
  useEffect(() => {
    const fetchFavoriteVideos = async () => {
      if (!userId) return;

      try {
        const response = await VideoService.getFavoriteVideos(userId);
        console.log("Favorite Videos Response:", response);

        // Ensure favoriteVideosData exists and is an array
        const favoriteData = response?.favoriteVideosData || [];
        console.log("Extracted favoriteData:", favoriteData);

        // Map videoMetaDataId into favoriteVideoIds
        const favoriteIds = favoriteData.map((fav) => fav.videoMetaDataId);
        console.log("Mapped Favorite IDs:", favoriteIds);

        // Update the state
        setFavoriteVideoIds(favoriteIds);
      } catch (error) {
        toast.error("Failed to fetch favorite videos.");
      }
    };

    fetchFavoriteVideos();
  }, [userId]);

  // Check if the current movie is favorited
  useEffect(() => {
    console.log("Favorite IDs:", favoriteVideoIds);
    console.log("Is Movie Favorited:", favoriteVideoIds.includes(movie.uuid));
    setIsFavorited(favoriteVideoIds.includes(movie.uuid));
  }, [favoriteVideoIds, movie.uuid]);

  // Handle play action
  const handlePlay = async () => {
    console.log("Movie Object:", movie);
    console.log("Card clicked, UUID:", movie.uuid); // Log the UUID of the card being clicked
    console.log(`Card clicked from section: ${section}`); // Log section info

    if (movie.url) {
      setVideoUrl(movie.url);
      setIsVideoModalOpen(true);
      setCurrentVideoId(movie.uuid);
      fetchWatchDuration(); // Fetch the user's watch history before starting

      const watchHistoryData = {
        id: movie.uuid,
        userId: userId,
        videoId: movie.uuid,
        vedioName: movie.name,
        watchedOn: new Date().toISOString(),
        watchDuration: 0,
        isCompleted: false,
      };

      if (!userId || !movie.uuid || !movie.name) {
        toast.error("Failed to record watch history. Missing required data.");
        return;
      }

      try {
        await VideoService.watchHistoryAdd(watchHistoryData);
      } catch (error) {
        toast.error("Failed to record watch history.");
      }
    } else {
      toast.error("No video URL found for this movie.");
    }
  };

  // Function to format duration in HH:MM:SS format
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600); // Get hours
    const minutes = Math.floor((seconds % 3600) / 60); // Get minutes
    const remainingSeconds = Math.floor(seconds % 60); // Get remaining seconds

    // Format as HH:MM:SS
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Fetch watch duration from user's history
  const fetchWatchDuration = async () => {
    if (!userId || !movie.uuid) return;

    try {
      const response = await VideoService.getUserWatchHistory(userId);
      const watchHistory = response?.data || [];
      const videoHistory = watchHistory.find((item) => item.videoId === movie.uuid);

      if (videoHistory) {
        const [hours, minutes, seconds] = videoHistory.watchDuration.split(":").map(Number);
        setWatchDuration(hours * 3600 + minutes * 60 + seconds); // Store duration in seconds
      } else {
        setWatchDuration(0); // If no history, start from 0
      }
    } catch (error) {
      console.error("Failed to fetch watch history:", error);
    }
  };

  // Helper to convert HH:MM:SS to seconds
  const convertToSeconds = (timeStr) => {
    const parts = timeStr.split(":").map(Number);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2]; // HH:MM:SS to seconds
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1]; // MM:SS to seconds
    }
    return 0; // Default to 0 seconds if invalid format
  };

  // Handle close modal action
  const handleCloseModal = async () => {
    setIsVideoModalOpen(false);
    setVideoUrl("");

    if (!currentVideoId || !userId) return;

    // Check if videoRef.current is not null and get the duration safely
    const videoElement = videoRef.current;
    const watchedDuration = videoElement ? videoElement.currentTime : 0;

    try {
      const response = await VideoService.getUserWatchHistory(userId);
      const watchHistory = response?.data || [];
      const videoHistory = watchHistory.find((item) => item.videoId === currentVideoId);

      if (videoHistory) {
        // Format the watchDuration as HH:MM:SS
        const formattedWatchDuration = formatDuration(watchedDuration);

        const watchHistoryUpdateData = {
          userId,
          videoId: currentVideoId,
          vedioName: movie.name,
          watchedOn: new Date().toISOString(),
          watchDuration: formattedWatchDuration, // Now in HH:MM:SS format
          isCompleted: watchedDuration === videoElement.duration,
        };

        // Print the entire request body to the console
        console.log("Request Body for Watch History Update:", watchHistoryUpdateData);

        // Proceed with updating the watch history
        await VideoService.watchHistoryUpdate(watchHistoryUpdateData, videoHistory.id);
      }
    } catch (error) {
      toast.error("Failed to update watch history.");
      console.error("Error while updating watch history:", error); // Log error for debugging
    } finally {
      setCurrentVideoId(null);
    }
  };

  // Handle favorite action
  const handleFavorite = async () => {
    if (!userId) {
      toast.error("You need to be logged in to manage favorites.");
      return;
    }

    const videoId = movie.uuid;

    try {
      if (!isFavorited) {
        await VideoService.addFavoriteVideo({ videoId, userId });
        setIsFavorited(true);
        setFavoriteVideoIds((prev) => [...prev, videoId]);
        toast.success(`${movie.name} added to your favorites!`);
      } else {
        // Remove from favorites
        await VideoService.removeFavoriteVideo({ videoId, userId });
        setIsFavorited(false);
        setFavoriteVideoIds((prev) => prev.filter((id) => id !== videoId));
        toast.info(`${movie.name} removed from your favorites.`);
      }
    } catch (error) {
      toast.error("Error updating favorites. Please try again.");
    }
  };

  // Handle rating action
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
      toast.error("There was an error rating the video. Please try again.");
    }
  };

  // Fetch average rating
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
      className="min-w-[calc(33.333%-1rem)] w-[calc(33.333%-1rem)] rounded-lg overflow-hidden relative flex-shrink-0"
    >
      <img
        src={movie.thumbnailUrl || movie.thumbnail?.thumbnailUrl || "fallback-image.jpg"}
        alt={movie.name || "Movie Thumbnail"}
        className="w-full h-[150px] object-cover rounded-lg cursor-pointer"
        onClick={handlePlay} // Thumbnail is clickable
      />
      <div className="p-4">
        <h3
          className="text-lg font-semibold text-white capitalize cursor-pointer"
          onClick={handlePlay} // Name is clickable
        >
          {movie.name || "Untitled Movie"}
        </h3>
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
            id={`favorite-${movie.uuid}`}
            onClick={handleFavorite}
            className={`cursor-pointer ${isFavorited ? "text-red-500" : "text-gray-400"}`}
          />
        </div>
        <p className="mt-1 text-sm text-gray-400">Average Rating: {averageRating}/5</p>
      </div>
      {section === "continueWatching" && movie.progress !== undefined && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-red-500"
          style={{ width: `${movie.progress}%` }}
        >
          <span className="text-white text-xs">{movie.progress}%</span>
        </div>
      )}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg relative w-[75%] h-[75%] max-w-[1200px] max-h-[800px] overflow-hidden">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <VideoPlayer
              src={videoUrl}
              startAt={watchDuration} // This will pass the watch duration to the VideoPlayer
              onClose={handleCloseModal}
              videoRef={videoRef}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
