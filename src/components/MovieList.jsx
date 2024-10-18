import React from "react";
import { moviesData } from "../static/data"; // Importing moviesData
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MovieList = () => {
  const navigate = useNavigate();

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft -= 200; // Adjust the scroll distance as needed
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += 200; // Adjust the scroll distance as needed
  };

  return (
    <>
      <h2
        className="text-3xl font-bold mb-4 text-center"
        style={{ textShadow: "2px 2px 5px orange" }}
      >
        Movies
      </h2>
      <div className={`${styles.section} relative`}>
        <IoIosArrowBack
          size={40}
          className="cursor-pointer hover:opacity-80 absolute top-1/2 transform -translate-y-1/2"
          onClick={slideLeft}
        />
        <div
          className={`p-6 overflow-x-scroll whitespace-nowrap scrollbar-hide rounded-lg`}
          style={{
            backgroundColor: "white",
            gap: "20px",
          }}
          id="slider"
        >
          {moviesData &&
            moviesData.map((movie) => {
              return (
                <div
                  key={movie.id}
                  onClick={() => navigate(`/movies/${movie.id}`)} // Adjust navigation to use movie ID
                  className={`inline-block w-1/4 mx-4 transition-transform transform`}
                  style={{
                    textAlign: "center",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={movie.imageUrl}
                    alt={movie.name}
                    className="w-full h-[200px] object-cover mb-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                    style={{ borderRadius: "10px" }} // Add border-radius to the image
                  />
                  <h5
                    className={`text-[16px] leading-[1.3] text-white bg-gray-900 py-2 rounded-md`}
                  >
                    {movie.name}
                  </h5>
                </div>
              );
            })}
        </div>
        <IoIosArrowForward
          size={40}
          className="cursor-pointer hover:opacity-80 absolute top-1/2 right-2 transform -translate-y-1/2"
          onClick={slideRight}
        />
      </div>
    </>
  );
};

export default MovieList;
