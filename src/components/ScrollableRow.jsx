import React, { useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FaStar, FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";

const ScrollableRow = ({ title, movies, loading, showProgress }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mb-8 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold">
          {title}
        </h2>
        {showProgress && (
          <div className="text-white text-sm">
            Season 1 <FaChevronDown className="inline ml-1" />
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <ClipLoader color={"#fff"} loading={true} size={50} />
        </div>
      ) : (
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
            onClick={() => scroll("left")}
          >
            <FaChevronLeft />
          </button>
          <div
            ref={scrollRef}
            className="flex"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Movie cards */}
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <div
                  key={index}
                  className="min-w-[300px] rounded-lg overflow-hidden relative flex-shrink-0"
                >
                  <img
                    src={movie.imageUrl}
                    alt={movie.name}
                    className="w-full h-[150px] object-cover rounded-lg"
                  />
                  {showProgress ? (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-lg font-semibold text-white capitalize mb-2">
                        {`Chapter ${index + 1}`}
                      </h3>
                      <p className="text-sm text-gray-300 mb-2">
                        The chapter about {movie.name.toLowerCase()} just want to go out from his palace to get freedom...
                      </p>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{formatTime(movie.progress * 1.2)}</span>
                        <span>{formatTime(120)}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div
                          className="bg-green-500 h-1 rounded-full"
                          style={{ width: `${movie.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white capitalize mb-2">
                        {movie.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-gray-300">{movie.rating || "N/A"}</span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {movie.description}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-lg font-semibold text-white">No data found</p>
            )}
          </div>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
            onClick={() => scroll("right")}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollableRow;
