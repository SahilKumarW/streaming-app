import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ScrollableRow from "../components/ScrollableRow";
import VideoService from "../api/videoService";
import Footer from "../components/Footer";
import tvSeriesImage from "../assets/TvSeries.png";
import tvSeriesEpisodeImage from "../assets/TvSeries.png";

const TvSeries = () => {
  const [continueWatchingList, setContinueWatchingList] = useState([]);
  const [similarTvShowList, setSimilarTvShowList] = useState([]);
  const [loading, setLoading] = useState({
    continueWatching: true,
    similar: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading({ continueWatching: true, similar: true });

        // Fetch all videos
        const allVideos = await VideoService.showVideoList();
        console.log('All videos:', allVideos);

        // Create mock continue watching data for TV series
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
          chapterDescription: `Joel and Ellie continue their perilous journey across a post-apocalyptic America.`
        }));
        setContinueWatchingList(mockContinueWatching);

        // For similar TV shows, we'll use the same data for demonstration
        setSimilarTvShowList(allVideos.filter(video => video.category === "TV Show"));

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading({ continueWatching: false, similar: false });
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
          title=""
          loading={loading.continueWatching}
          movies={continueWatchingList}
          showProgress={true}
        />
        <ScrollableRow
          title="Similar TV Shows"
          loading={loading.similar}
          movies={similarTvShowList}
        />
      </div>
      <Footer />
    </>
  );
};

export default TvSeries;
