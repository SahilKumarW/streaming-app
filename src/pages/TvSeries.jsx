import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ScrollableRow from "../components/ScrollableRow";
import VideoService from "../api/videoService";
import Footer from "../components/Footer";
import tvSeriesImage from "../assets/TvSeries.png";
import tvSeriesEpisodeImage from "../assets/TvSeries.png";
import { toast } from "react-toastify"; // Ensure to import toast for error handling

const TvSeries = () => {
  const [continueWatchingList, setContinueWatchingList] = useState([]);
  const [similarTvShowList, setSimilarTvShowList] = useState([]);
  const [topRatedTvShowList, setTopRatedTvShowList] = useState([]);
  const [loading, setLoading] = useState({
    continueWatching: true,
    similar: true,
    topRated: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set all loading states to true
        setLoading({ continueWatching: true, similar: true, topRated: true });

        // Fetch all videos
        const allVideosResponse = await VideoService.showVideoList();
        console.log('API Response:', allVideosResponse);

        const allVideos = Array.isArray(allVideosResponse.data) ? allVideosResponse.data : [];
        console.log('All videos:', allVideos);

        // Fetch top-rated TV shows
        const topRatedShowsResponse = await VideoService.getTopRatedTvShows();
        console.log('Tvseries - Top-rated TV shows response:', topRatedShowsResponse);

        const topRatedShows = Array.isArray(topRatedShowsResponse.data) ? topRatedShowsResponse.data : [];
        console.log('Processed Top-rated TV shows:', topRatedShows);

        setTopRatedTvShowList(topRatedShowsResponse);

        // Mock continue watching list
        const mockContinueWatching = Array(12).fill().map((_, index) => ({
          id: `episode-${index + 1}`,
          name: `Episode ${index + 1}`,
          description: `The one where ${['Joel', 'Ellie', 'Tess', 'Bill', 'Frank', 'Tommy'][index % 6]} faces a new challenge`,
          category: "TV Show",
          genre: "Drama, Post-apocalyptic",
          imageUrl: tvSeriesEpisodeImage,
          progress: Math.floor(Math.random() * 100),
          lastWatched: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
          chapter: index + 1,
          chapterDescription: `Joel and Ellie continue their perilous journey across a post-apocalyptic America.`,
        }));
        setContinueWatchingList(mockContinueWatching);

        // Filter similar TV shows from all videos based on category "TVShows"
        const filteredSimilarShows = allVideos.filter(video => video.category === "TVShows");
        setSimilarTvShowList(filteredSimilarShows);
        console.log('Filtered Similar TV Shows:', filteredSimilarShows);

      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again later.");
      } finally {
        // Set all loading states to false
        setLoading({ continueWatching: false, similar: false, topRated: false });
      }
    };

    fetchData();
  }, []);

  const handleWatchNow = () => {
    // Handle watch now button action
  };

  const handleAddToWatchlist = () => {
    // Handle add to watchlist button action
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
        button1Action={handleWatchNow}
        button2Action={handleAddToWatchlist}
      />
      <div className="px-8 md:px-16 lg:px-32">
        <h2 className="text-white text-xl md:text-1xl lg:text-2xl font-bold mb-4">
          Story Line
        </h2>
        <p className="text-white text-sm mb-4">
          "The Last of Us" is a post-apocalyptic drama series based on the critically acclaimed video game. It follows Joel, a hardened survivor, and Ellie, a young girl with a special immunity, as they navigate a world ravaged by a fungal infection that turns humans into zombie-like creatures.
          <span className="text-blue-500 cursor-pointer hover:underline">...more</span>
        </p>
      </div>
      <div className="px-8 md:px-16 lg:px-32 mt-8">
        <div className="mb-4">
          <h2 className="text-white text-sm">Episode</h2>
          <p className="text-white text-xl md:text-2xl lg:text-3xl font-bold ">1-12 Episode</p>
        </div>
        <ScrollableRow
          title="Continue Watching"
          loading={loading.continueWatching}
          movies={continueWatchingList}
          showProgress={true}
        />
        <ScrollableRow
          title="Similar TV Shows"
          loading={loading.similar}
          movies={similarTvShowList}
        />
        <ScrollableRow
          title="Top Rated TV Shows"
          loading={loading.topRated}
          movies={topRatedTvShowList} // Use the state variable for top-rated shows
        />
        {topRatedTvShowList.length === 0 && !loading.topRated && (
          <p className="text-white">No top-rated TV shows found. Showing latest uploaded TV shows.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TvSeries;
