// import React, { useState, useEffect } from "react";
// import HeroSection from "../components/HeroSection";
// import { get } from "../api/axios";
// import Cookies from "js-cookie";
// import ClipLoader from "react-spinners/ClipLoader";
// import { useSelector } from "react-redux";
// import MovieList from "../components/MovieList";


// const apiUrl = import.meta.env.VITE_API_URL;

// const Home = () => {
//   const searchQuery = useSelector((state) => state.search.query);
//   const [recommendedMoviesList, setRecommendedMoviesList] = useState([]);
//   const [topRatedMoviesList, setTopRatedMoviesList] = useState([]);
//   const [topTvShowList, setTopTvShowList] = useState([]);
//   const [watchHistoryMoviesList, setWatchHistoryMoviesList] = useState([]);
//   const [loading, setLoading] = useState({
//     recommended: true,
//     topRated: true,
//     topShows: true,
//     watchHistory: true,
//   });

//   const userId = Cookies.get("userId");
//   const token = Cookies.get("accessToken");

//   const getWatchHistoryMovies = async () => {
//     try {
//       const response = await get(
//         `${apiUrl}/UploadVedios/get-user-watch-history?UserId=${userId}`,
//         token
//       );
//       if (response.apiCode === 0) {
//         let data = response.data || [];

//         let moviesData =
//           data.length > 0
//             ? data.map((item) => ({
//                 title: item.name,
//                 description: "-------------",
//                 thumbnail:
//                   "https://via.placeholder.com/300x150.png?text=Movie+1",
//               }))
//             : [];
//         setWatchHistoryMoviesList(moviesData);
//       } else {
//         setWatchHistoryMoviesList([]);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading((prev) => ({ ...prev, watchHistory: false }));
//     }
//   };



  
//   //searching
//   const filteredWatchHistoryMovies = watchHistoryMoviesList.filter((movie) =>
//     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getRecommendedMovies = async () => {
//     try {
//       const response = await get(
//         `${apiUrl}/UploadVedios/show-vedio-list?UserId=${userId}`,
//         token
//       );
//       if (response.apiCode === 0) {
//         let data = response.data || [];

//         let moviesData =
//           data.length > 0
//             ? data.map((item) => ({
//                 title: item.name,
//                 description: "-------------",
//                 thumbnail:
//                   "https://via.placeholder.com/300x150.png?text=Movie+1",
//               }))
//             : [];
//         setRecommendedMoviesList(moviesData);
//       } else {
//         setRecommendedMoviesList([]);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading((prev) => ({ ...prev, recommended: false }));
//     }
//   };
//   //searching
//   const filteredRecommendedMovies = recommendedMoviesList.filter((movie) =>
//     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getTopRatedMovies = async () => {
//     try {
//       const response = await get(
//         `${apiUrl}/UploadVedios/get-top-rated-movies`,
//         token
//       );
//       if (response.apiCode === 0) {
//         let data = response.data || [];

//         let moviesData =
//           data.length > 0
//             ? data.map((item) => ({
//                 title: item.name,
//                 description: "-------------",
//                 thumbnail:
//                   "https://via.placeholder.com/300x150.png?text=Movie+1",
//               }))
//             : [];
//         setTopRatedMoviesList(moviesData);
//       } else {
//         setTopRatedMoviesList([]);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading((prev) => ({ ...prev, topRated: false }));
//     }
//   };

//   //searching
//   const filteredTopRatesMovies = topRatedMoviesList.filter((movie) =>
//     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getTopTvShows = async () => {
//     try {
//       const response = await get(
//         `${apiUrl}/UploadVedios/get-top-rated-tvshows`,
//         token
//       );
//       if (response.apiCode === 0) {
//         let data = response.data || [];

//         let tvData =
//           data.length > 0
//             ? data.map((item) => ({
//                 title: item.name,
//                 description: "-------------",
//                 thumbnail:
//                   "https://via.placeholder.com/300x150.png?text=Movie+1",
//               }))
//             : [];
//         setTopTvShowList(tvData);
//       } else {
//         setTopTvShowList([]);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading((prev) => ({ ...prev, topShows: false }));
//     }
//   };
//   //searching
//   const filteredTopTvShoes = topTvShowList.filter((movie) =>
//     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   useEffect(() => {
//     getWatchHistoryMovies();
//     getRecommendedMovies();
//     getTopRatedMovies();
//     getTopTvShows();
//   }, []);



//   return (
//     <>
//       <HeroSection />
//       <div className="px-8 md:px-16 lg:px-32 mt-8">
//         <ScrollableRow
//           title="Continue Watching"
//           loading={loading.watchHistory}
//           movies={filteredWatchHistoryMovies}
//         />
//         <ScrollableRow
//           title="Recommendations"
//           loading={loading.recommended}
//           movies={filteredRecommendedMovies}
//         />

//         <ScrollableRow
//           title="Top Movies"
//           loading={loading.topRated}
//           movies={filteredTopRatesMovies}
//         />

//         <ScrollableRow
//           title="Top Shows"
//           loading={loading.topShows}
//           movies={filteredTopTvShoes}
//         />

//       </div>
//     </>
//   );
// };

// export default Home;

// const ScrollableRow = ({ title, movies, loading }) => {
//   return (
//     <div className="mb-8">
//       <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4">
//         {title}
//       </h2>
//       {loading ? (
//         <div className="flex justify-center items-center h-48">
//           <ClipLoader color={"#fff"} loading={true} size={50} />
//         </div>
//       ) : (
//         <div
//           className="overflow-x-scroll scrollbar-hide flex space-x-4"
//           style={{ scrollbarWidth: "none" }}
//         >
//           {movies.length > 0 ? (
//             movies.map((movie, index) => (
//               <div
//                 key={index}
//                 className="min-w-[300px] bg-gray-800 rounded-lg overflow-hidden"
//               >
//                 <img
//                   src={movie.thumbnail}
//                   alt={movie.title}
//                   className="w-full h-[150px] object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-white capitalize">
//                     {movie.title}
//                   </h3>
//                   <p className="text-sm text-gray-400">{movie.description}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-lg font-semibold text-white">No data found</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };








import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";
import { moviesData } from "../static/data"; 
import { FaStar } from "react-icons/fa";
import Footer from "../components/Footer";
import homeImage from "../assets/home.png";

const Home = () => {
  const searchQuery = useSelector((state) => state.search.query);
  const handleWatchNow = () => {
    // Handle watch now button action
  };

  const handleAddToWatchlist = () => {
    // Handle add to watchlist button action
  };

  const [loading, setLoading] = useState({
    recommended: true,
    topRated: true,
    topShows: true,
    watchHistory: true,
  });

  
  const recommendedMoviesList = moviesData;
  const topRatedMoviesList = moviesData;
  const topTvShowList = moviesData;
  const watchHistoryMoviesList = moviesData;


  const filteredMovies = (movies) =>
    movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  
  const filteredRecommendedMovies = filteredMovies(recommendedMoviesList);
  const filteredTopRatedMovies = filteredMovies(topRatedMoviesList);
  const filteredTopTvShows = filteredMovies(topTvShowList);
  const filteredWatchHistoryMovies = filteredMovies(watchHistoryMoviesList);

  // Simulating loading state
  useEffect(() => {
    setLoading({
      recommended: false,
      topRated: false,
      topShows: false,
      watchHistory: false,
    });
  }, []);

  return (
    <>
      <HeroSection  backgroundImage={homeImage}
      Movie="Movie"
      movieTitle="1917"
      subTitle="2022. Fantasy. Action"
      button1Text="Watch Now"
      button2Text="Add Watchlist"
      button1Action={handleWatchNow}
      button2Action={handleAddToWatchlist} />
      <div className="px-8 md:px-16 lg:px-32 mt-8">
        {/* <ScrollableRow
          title="Continue Watching"
          loading={loading.watchHistory}
          movies={filteredWatchHistoryMovies}
        /> */}

        <div className="mb-8">
          <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            Continue Watching
          </h2>
          <p>No Data Found</p>
        </div>
        <ScrollableRow
          title="Recommendations"
          loading={loading.recommended}
          movies={filteredRecommendedMovies}
        />
        <ScrollableRow
          title="Top Movies"
          loading={loading.topRated}
          movies={filteredTopRatedMovies}
        />
        <ScrollableRow
          title="Top Shows"
          loading={loading.topShows}
          movies={filteredTopTvShows}
        />

      </div>
      <Footer/>


    </>
  );
};

export default Home;

const ScrollableRow = ({ title, movies, loading }) => {
  return (
    <div className="mb-8">
      <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4">
        {title}
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <ClipLoader color={"#fff"} loading={true} size={50} />
        </div>
      ) : (
        <div
          className="overflow-x-scroll scrollbar-hide flex space-x-4"
          style={{ scrollbarWidth: "none" }}
        >
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div
                key={index}
                className="min-w-[300px]  rounded-lg overflow-hidden"
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.name}
                  className="w-full h-[150px] object-cover  rounded-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white capitalize">
                    {movie.name}
                  </h3>
                  <div className="flex justify-between items-center">
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

      )}

    </div>

  );
};



