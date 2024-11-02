import React, { useState } from "react";
import VideoService from "../api/videoService";

const StarRating = ({ videoId, userId }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleRating = async (rate) => {
        setRating(rate);
        try {
            await VideoService.rateVideo({ videoId, userId, rating: rate });
            console.log(`Rated video ${videoId} with ${rate} stars`);
        } catch (error) {
            console.error("Error rating video:", error);
        }
    };

    return (
        <div className="star-rating flex">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <span
                        key={index}
                        className={`cursor-pointer ${ratingValue <= (hover || rating) ? "text-yellow-500" : "text-gray-400"
                            }`}
                        onClick={() => handleRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        &#9733;
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;
