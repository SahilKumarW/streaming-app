import React, { useState } from "react";
import ScrollableRow from "../components/ScrollableRow";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const SearchResults = () => {
    const location = useLocation();
    const [movieSelected, setMovieSelected] = useState(null); // State to handle selected movie for video playback
    const movies = location.state?.movies || []; // Get movies from state, fallback to empty array
    const loading = movies.length === 0; // Simulate loading state

    const handleCardClick = (movie) => {
        console.log(`Selected Movie: ${movie.name}`);
        setMovieSelected(movie); // Set the selected movie for video playback
    };

    return (
        <>
            {/* Navbar */}
            <div className="relative z-20">
                <Navbar />
            </div>
            {/* Render VideoPlayer if a movie is selected */}
            {movieSelected && (
                <VideoPlayer
                    src={movieSelected.url}
                    startTime={0} // Replace with actual start time if needed
                />
            )}

            <div className="px-8 md:px-16 lg:px-32 mt-8">
                <ScrollableRow
                    title="Search Results"
                    loading={loading}
                    movies={movies.map((movie) => ({
                        ...movie,
                        onClick: () => handleCardClick(movie), // Handle movie card click
                    }))}
                />
            </div>
        </>
    );
};

export default SearchResults;
