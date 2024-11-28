import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ScrollableRow from "../components/ScrollableRow";
import VideoService from "../api/videoService";
import Footer from "../components/Footer";
import tvSeriesImage from "../assets/TvSeries.png";
import tvSeriesEpisodeImage from "../assets/TvSeries.png";
import { getAuthData } from "../api/axios";
import { toast } from "react-toastify";

const TvSeries = () => {
  const [recommendedMoviesList, setRecommendedMoviesList] = useState([]);
  const [topRatedTvShowList, setTopRatedTvShowList] = useState([]);
  const [continueWatchingList, setContinueWatchingList] = useState([]);
  const [loading, setLoading] = useState({
    recommended: true,
    topRated: true,
    continueWatching: true,
  });

  const { userId } = getAuthData();

  useEffect(() => {
    const fetchData = async () => {
      setLoading({ recommended: true, topRated: true, continueWatching: true });

      try {
        // Fetch all videos, including TV shows
        const [allVideosResponse, watchHistoryResponse, topRatedShowsResponse] = await Promise.all([
          VideoService.showVideoList(),
          VideoService.getUserWatchHistory(),
          VideoService.getTopRatedTvShows(),
        ]);

        console.log("Top Rated Shows Response:", topRatedShowsResponse);


        // Process all videos data
        const allVideos = Array.isArray(allVideosResponse.data) ? allVideosResponse.data : [];

        setRecommendedMoviesList(
        allVideos.filter(video => video.category === "TVShows")
      );

        setTopRatedTvShowList(topRatedShowsResponse);

        // Process continue watching list
        setContinueWatchingList(
          watchHistoryResponse.data
            .filter((item) => item.videoDetails.url && item.videoDetails.isCompleted !== "true" && item.videoDetails.category === "TVShows")
            .map((item) => ({
              ...item.videoDetails,
              progress: calculateProgressPercentage(item.watchDuration, item.videoDetails.duration),
              watchDuration: item.watchDuration,
            }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again later.");
      } finally {
        setLoading({ recommended: false, topRated: false, continueWatching: false });
      }
    };

    fetchData();
  }, [userId]);

  const calculateProgressPercentage = (watchedDuration, totalDuration) => {
    if (!watchedDuration || !totalDuration) return 0;

    const watchedSeconds = parseDuration(watchedDuration);
    const totalSeconds = parseDuration(totalDuration);

    return Math.min(100, (watchedSeconds / totalSeconds) * 100);
  };

  const parseDuration = (duration) => {
    if (!duration || typeof duration !== "string") {
      console.warn("Invalid duration format:", duration);
      return 0;
    }

    const [hours, minutes, seconds] = duration.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      console.warn("Invalid numeric values in duration:", duration);
      return 0;
    }

    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleCardClick = (movie) => {
    // Handle card click logic, similar to the Home page
    console.log(`Movie: ${movie.name}, Watch Duration: ${movie.watchDuration}`);
  };

  return (
    <>
      <HeroSection
        backgroundImage={tvSeriesImage}
        Movie="Series"
        movieTitle="The Last Of Us Season 1"
        subTitle="12 Episodes. 2022. Drama. Post-apocalyptic"
        button1Text="Continue Watching"
        button2Text="Add Watchlist"
      />

      {/* <div className="px-8 md:px-16 lg:px-32 mt-8">
        <h2 className="text-white text-xl md:text-1xl lg:text-2xl font-bold mb-4">Story Line</h2>
        <p className="text-white text-sm mb-4">
          "The Last of Us" is a post-apocalyptic drama series based on the critically acclaimed video game. It follows Joel, a hardened survivor, and Ellie, a young girl with a special immunity, as they navigate a world ravaged by a fungal infection that turns humans into zombie-like creatures.
          <span className="text-blue-500 cursor-pointer hover:underline">...more</span>
        </p>
      </div> */}

      <div className="px-8 md:px-16 lg:px-32 mt-8">
        {/* Continue Watching Section */}
        <ScrollableRow
          title="Continue Watching"
          loading={loading.continueWatching}
          movies={continueWatchingList.map((item) => ({
            ...item,
            onClick: () => handleCardClick(item),
            progressBar: (
              <div className="progress-bar-container" style={{ width: "100%", backgroundColor: "#ddd" }}>
                <div
                  className="progress-bar"
                  style={{
                    width: `${item.progress}%`,
                    backgroundColor: "red",
                    height: "6px",
                    borderRadius: "4px",
                  }}
                ></div>
              </div>
            ),
          }))}
        />

        {/* Recommended TV Shows Section */}
        <ScrollableRow
          title="Recommendations"
          loading={loading.recommended}
          movies={recommendedMoviesList.map((movie) => ({
            ...movie,
            onClick: () => handleCardClick(movie),
          }))}
        />

        {/* Top Rated TV Shows Section */}
        <ScrollableRow
          title="Top Rated TV Shows"
          loading={loading.topRated}
          movies={topRatedTvShowList.map((movie) => ({
            ...movie,
            onClick: () => handleCardClick(movie),
          }))}
        />
      </div>

      <Footer />
    </>
  );
};

export default TvSeries;
