// import React, { useState, useEffect } from "react";
// import HeroSection from "../components/HeroSection";
// import ClipLoader from "react-spinners/ClipLoader";
// import { useSelector } from "react-redux";
// import ScrollableRow from "../components/ScrollableRow";
// import VideoService from "../api/videoService";
// import Cookies from "js-cookie";
// import homeImage from "../assets/home.png";
// import Footer from "../components/Footer";

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

//   const userId = Cookies.get("userId") || "1"; // Default to "1" if not found

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading({
//           recommended: true,
//           topRated: true,
//           topShows: true,
//           watchHistory: true,
//         });

//         // Fetch all videos (for recommendations)
//         const recommendedResponse = await VideoService.showVideoList();
//         console.log('Recommended response:', recommendedResponse);
//         setRecommendedMoviesList(Array.isArray(recommendedResponse) ? recommendedResponse : []);

//         // Fetch top rated movies
//         const topRatedResponse = await VideoService.getTopRatedMovies();
//         console.log('Top rated response:', topRatedResponse);
//         setTopRatedMoviesList(Array.isArray(topRatedResponse) ? topRatedResponse : []);

//         // Fetch top TV shows
//         const topTvShowsResponse = await VideoService.getTopRatedTvShows();
//         console.log('Top TV shows response:', topTvShowsResponse);
//         setTopTvShowList(Array.isArray(topTvShowsResponse) ? topTvShowsResponse : []);

//         // Fetch watch history
//         const watchHistoryResponse = await VideoService.getUserWatchHistory(userId);
//         console.log('Watch history response:', watchHistoryResponse);
//         setWatchHistoryMoviesList(
//           Array.isArray(watchHistoryResponse) 
//             ? watchHistoryResponse.map(item => item.video).filter(Boolean)
//             : []
//         );
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading({
//           recommended: false,
//           topRated: false,
//           topShows: false,
//           watchHistory: false,
//         });
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const filterMovies = (movies) =>
//     movies.filter((movie) =>
//       movie && movie.name && movie.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//   const handleWatchNow = () => {
//     // Handle watch now button action
//   };

//   const handleAddToWatchlist = () => {
//     // Handle add to watchlist button action
//   };

//   return (
//     <>
//       <HeroSection
//         backgroundImage={homeImage}
//         Movie="Movie"
//         movieTitle="1917"
//         subTitle="2022. Fantasy. Action"
//         button1Text="Watch Now"
//         button2Text="Add Watchlist"
//         button1Action={handleWatchNow}
//         button2Action={handleAddToWatchlist}
//       />
//       <div className="px-8 md:px-16 lg:px-32 mt-8">
//         <ScrollableRow
//           title="Continue Watching"
//           loading={loading.watchHistory}
//           movies={filterMovies(watchHistoryMoviesList)}
//         />
//         <ScrollableRow
//           title="Recommendations"
//           loading={loading.recommended}
//           movies={filterMovies(recommendedMoviesList)}
//         />
//         <ScrollableRow
//           title="Top Movies"
//           loading={loading.topRated}
//           movies={filterMovies(topRatedMoviesList)}
//         />
//         <ScrollableRow
//           title="Top Shows"
//           loading={loading.topShows}
//           movies={filterMovies(topTvShowList)}
//         />
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import ScrollableRow from "../components/ScrollableRow";
import VideoService from "../api/videoService";
import Cookies from "js-cookie";
import homeImage from "../assets/home.png";
import Footer from "../components/Footer";

const Home = () => {
  const searchQuery = useSelector((state) => state.search.query);
  const [recommendedMoviesList, setRecommendedMoviesList] = useState([]);
  const [topRatedMoviesList, setTopRatedMoviesList] = useState([]);
  const [topTvShowList, setTopTvShowList] = useState([]);
  const [watchHistoryMoviesList, setWatchHistoryMoviesList] = useState([]);
  const [loading, setLoading] = useState({
    recommended: true,
    topRated: true,
    topShows: true,
    watchHistory: true,
  });

  const userId = Cookies.get("userId") || "1"; // Default to "1" if not found

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading({
          recommended: true,
          topRated: true,
          topShows: true,
          watchHistory: true,
        });

        // Fetch all videos (for recommendations)
        const recommendedResponse = await VideoService.showVideoList();
        console.log('Recommended response:', recommendedResponse);
        setRecommendedMoviesList(Array.isArray(recommendedResponse) ? recommendedResponse : []);

        // Fetch top rated movies
        const topRatedResponse = await VideoService.getTopRatedMovies();
        console.log('Top rated response:', topRatedResponse);
        setTopRatedMoviesList(Array.isArray(topRatedResponse) ? topRatedResponse : []);

        // Fetch top TV shows
        const topTvShowsResponse = await VideoService.getTopRatedTvShows();
        console.log('Top TV shows response:', topTvShowsResponse);
        setTopTvShowList(Array.isArray(topTvShowsResponse) ? topTvShowsResponse : []);

        // Fetch watch history
        const watchHistoryResponse = await VideoService.getUserWatchHistory(userId);
        console.log('Watch history response:', watchHistoryResponse);
        setWatchHistoryMoviesList(
          Array.isArray(watchHistoryResponse) 
            ? watchHistoryResponse.map(item => item.video).filter(Boolean)
            : []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading({
          recommended: false,
          topRated: false,
          topShows: false,
          watchHistory: false,
        });
      }
    };

    fetchData();
  }, [userId]);

  const filterMovies = (movies) =>
    movies.filter((movie) =>
      movie && movie.name && movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
          loading={loading.watchHistory}
          movies={filterMovies(watchHistoryMoviesList)}
        />
        <ScrollableRow
          title="Recommendations"
          loading={loading.recommended}
          movies={filterMovies(recommendedMoviesList)}
        />
        <ScrollableRow
          title="Top Movies"
          loading={loading.topRated}
          movies={filterMovies(topRatedMoviesList)}
        />
        <ScrollableRow
          title="Top Shows"
          loading={loading.topShows}
          movies={filterMovies(topTvShowList)}
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;

