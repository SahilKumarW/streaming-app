// import React, { useEffect, useState } from "react";
// import HeroSection from "../components/HeroSection";
// import Footer from "../components/Footer";
// import { get } from "../api/axios";
// const apiUrl = import.meta.env.VITE_API_URL;
// import Cookies from "js-cookie";
// import ClipLoader from "react-spinners/ClipLoader";
// import { useSelector } from "react-redux";

// const Movies = () => {
//   const searchQuery = useSelector((state) => state.search.query);

//   const [topRatedMoviesList, setTopRatedMoviesList] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const token = Cookies.get("accessToken");

//   const getAllMovies = async () => {
//     setLoading(true); // Start loading
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
//       setLoading(false); // End loading
//     }
//   };

//   useEffect(() => {
//     getAllMovies();
//   }, []);

//   const filteredMovies = topRatedMoviesList.filter((movie) =>
//     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       <HeroSection />
//       <div className="px-8 md:px-16 lg:px-32 ">
//     <h2 className="text-white text-xl md:text-1xl lg:text-2xl font-bold mb-4">
//       Story Line
//     </h2>
//     <p className="text-white text-sm mb-4">
//       "Fields of Destiny" is a gripping tale of heroism and self-discovery. Set in a fantastical world, it follows the journey of a young warrior who must overcome personal demons to save their homeland. With breathtaking visuals and a powerful storyline, this movie keeps you on the edge of your seat until the very end. 
//       <span className="text-blue-500 cursor-pointer hover:underline">...more</span>
//     </p>
//   </div>
//       <div className="px-8 md:px-16 lg:px-32 mt-8">
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <ClipLoader color="#ffffff" loading={loading} size={50} />
//           </div>
//         ) : (
//           <ScrollableRow
//             title="Similar Movies for you"
//             mockMovies={filteredMovies}
//           />
//         )}
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Movies;

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

import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import movieImage from "../assets/Movies.png";


export const moviesData = [
  {
    id: 1,
    name: "1917",
    description: "A World War I thriller about two British soldiers on a mission.",
    year: 2019,
    genre: "War, Drama",
    imageUrl: "/Assets/ninetine.jpg",
  },
  {
    id: 2,
    name: "Inception",
    description: "A skilled thief is given a chance at redemption if he can plant an idea in someone's mind.",
    year: 2010,
    genre: "Sci-Fi, Thriller",
    imageUrl: "/Assets/inception.png",
  },
  {
    id: 3,
    name: "Interstellar",
    description: "A team of explorers travels through a wormhole in space to ensure humanity's survival.",
    year: 2014,
    genre: "Sci-Fi, Adventure",
    imageUrl: "/Assets/interseller.png",
  },
  {
    id: 4,
    name: "The Dark Knight",
    description: "Batman faces his greatest challenge yet when the Joker unleashes chaos on Gotham.",
    year: 2008,
    genre: "Action, Crime",
    imageUrl: "/Assets/dark.png",
  },
  {
    id: 5,
    name: "Parasite",
    description: "A poor family schemes to become employed by a wealthy family and infiltrate their household.",
    year: 2019,
    genre: "Thriller, Drama",
    imageUrl: "/Assets/parasite.png",
  },
  {
    id: 6,
    name: "The Matrix",
    description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    year: 1999,
    genre: "Sci-Fi, Action",
    imageUrl: "/Assets/matrix.png",
  },
  {
    id: 7,
    name: "Avengers: Endgame",
    description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions.",
    year: 2019,
    genre: "Action, Sci-Fi",
    imageUrl: "path/to/endgame-movie.jpg",
  },
  {
    id: 8,
    name: "Joker",
    description: "A mentally troubled stand-up comedian embarks on a downward spiral, leading to the creation of an iconic villain.",
    year: 2019,
    genre: "Drama, Crime",
    imageUrl: "path/to/joker-movie.jpg",
  },
  {
    id: 9,
    name: "Spider-Man: Into the Spider-Verse",
    description: "Teenager Miles Morales becomes Spider-Man and joins others from different dimensions to save the multiverse.",
    year: 2018,
    genre: "Animation, Action",
    imageUrl: "path/to/spiderverse-movie.jpg",
  },
];


export const topCastData = [
  {
    id: 1,
    realName: "Leonardo DiCaprio",
    fakeName: "Dom Cobb",
    movieName: "Inception",
    imageUrl: "/Assets/leo.jpg",
  },
  {
    id: 2,
    realName: "Tom Hardy",
    fakeName: "Farrier",
    movieName: "Dunkirk",
    imageUrl: "/Assets/tom.jpg",
  },
  {
    id: 3,
    realName: "Matthew McConaughey",
    fakeName: "Cooper",
    movieName: "Interstellar",
    imageUrl: "/Assets/mathew.png",
  },
  {
    id: 4,
    realName: "Christian Bale",
    fakeName: "Bruce Wayne",
    movieName: "The Dark Knight",
    imageUrl: "/Assets/bale.jpg",
  },
  {
    id: 5,
    realName: "Brad Pitt",
    fakeName: "Cliff Booth",
    movieName: "Once Upon a Time in Hollywood",
    imageUrl: "/Assets/brad.jpg",
  },
  {
    id: 6,
    realName: "Joaquin Phoenix",
    fakeName: "Arthur Fleck",
    movieName: "Joker",
    imageUrl: "/Assets/jeo.jpg",
  },
  {
    id: 7,
    realName: "Scarlett Johansson",
    fakeName: "Natasha Romanoff",
    movieName: "Avengers: Endgame",
    imageUrl: "/Assets/SCARLET.jpg",
  },
  {
    id: 8,
    realName: "Leonardo DiCaprio",
    fakeName: "Dom Cobb",
    movieName: "Inception",
    imageUrl: "/Assets/leo.jpg",
  },
  {
    id: 9,
    realName: "Tom Hardy",
    fakeName: "Farrier",
    movieName: "Dunkirk",
    imageUrl: "/Assets/tom.jpg",
  },
  {
    id: 10,
    realName: "Matthew McConaughey",
    fakeName: "Cooper",
    movieName: "Interstellar",
    imageUrl: "/Assets/mathew.png",
  },
];


const Movies = () => {
  const searchQuery = useSelector((state) => state.search.query);

  const [loading, setLoading] = useState(false);
  const [topRatedMoviesList, setTopRatedMoviesList] = useState(moviesData);


  const filteredMovies = topRatedMoviesList.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWatchNow = () => {
    // Action for Watch Now button
  };

  const handleAddToWatchlist = () => {
    // Action for Add to Watchlist button
  };

  return (
    <>
      <HeroSection backgroundImage={movieImage}
      Movie="Movie"
      movieTitle="Fields of Destiny"
      subTitle="2023.Fantasy.Action"
      button1Text="Watch Now"
      button2Text="Add Watchlist"
      button1Action={handleWatchNow}
      button2Action={handleAddToWatchlist} />
      <div className="px-8 md:px-16 lg:px-32 ">
        <h2 className="text-white text-xl md:text-1xl lg:text-2xl font-bold mb-4">
          Story Line
        </h2>
        <p className="text-white text-sm mb-4">
          "Fields of Destiny" is a gripping tale of heroism and self-discovery. Set in a fantastical world, it follows the journey of a young warrior who must overcome personal demons to save their homeland. With breathtaking visuals and a powerful storyline, this movie keeps you on the edge of your seat until the very end.
          <span className="text-blue-500 cursor-pointer hover:underline">...more</span>
        </p>
      </div>

      <div className="px-8 md:px-16 lg:px-32 mt-8">
        <ScrollableCastRow title="Top Cast" castData={topCastData} />
      </div>

      {/* Separator line */}
      <hr className="border-t border-gray-600 my-8" />

      <div className="px-8 md:px-16 lg:px-32 mt-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#ffffff" loading={loading} size={50} />
          </div>
        ) : (
          <ScrollableRow title="Similar Movies for you" mockMovies={filteredMovies} />
        )}
        <Footer />
      </div>
    </>
  );
};

export default Movies;

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
              className="min-w-[300px]  rounded-lg overflow-hidden"
            >
              <img
                src={movie.imageUrl}
                alt={movie.name}
                className="w-full h-[150px] object-cover rounded-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">
                  {movie.name}
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