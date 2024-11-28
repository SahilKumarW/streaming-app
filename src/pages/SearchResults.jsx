import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ScrollableRow from "../components/ScrollableRow";
import Navbar from "../components/Navbar";
import VideoPlayer from "./VideoPlayer";

const SearchResults = () => {
    const location = useLocation();
    const [movieSelected, setMovieSelected] = useState(null); // Handle selected movie for playback

    // Use location.state to get the updated search results from the navigation state
    const movies = location.state?.movies || []; // Default to empty array if no state
    const loading = movies.length === 0; // Simulate loading state

    // Check if movies are empty or null and display the message
    const noResultsMessage = (movies === null || movies.length === 0) ? "No results found" : null;

    const handleCardClick = (movie) => {
        console.log(`Selected Movie: ${movie.name}`);
        setMovieSelected(movie); // Set selected movie for playback
    };

    useEffect(() => {
        // You can handle additional logic here if needed, like fetching new data
    }, [location.state?.movies]); // This ensures it triggers when state changes

    return (
        <>
            {/* Navbar */}
            <div className="relative z-20">
                <Navbar setMovies={() => { }} /> {/* If you don't need to update movies, pass an empty function */}
            </div>

            {/* Render VideoPlayer if a movie is selected */}
            {movieSelected && (
                <VideoPlayer
                    src={movieSelected.url}
                    startTime={0} // Replace with actual start time if needed
                />
            )}

            {/* Display No Results message if movies are empty */}
            {noResultsMessage && (
                <div className="text-center mt-4 text-white font-semibold text-xl">
                    {noResultsMessage}
                </div>
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
