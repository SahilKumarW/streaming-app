import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ScrollableRow from "../components/ScrollableRow";
import VideoService from "../api/videoService";
import Footer from "../components/Footer";
import myListImage from "../assets/MyList.png";
import MovieCard from "../components/MovieCard"; // Import MovieCard component

const MyList = () => {
  const [myListMovies, setMyListMovies] = useState([]);
  const [loading, setLoading] = useState({
    myList: true,
  });
  const userId = localStorage.getItem("userId"); // Get user ID from localStorage

  const transformFavoriteVideos = (favoriteVideosData) => {
    return favoriteVideosData.map((video) => ({
      uuid: video.favortieVideoId,       // Unique ID for the movie
      name: video.videoName,             // Movie name
      thumbnailUrl: video.thumbnail?.thumbnailUrl || 'default-thumbnail.jpg', // Thumbnail URL or default image
      isFavorited: true,                  // All videos are favorites in this list, set to true
      url: video.url,                    // Add the URL for the video
      videoMetaDataId: video.videoMetaDataId, // Add the videoMetaDataId for rating fetching
    }));
  };


  // Fetch average ratings for each movie
  const fetchAverageRating = async (videoMetaDataId) => {
    try {
      // Fetch the average rating for the video
      const response = await VideoService.getAverageRating(videoMetaDataId, userId);

      // Log the response to check its structure
      console.log("Average Rating Response:", response);

      // Check if response and data are present, and safely access averageRating
      const averageRating = response?.data?.averageRating;

      if (isNaN(averageRating)) {
        console.error(`Invalid rating value for videoMetaDataId ${videoMetaDataId}:`, averageRating);
        return 0; // Fallback to 0 if averageRating is invalid
      }

      return averageRating || 0; // Use 0 if averageRating is not available
    } catch (error) {
      console.error("Error fetching average rating:", error);
      return 0; // Fallback to 0 if there's an error
    }
  };

  const handleFavoriteToggle = async (movieId) => {
    try {
      const updatedMovies = myListMovies.map((movie) => {
        if (movie.uuid === movieId) {
          // Toggle the favorited state
          movie.isFavorited = !movie.isFavorited;
        }
        return movie;
      });

      setMyListMovies(updatedMovies); // Update state with toggled favorites

      const userId = localStorage.getItem("userId");
      if (updatedMovies.find((movie) => movie.uuid === movieId).isFavorited) {
        await VideoService.addFavoriteVideo({ videoId: movieId, userId });
        toast.success("Added to favorites!");
      } else {
        await VideoService.removeFavoriteVideo({ videoId: movieId, userId });
        toast.info("Removed from favorites.");
      }
    } catch (error) {
      toast.error("Failed to update favorites. Please try again.");
      console.error(error);
    }
  };

  // Handle video play and update watch history
  const handlePlayVideo = async (movie) => {
    try {
      // Check if the video is already in the watch history
      const watchHistoryResponse = await VideoService.getWatchHistory(userId, movie.uuid);

      if (!watchHistoryResponse) {
        // Add to watch history if not present
        await VideoService.addWatchHistory({
          userWatchHistoryRequestDTO: {
            userId,
            videoId: movie.uuid,
            vedioName: movie.name,
            watchedOn: new Date().toISOString(),
            watchDuration: 0, // Initially set to 0
            isCompleted: false, // Update this later based on video completion
          }
        });
      } else {
        // If it's already in the history, update it
        await VideoService.updateWatchHistory({
          userWatchHistoryRequestDTO: {
            userId,
            videoId: movie.uuid,
            vedioName: movie.name,
            watchedOn: new Date().toISOString(),
            watchDuration: 0, // You can calculate this if needed
            isCompleted: false, // Set to true when the video is fully watched
          }
        });
      }

      // Here you would also trigger the video play functionality, e.g., open modal, etc.
    } catch (error) {
      console.error("Error updating watch history:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading({ myList: true });

        // Fetch the user's favorite video list from the backend
        const myListResponse = await VideoService.getFavoriteVideos(userId);
        console.log('My List response:', myListResponse);

        // Transform favorite videos data
        const transformedMovies = transformFavoriteVideos(myListResponse?.favoriteVideosData || []);

        // Fetch average ratings for each movie
        const moviesWithRatings = await Promise.all(
          transformedMovies.map(async (movie) => {
            const averageRating = await fetchAverageRating(movie.videoMetaDataId);
            return { ...movie, averageRating }; // Add averageRating to movie object
          })
        );

        setMyListMovies(moviesWithRatings); // Set the transformed data with ratings to the state

      } catch (error) {
        console.error("Error fetching favorite videos:", error);
        setMyListMovies([]); // Fallback to an empty array if there's an error
      } finally {
        setLoading({ myList: false });
      }
    };

    fetchData();
  }, [userId]); // Re-run the effect when userId changes

  return (
    <>
      <HeroSection
        backgroundImage={myListImage}
        Movie="Series"
        movieTitle="Top Gun Maverick"
        subTitle="2022. Action. Drama"
        button1Text="Watch Now"
        button2Text="Remove from List"
        button1Action={() => { }}
        button2Action={() => { }}
      />

      {/* Full-width separator line above My List */}
      <hr className="border-t border-gray-700 w-full my-8" />

      <div className="px-8 md:px-16 lg:px-32">
        <ScrollableRow title="My List" loading={loading.myList} movies={myListMovies}>
          {Array.isArray(myListMovies) && myListMovies.length > 0 ? (
            myListMovies.map((movie) => (
              <MovieCard
                key={movie.uuid}
                movie={movie}
                averageRating={movie.averageRating} // Pass the average rating
                section="myList"
                playVideo={() => handlePlayVideo(movie)}
                isFavorited={movie.isFavorited} // Pass favorited state
                onFavoriteToggle={() => handleFavoriteToggle(movie.uuid)} // Toggle favorite state
              />
            ))
          ) : (
            <p className="text-white">You have no favorite movies in your list yet.</p>
          )}
        </ScrollableRow>
      </div>

      <Footer />
    </>
  );
};

export default MyList;
