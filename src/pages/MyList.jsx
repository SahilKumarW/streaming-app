import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ScrollableRow from "../components/ScrollableRow";
import VideoService from "../api/videoService";
import Footer from "../components/Footer";
import myListImage from "../assets/MyList.png";

const MyList = () => {
  const [myListMovies, setMyListMovies] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState({
    myList: true,
    similar: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading({ myList: true, similar: true });

        // Fetch user's list
        const myListResponse = await VideoService.showVideoList();
        console.log('My List response:', myListResponse);

        // Ensure the response is an array
        setMyListMovies(Array.isArray(myListResponse) ? myListResponse : []);

        // For similar movies, reuse or process data as needed
        setSimilarMovies(Array.isArray(myListResponse) ? myListResponse : []);

      } catch (error) {
        console.error("Error fetching data:", error);
        setMyListMovies([]); // Fallback to an empty array
        setSimilarMovies([]); // Fallback to an empty array
      } finally {
        setLoading({ myList: false, similar: false });
      }
    };

    fetchData();
  }, []);

  const handleWatchNow = () => {
    // Handle watch now button action
  };

  const handleRemoveFromList = () => {
    // Handle remove from list button action
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
        button2Action={handleRemoveFromList}
      />

      {/* Full-width separator line above My List */}
      <hr className="border-t border-gray-700 w-full my-8" />

      <div className="px-8 md:px-16 lg:px-32">
        <ScrollableRow
          title="My List"
          loading={loading.myList}
          movies={myListMovies}
        />
      </div>

      {/* Full-width separator line between sections */}
      <hr className="border-t border-gray-700 w-full my-8" />

      <div className="px-8 md:px-16 lg:px-32">
        <ScrollableRow
          title="Similar to These"
          loading={loading.similar}
          movies={similarMovies}
        />
      </div>
      <Footer />
    </>
  );
};

export default MyList;
