// import React, { useEffect, useState } from "react";
// import HeroSection from "../components/HeroSection";
// import Footer from "../components/Footer";
// import { get } from "../api/axios";
// const apiUrl = import.meta.env.VITE_API_URL;
// import Cookies from "js-cookie";
// import ClipLoader from "react-spinners/ClipLoader";
// import { useSelector } from "react-redux";

// const TvSeries = () => {
//   const [topTvShowList, setTopTvShowList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const searchQuery = useSelector((state) => state.search.query);
//   const topCastData = [
//     {
//       id: 1,
//       realName: "Leonardo DiCaprio",
//       fakeName: "Dom Cobb",
//       movieName: "Inception",
//       imageUrl: "/Assets/leo.jpg",
//     },
//     {
//       id: 2,
//       realName: "Tom Hardy",
//       fakeName: "Farrier",
//       movieName: "Dunkirk",
//       imageUrl: "/Assets/tom.jpg",
//     },
//     {
//       id: 3,
//       realName: "Matthew McConaughey",
//       fakeName: "Cooper",
//       movieName: "Interstellar",
//       imageUrl: "/Assets/mathew.png",
//     },
//     {
//       id: 4,
//       realName: "Christian Bale",
//       fakeName: "Bruce Wayne",
//       movieName: "The Dark Knight",
//       imageUrl: "/Assets/bale.jpg",
//     },
//     {
//       id: 5,
//       realName: "Brad Pitt",
//       fakeName: "Cliff Booth",
//       movieName: "Once Upon a Time in Hollywood",
//       imageUrl: "/Assets/brad.jpg",
//     },
//     {
//       id: 6,
//       realName: "Joaquin Phoenix",
//       fakeName: "Arthur Fleck",
//       movieName: "Joker",
//       imageUrl: "/Assets/jeo.jpg",
//     },
//     {
//       id: 7,
//       realName: "Scarlett Johansson",
//       fakeName: "Natasha Romanoff",
//       movieName: "Avengers: Endgame",
//       imageUrl: "/Assets/SCARLET.jpg",
//     },
//     {
//       id: 8,
//       realName: "Leonardo DiCaprio",
//       fakeName: "Dom Cobb",
//       movieName: "Inception",
//       imageUrl: "/Assets/leo.jpg",
//     },
//     {
//       id: 9,
//       realName: "Tom Hardy",
//       fakeName: "Farrier",
//       movieName: "Dunkirk",
//       imageUrl: "/Assets/tom.jpg",
//     },
//     {
//       id: 10,
//       realName: "Matthew McConaughey",
//       fakeName: "Cooper",
//       movieName: "Interstellar",
//       imageUrl: "/Assets/mathew.png",
//     },
//   ];

//   const token = Cookies.get("accessToken");

//   const getAllTvShows = async () => {
//     setLoading(true); // Start loading
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
//       setLoading(false); // End loading
//     }
//   };

//   useEffect(() => {
//     getAllTvShows();
//   }, []);
//   const filteredTvList = topTvShowList.filter((movie) =>
//     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       <HeroSection />
//       <div className="px-8 md:px-16 lg:px-32 ">
//         <h2 className="text-white text-xl md:text-1xl lg:text-2xl font-bold mb-4">
//           Story Line
//         </h2>
//         <p className="text-white text-sm mb-4">
//           "Fields of Destiny" is a gripping tale of heroism and self-discovery. Set in a fantastical world, it follows the journey of a young warrior who must overcome personal demons to save their homeland. With breathtaking visuals and a powerful storyline, this movie keeps you on the edge of your seat until the very end.
//           <span className="text-blue-500 cursor-pointer hover:underline">...more</span>
//         </p>
//       </div>

//       <div className="px-8 md:px-16 lg:px-32 mt-8">
//         <ScrollableCastRow title="Top Cast" castData={topCastData} />
//       </div>
//       <div className="px-8 md:px-16 lg:px-32 mt-8">
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <ClipLoader color="#ffffff" loading={loading} size={50} />
//           </div>
//         ) : (
//           <ScrollableRow
//             title="Similar TV Shows for you"
//             mockMovies={filteredTvList}
//           />
//         )}
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default TvSeries;

// const ScrollableRow = ({ title, mockMovies }) => {
//   return (
//     <div className="mb-8">
//       <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4">
//         {title}
//       </h2>
//       <div
//         className="overflow-x-scroll scrollbar-hide flex space-x-4"
//         style={{ scrollbarWidth: "none" }}
//       >
//         {mockMovies.length > 0 ? (
//           mockMovies.map((movie, index) => (
//             <div
//               key={index}
//               className="min-w-[300px] bg-gray-800 rounded-lg overflow-hidden"
//             >
//               <img
//                 src={movie.thumbnail}
//                 alt={movie.title}
//                 className="w-full h-[150px] object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-white">
//                   {movie.title}
//                 </h3>
//                 <p className="text-sm text-gray-400">{movie.description}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-lg font-semibold text-white">No data found</p>
//         )}
//       </div>
//     </div>
//   );
// };


// const ScrollableCastRow = ({ title, castData }) => {
//   return (
//     <div className="mb-8">
//       <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4">
//         {title}
//       </h2>
//       <div
//         className="overflow-x-scroll scrollbar-hide flex space-x-4"
//         style={{ scrollbarWidth: 'none' }}
//       >
//         {castData.length > 0 ? (
//           castData.map((actor, index) => (
//             <div
//               key={index}
//               className="min-w-[190px]  rounded-lg overflow-hidden flex flex-col items-center"
//             >

//               <div className="flex items-center space-x-3 p-2">
//                 <img
//                   src={actor.imageUrl}
//                   alt={actor.realName}
//                   className="w-[60px] h-[60px] object-cover rounded-full"
//                 />
//                 {/* Column for real name and fake name */}
//                 <div className="flex flex-col">
//                   <h3 className="text-sm font-semibold text-white">{actor.realName}</h3>
//                   <p className="text-xs text-gray-400 mt-1">{actor.fakeName}</p>
//                 </div>
//               </div>


//             </div>



//           ))
//         ) : (
//           <p className="text-lg font-semibold text-white">No data found</p>
//         )}
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { moviesData, topCastData } from "../static/data";
import movieImage1 from "../assets/TvSeries.png";


const TvSeries = () => {
  const [topTvShowList, setTopTvShowList] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useSelector((state) => state.search.query);
  const handleWatchNow = () => {
    // Action for Watch Now button
  };

  const handleAddToWatchlist = () => {
    // Action for Add to Watchlist button
  };

 
  useEffect(() => {
    setLoading(true);
  
    const tvShows = moviesData.map((movie) => ({
      title: movie.name,
      description: movie.description,
      thumbnail: movie.imageUrl,
      genre: movie.genre,
    }));
    setTopTvShowList(tvShows);
    setLoading(false);
  }, []);

  const filteredTvList = topTvShowList.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HeroSection backgroundImage={movieImage1}
      Movie="Series"
      movieTitle="The Last Of Us Season 1"
      subTitle="9 Episodes.2022.Fantasy.Action"
      button1Text="Continue Watching"
      button2Text="Add Watchlist"
      button1Action={handleWatchNow}
      button2Action={handleAddToWatchlist}/>
      <div className="px-8 md:px-16 lg:px-32 ">
        <h2 className="text-white text-xl md:text-1xl lg:text-2xl font-bold mb-4">
          Story Line
        </h2>
        <p className="text-white text-sm mb-4">
          "Fields of Destiny" is a gripping tale of heroism and self-discovery.
          Set in a fantastical world, it follows the journey of a young warrior
          who must overcome personal demons to save their homeland. With
          breathtaking visuals and a powerful storyline, this movie keeps you on
          the edge of your seat until the very end.
          <span className="text-blue-500 cursor-pointer hover:underline">
            ...more
          </span>
        </p>
      </div>

      <div className="px-8 md:px-16 lg:px-32 mt-8">
        <ScrollableCastRow title="Top Cast" castData={topCastData} />
      </div>
      <div className="px-8 md:px-16 lg:px-32 mt-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#ffffff" loading={loading} size={50} />
          </div>
        ) : (
          <ScrollableRow
            title="Similar TV Shows for you"
            mockMovies={filteredTvList}
          />
        )}
        <Footer />
      </div>
    </>
  );
};

export default TvSeries;


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
          mockMovies.map((movie, index) => (
            <div
              key={index}
              className="min-w-[300px] rounded-lg overflow-hidden"
            >
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full h-[150px] object-cover rounded-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">
                  {movie.title}
                </h3>
                
                <p className="text-sm text-gray-400">{movie.description}</p>
                <p className="text-sm text-gray-400">Genre: {movie.genre}</p>
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


const ScrollableCastRow = ({ title, castData }) => {
  return (
    <div className="mb-8">
      <h2 className="text-white text-xl md:text-1xl lg:text-2xl font-bold mb-4">
        {title}
      </h2>
      <div
        className="overflow-x-scroll scrollbar-hide flex space-x-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {castData.length > 0 ? (
          castData.map((actor, index) => (
            <div
              key={index}
              className="min-w-[190px]  rounded-lg overflow-hidden flex flex-col items-center"
            >

              <div className="flex items-center space-x-3 p-2">
                <img
                  src={actor.imageUrl}
                  alt={actor.realName}
                  className="w-[60px] h-[60px] object-cover rounded-full"
                />
                {/* Column for real name and fake name */}
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-white">{actor.realName}</h3>
                  <p className="text-xs text-gray-400 mt-1">{actor.fakeName}</p>
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
