import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FaStar } from "react-icons/fa";

const ScrollableRow = ({ title, movies, loading }) => {
  return (
    <div className="mb-8">
      {/* Title of the row */}
      <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4">
        {title}
      </h2>
      
      {/* Loading state: Show spinner if data is still being fetched */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <ClipLoader color={"#fff"} loading={true} size={50} />
        </div>
      ) : (
        <div
          className="overflow-x-scroll scrollbar-hide flex space-x-4"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Movie cards */}
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div
                key={index}
                className="min-w-[300px] rounded-lg overflow-hidden"
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.name}
                  className="w-full h-[150px] object-cover rounded-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white capitalize">
                    {movie.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500 flex items-center">
                      <FaStar />
                      <span className="ml-1">4.6</span>
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

export default ScrollableRow;
