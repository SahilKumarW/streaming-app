import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ScrollableRow from "../components/ScrollableRow";
import VideoService from "../api/videoService";
import homeImage from "../assets/home.png";
import Footer from "../components/Footer";

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

  const userId = localStorage.getItem("userId") ?? "1"; // Default to "1" if not found

  useEffect(() => {
    const fetchData = async () => {
      setLoading({
        recommended: true,
        topRated: true,
        topShows: true,
        continueWatching: true,
      });

      try {
        // Fetch recommended videos
        const allVideos = await VideoService.showVideoList();
        console.log('API Response for recommended videos:', allVideos);
        setRecommendedMoviesList(allVideos.data || []);
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
      }

      try {
        // Fetch user watch history and mock continue watching data
        const watchHistoryResponse = await VideoService.getUserWatchHistory();
        console.log('User watch history:', watchHistoryResponse);

        const mockContinueWatching = watchHistoryResponse.data.map((video, index) => ({
          ...video,
          progress: Math.floor(Math.random() * 100),
          lastWatched: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
          chapter: index + 1,
          chapterDescription: `The chapter about ${video.name.toLowerCase()}...`,
        }));
        setContinueWatchingList(mockContinueWatching);
      } catch (error) {
        console.error("Error fetching watch history:", error);
      }

      try {
        // Fetch top-rated movies
        const topRatedResponse = await VideoService.getTopRatedMovies();
        console.log('Top-rated movies:', topRatedResponse);
        setTopRatedMoviesList(topRatedResponse.data || []);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }

      try {
        // Fetch top-rated TV shows
        const topTvShowsResponse = await VideoService.getTopRatedTvShows();
        console.log('Home - Top-rated TV shows:', topTvShowsResponse);
        setTopTvShowList(topTvShowsResponse);
      } catch (error) {
        console.error("Error fetching top TV shows:", error);
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

  const handleWatchNow = () => {
    // Handle watch now button action
  };

  const handleAddToWatchlist = () => {
    // Handle add to watchlist button action
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
        button1Action={handleWatchNow}
        button2Action={handleAddToWatchlist}
      />
      <div className="px-8 md:px-16 lg:px-32 mt-8">
        <ScrollableRow
          title="Continue Watching"
          loading={loading.continueWatching}
          movies={continueWatchingList}
          showProgress={true}
        />
        <ScrollableRow
          title="Recommendations"
          loading={loading.recommended}
          movies={recommendedMoviesList}
        />
        <ScrollableRow
          title="Top Movies"
          loading={loading.topRated}
          movies={topRatedMoviesList}
        />
        <ScrollableRow
          title="Top Shows"
          loading={loading.topShows}
          movies={topTvShowList}
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;
