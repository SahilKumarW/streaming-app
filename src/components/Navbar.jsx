import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import search from "../assets/search.svg";
import setting from "../assets/setting.svg";
import profile from "../assets/profile.svg";
import VideoService from "../api/videoService"; // Import VideoService
import MovieCard from "./MovieCard"; // Import MovieCard component

const Navbar = ({ setMovies }) => {
  console.log("Set Movies Received: ", setMovies); // This should log the setMovies function if passed correctly
  const location = useLocation();
  const [showSearchInputs, setShowSearchInputs] = useState(false);
  const [searchByName, setSearchByName] = useState("");
  const [searchByCategory, setSearchByCategory] = useState("");
  const [searchByGenre, setSearchByGenre] = useState("");

  const handleSearch = async () => {
    try {
      const results = await VideoService.searchVideos({
        name: searchByName,
        genre: searchByGenre,
        category: searchByCategory,
      });

      setMovies(results); // Pass the results to parent or state to render
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const isTransparentBackground = [
    "/home",
    "/movies",
    "/tvseries",
    "/mylist",
    "/subscription",
  ].includes(location.pathname);

  return (
    <nav
      className={`relative h-[100px] text-white flex items-center justify-between px-8 py-2 ${isTransparentBackground ? "bg-transparent" : "bg-black"
        }`}
    >
      {/* Center - Links */}
      <div className="flex items-center justify-center space-x-8 mx-auto">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive
              ? "text-[15px] font-semibold leading-[100px] underline text-white"
              : "text-[15px] font-semibold leading-[100px]"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive
              ? "text-[15px] font-semibold leading-[100px] underline text-white"
              : "text-[15px] font-semibold leading-[100px]"
          }
        >
          Movies
        </NavLink>
        <NavLink
          to="/tvseries"
          className={({ isActive }) =>
            isActive
              ? "text-[15px] font-semibold leading-[100px] underline text-white"
              : "text-[15px] font-semibold leading-[100px]"
          }
        >
          TV Series
        </NavLink>
        <NavLink
          to="/mylist"
          className={({ isActive }) =>
            isActive
              ? "text-[15px] font-semibold leading-[100px] underline text-white"
              : "text-[15px] font-semibold leading-[100px]"
          }
        >
          My List
        </NavLink>
        <NavLink
          to="/subscription"
          className={({ isActive }) =>
            isActive
              ? "text-[15px] font-semibold leading-[100px] underline text-white"
              : "text-[15px] font-semibold leading-[100px]"
          }
        >
          Subscription
        </NavLink>
      </div>

      {/* Right Side - Icons and Search Inputs */}
      <div className="relative">
        <div className="flex space-x-4 items-center">
          <button onClick={() => setShowSearchInputs(!showSearchInputs)}>
            <img src={search} alt="search" className="cursor-pointer" />
          </button>
          <button>
            <NavLink to="/account-settings">
              <img src={setting} alt="settings" />
            </NavLink>
          </button>
          <button>
            <img src={profile} alt="profile" />
          </button>
        </div>

        {/* Search Inputs - Positioned Below */}
        {showSearchInputs && (
          <div className="absolute top-[60px] right-0 bg-black p-4 rounded-lg shadow-lg flex flex-col space-y-2 w-[300px]">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
              className="px-2 py-1 bg-black text-white border border-white rounded-[14px] focus:outline-none"
            />

            <select
              value={searchByCategory}
              onChange={(e) => setSearchByCategory(e.target.value)}
              className="px-2 py-1 bg-black text-white border border-white rounded-[14px] focus:outline-none"
            >
              <option value="">Search by Category</option>
              <option value="Movies">Movies</option>
              <option value="TV Series">TV Series</option>
            </select>

            <select
              value={searchByGenre}
              onChange={(e) => setSearchByGenre(e.target.value)}
              className="px-2 py-1 bg-black text-white border border-white rounded-[14px] focus:outline-none"
            >
              <option value="">Search by Genre</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Horror">Horror</option>
              <option value="Historical">Historical</option>
              <option value="Thriller">Thriller</option>
              <option value="Romance">Romance</option>
              <option value="Supernatural">Supernatural</option>
              <option value="Fantasy">Fantasy</option>
              <option value="SciFi">Sci-Fi</option>
              <option value="Documentary">Documentary</option>
            </select>

            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-[14px] hover:bg-blue-600 focus:outline-none"
            >
              Search
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
