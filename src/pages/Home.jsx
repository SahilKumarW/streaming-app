import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ScrollableRow from "../components/ScrollableRow";
import VideoService from "../api/videoService";
import homeImage from "../assets/home.png";
import Footer from "../components/Footer";
import VideoPlayer from "./VideoPlayer"; // Import VideoPlayer
import { getAuthData } from "../api/axios";

const Home = () => {
  const [recommendedMoviesList, setRecommendedMoviesList] = useState([]);
  const [topRatedMoviesList, setTopRatedMoviesList] = useState([]);
  const [topTvShowList, setTopTvShowList] = useState([]);
  const [continueWatchingList, setContinueWatchingList] = useState([]);
  const [loading, setLoading] = useState({
    recommended: true,
    topRated: true,
    topShows: true,
    continueWatching: true,
  });

  const [movieSelected, setMovieSelected] = useState(null); // State to store the selected movie

  const { userId } = getAuthData();

  useEffect(() => {
    const fetchData = async () => {
      setLoading({
        recommended: true,
        topRated: true,
        topShows: true,
        continueWatching: true,
      });

      try {
        const [allVideos, watchHistoryResponse, topRatedResponse, topTvShowsResponse] = await Promise.all([
          VideoService.showVideoList(),
          VideoService.getUserWatchHistory(),
          VideoService.getTopRatedMovies(),
          VideoService.getTopRatedTvShows(),
        ]);

        setRecommendedMoviesList(allVideos.data || []);
        setTopRatedMoviesList(topRatedResponse.data || []);
        setTopTvShowList(topTvShowsResponse);

        setContinueWatchingList(
          watchHistoryResponse.data.map((item) => ({
            ...item.videoDetails,
            progress: calculateProgressPercentage(item.watchDuration, item.videoDetails.duration),
            watchDuration: item.watchDuration,
          })) || []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading({
          recommended: false,
          topRated: false,
          topShows: false,
          continueWatching: false,
        });
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
    // Log the movie name and watch duration to the console
    console.log(`Movie: ${movie.name}, Watch Duration: ${movie.watchDuration}`);

    // Parse and convert watchDuration to seconds
    const startTime = parseDuration(movie.watchDuration);

    // Set the selected movie with start time
    setMovieSelected({ ...movie, startTime });
  };

  return (
    <>
      <HeroSection
        backgroundImage={homeImage}
        Movie="Movie"
        movieTitle="1917"
        subTitle="2022. Fantasy. Action"
        button1Text="Watch Now"
        button2Text="Add Watchlist"
      />

      {/* Render VideoPlayer if a movie is selected */}
      {movieSelected && (
        <VideoPlayer
          src={movieSelected.url}
          startTime={parseDuration(movieSelected.watchDuration)} // Convert watchDuration to startTime
        />
      )}

      <div className="px-8 md:px-16 lg:px-32 mt-8">
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
        <ScrollableRow
          title="Recommendations"
          loading={loading.recommended}
          movies={recommendedMoviesList.map((movie) => ({
            ...movie,
            onClick: () => handleCardClick(movie), // Use handleCardClick here
          }))}
        />
        <ScrollableRow
          title="Top Movies"
          loading={loading.topRated}
          movies={topRatedMoviesList.map((movie) => ({
            ...movie,
            onClick: () => handleCardClick(movie), // Use handleCardClick here
          }))}
        />
        <ScrollableRow
          title="Top Shows"
          loading={loading.topShows}
          movies={topTvShowList.map((movie) => ({
            ...movie,
            onClick: () => handleCardClick(movie), // Use handleCardClick here
          }))}
        />
      </div>

      <Footer />
    </>
  );
};

export default Home;
