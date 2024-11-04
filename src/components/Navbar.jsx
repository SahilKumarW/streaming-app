import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom"; // Import useLocation
import search from "../assets/search.svg";
import setting from "../assets/setting.svg";
import profile from "../assets/profile.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/slices/searchSlice";

const Navbar = () => {
  const location = useLocation();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query);

  const handleInputChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Determine if the current route is one of the specified routes
  const isTransparentBackground = [
    "/home",
    "/movies",
    "/tvseries",
    "/mylist",
    "/subscription"
  ].includes(location.pathname);

  return (
    <nav
      className={`h-[100px] text-white flex items-center justify-between px-8 py-2 ${isTransparentBackground ? "bg-transparent" : "bg-black"
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

      {/* Right Side - Icons */}
      <div className="flex space-x-6">
        {showSearchInput && (
          <input
            type="text"
            placeholder=" Search"
            value={searchQuery}
            onChange={handleInputChange}
            className="px-2 bg-black text-white border border-white rounded-[14px]"
          />
        )}

        <button>
          <img
            src={search}
            alt="search"
            onClick={() => setShowSearchInput(!showSearchInput)}
          />
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
    </nav>
  );
};

export default Navbar;
