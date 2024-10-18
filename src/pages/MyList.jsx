
import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import movieImage2 from "../assets/MyList.png";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import { moviesData } from "../static/data";
import { FaStar } from "react-icons/fa";

const MyList = () => {
  const [recommendedMoviesList, setRecommendedMoviesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useSelector((state) => state.search.query);
  const handleWatchNow = () => {
    // Handle watch now button action
  };

  const handleAddToWatchlist = () => {
    // Handle add to watchlist button action
  };


  const getAllList = async () => {
    try {
      setLoading(true);

      setTimeout(() => {
        setRecommendedMoviesList(moviesData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllList();
  }, []);


  const filteredRecommendedMovies = recommendedMoviesList.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HeroSection backgroundImage={movieImage2}
      Movie="Series"
        movieTitle="Top Gun Maverik"
        subTitle="2022.Fantasy.Action"
        button1Text="Watch Now"
        button1Action={handleWatchNow}


      />
      <div className="px-8 md:px-16 lg:px-32 mt-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#ffffff" loading={loading} size={50} />
          </div>
        ) : (
          <>
            <ScrollableRow title="My List" mockMovies={filteredRecommendedMovies} />
            <ScrollableRow title="Similar To These" mockMovies={filteredRecommendedMovies} />
          </>
        )}
      </div>
    </>
  );
};

export default MyList;

const ScrollableRow = ({ title, mockMovies }) => {
  return (
    <div className="mb-8">
      <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4">
        {title}
      </h2>
      <div
        className="overflow-x-scroll scrollbar-hide flex space-x-4"
        style={{ scrollbarWidth: "none" }}
      >
        {mockMovies.length > 0 ? (
          mockMovies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[300px] rounded-lg overflow-hidden"
            >
              <img
                src={movie.imageUrl}
                alt={movie.name}
                className="w-full h-[150px] object-cover rounded-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{movie.name}</h3>
                <div className="flex justify-between items-center ">
                  <span className="text-yellow-500 flex items-center">
                    <FaStar /> <span className="ml-1 ">4.6</span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-sm text-gray-400">{movie.genre}</span>
                  </span>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg font-semibold text-white">No data found</p>
        )}
      </div>
    </div>
  );
};
