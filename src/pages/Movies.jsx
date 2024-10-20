import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ScrollableRow from "../components/ScrollableRow";
import VideoService from "../api/videoService";
import Footer from "../components/Footer";
import movieImage from "../assets/Movies.png";

const Movies = () => {
  const [topRatedMoviesList, setTopRatedMoviesList] = useState([]);
  const [similarMoviesList, setSimilarMoviesList] = useState([]);
  const [loading, setLoading] = useState({
    topRated: true,
    similar: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading({ topRated: true, similar: true });

        // Fetch top rated movies
        const topRatedResponse = await VideoService.getTopRatedMovies();
        console.log('Top rated response:', topRatedResponse);
        setTopRatedMoviesList(topRatedResponse);

        // For similar movies, we'll use the same data for demonstration
        setSimilarMoviesList(topRatedResponse);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading({ topRated: false, similar: false });
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
        backgroundImage={movieImage}
        Movie="Movie"
        movieTitle="Fields of Destiny"
        subTitle="2023. Fantasy. Action"
        button1Text="Watch Now"
        button2Text="Add Watchlist"
        button1Action={handleWatchNow}
        button2Action={handleAddToWatchlist}
      />
      <div className="px-8 md:px-16 lg:px-32">
        <h2 className="text-white text-xl md:text-1xl lg:text-2xl font-bold mb-4">
          Story Line
        </h2>
        <p className="text-white text-sm mb-4">
          "Fields of Destiny" is a gripping tale of heroism and self-discovery. Set in a fantastical world, it follows the journey of a young warrior who must overcome personal demons to save their homeland. With breathtaking visuals and a powerful storyline, this movie keeps you on the edge of your seat until the very end.
          <span className="text-blue-500 cursor-pointer hover:underline">...more</span>
        </p>
      </div>
      <div className="px-8 md:px-16 lg:px-32 mt-8">
        <ScrollableRow
          title="Top Rated Movies"
          loading={loading.topRated}
          movies={topRatedMoviesList}
        />
        <ScrollableRow
          title="Similar Movies"
          loading={loading.similar}
          movies={similarMoviesList}
        />
      </div>
      <Footer />
    </>
  );
};

export default Movies;
