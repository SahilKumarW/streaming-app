import React from "react";
import Navbar from "./Navbar";
import { FaPlay, FaBookmark } from 'react-icons/fa';

const HeroSection = ({ backgroundImage, Movie,movieTitle, subTitle, button1Text, button2Text, button1Action, button2Action }) => {
  return (
    <>
      <div className="relative w-full h-[600px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-8 md:px-10 lg:px-32">
          <div className="bg-black text-white md:text-1xl lg:text-1xl font-normal mb-4 px-4 py-2 rounded-lg">
            {Movie}
          </div>
          <h4 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {movieTitle}
          </h4>
          <p className="text-white font-normal text-[14px] mb-8" style={{ fontFamily: 'Rubik, sans-serif' }}>
            {subTitle}
          </p>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={button1Action}
              className="bg-gradient-to-r from-[#1994BB] to-[#32AAA3] text-white px-8 py-3 text-lg font-semibold rounded-lg hover:opacity-80 flex items-center space-x-2"
            >
              <FaPlay className="w-4 h-5 mr-2" />
              <span>{button1Text}</span>
            </button>

            {/* Conditionally render button2 if both text and action are provided */}
            {button2Text && button2Action && (
              <button
                onClick={button2Action}
                className="border border-white text-white px-8 py-3 text-lg font-semibold rounded-lg hover:border-opacity-80 flex items-center space-x-2"
              >
                <FaBookmark className="w-5 h-5 mr-2" />
                <span>{button2Text}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
