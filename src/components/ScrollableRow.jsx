import React, { useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FaStar, FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import MovieCard from "./MovieCard";

const ScrollableRow = ({ title, movies, loading, showProgress }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
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
            className="flex gap-4 overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <MovieCard key={index} showProgress={showProgress} movie={movie} index={index}/>
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
