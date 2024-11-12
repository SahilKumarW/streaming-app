import React, { useState, useEffect, useRef } from "react";
import HeroSection from "../components/HeroSection";
import ScrollableRow from "../components/ScrollableRow";
import VideoService from "../api/videoService";
import homeImage from "../assets/home.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { getAuthData } from "../api/axios"; // Import getAuthData

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

  const { userId } = getAuthData(); // Use getAuthData to retrieve userId
  const navigate = useNavigate(); // To navigate to video player

  const [currentVideo, setCurrentVideo] = useState(null); // For tracking the currently playing video
  const [videoDuration, setVideoDuration] = useState(0); // For tracking video duration
  const timerRef = useRef(null); // Timer reference for tracking video progress

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

        const updatedHistory = watchHistoryResponse.data.map((video) => {
          const progress = calculateProgress(video.watchDuration);
          return { ...video, progress, lastWatched: new Date(video.watchedOn).toISOString() };
        });
        setContinueWatchingList(updatedHistory);
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

  // Function to calculate the progress in seconds
  const calculateProgress = (duration) => {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    const progressInSeconds = hours * 3600 + minutes * 60 + seconds;
    return progressInSeconds;
  };

  // Function to handle the "Continue Watching" click
  const handleContinueWatching = (video) => {
    const { videoId, videoDetails } = video;
    const startFrom = video.progress; // Start from the last watched position in seconds
    console.log(`Continuing video "${videoDetails.name}" from ${startFrom} seconds`);
    navigate(`/player/${videoId}`, { state: { startFrom, videoDetails } });
  };

  // Function to start a new video and track progress
  const playVideo = async (videoId, videoName) => {
    setCurrentVideo({ videoId, videoName });
    const startTime = Date.now(); // Record the start time
    setVideoDuration(0); // Reset duration to 0
    timerRef.current = setInterval(() => {
      setVideoDuration(Math.floor((Date.now() - startTime) / 1000)); // Update duration every second
    }, 1000);

    // Add video to watch history
    const watchedOn = new Date().toISOString();
    VideoService.watchHistoryAdd({
      userId,
      videoId,
      vedioName: videoName,
      watchedOn,
      watchDuration: 0,
      isCompleted: false,
    });
  };

  // Function to stop the video and update the watch history
  const stopVideo = async (isCompleted) => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Stop the timer
    }

    const watchedOn = new Date().toISOString();
    const videoDurationInSeconds = videoDuration;

    // Update the watch history with the final duration
    await VideoService.watchHistoryUpdate({
      userId,
      videoId: currentVideo.videoId,
      vedioName: currentVideo.videoName,
      watchedOn,
      watchDuration: videoDurationInSeconds,
      isCompleted,
    });

    // If the video wasn't completed, add to "Continue Watching"
    if (!isCompleted) {
      setContinueWatchingList((prev) => [
        ...prev,
        {
          ...currentVideo,
          progress: videoDurationInSeconds,
        },
      ]);
    }

    setCurrentVideo(null); // Reset current video state
    setVideoDuration(0); // Reset video duration
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
      <div className="px-8 md:px-16 lg:px-32 mt-8">
        <ScrollableRow
          title="Continue Watching"
          loading={loading.continueWatching}
          movies={continueWatchingList.map((video) => ({
            ...video,
            onClick: () => handleContinueWatching(video), // Pass click handler
            progress: (video.progress / video.videoDuration) * 100, // Calculate progress percentage
          }))}
          showProgress={true}
        />
        <ScrollableRow
          title="Recommendations"
          loading={loading.recommended}
          movies={recommendedMoviesList.map((movie) => ({
            ...movie,
            onClick: () => playVideo(movie.uuid, movie.name), // Start video on click
          }))}
        />
        <ScrollableRow
          title="Top Movies"
          loading={loading.topRated}
          movies={topRatedMoviesList.map((movie) => ({
            ...movie,
            onClick: () => playVideo(movie.uuid, movie.name), // Start video on click
          }))}
        />
        <ScrollableRow
          title="Top Shows"
          loading={loading.topShows}
          movies={topTvShowList.map((movie) => ({
            ...movie,
            onClick: () => playVideo(movie.uuid, movie.name), // Start video on click
          }))}
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;
