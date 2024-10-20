import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ScrollableRow from "../components/ScrollableRow";
import VideoService from "../api/videoService";
import Footer from "../components/Footer";
import myListImage from "../assets/MyList.png";

const MyList = () => {
  const [myListMovies, setMyListMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // For demonstration, we'll use the showVideoList method
        // In a real app, you'd have a separate method to fetch the user's list
        const myListResponse = await VideoService.showVideoList();
        console.log('My List response:', myListResponse);
        setMyListMovies(myListResponse);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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
        backgroundImage={myListImage}
        Movie="Series"
        movieTitle="Top Gun Maverick"
        subTitle="2022. Action. Drama"
        button1Text="Watch Now"
        button2Text="Remove from List"
        button1Action={handleWatchNow}
        button2Action={handleAddToWatchlist}
      />
      <div className="px-8 md:px-16 lg:px-32 mt-8">
        <ScrollableRow
          title="My List"
          loading={loading}
          movies={myListMovies}
        />
      </div>
      <Footer />
    </>
  );
};

export default MyList;
