import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import VideoService from "../api/videoService"; // Assuming this contains the getVideoById function
import VideoPlayer from "../pages/VideoPlayer";

const VideoTable = ({ videos = [] }) => {
    const { videoId } = useParams(); // Get the videoId from URL
    const [searchTerm, setSearchTerm] = React.useState("");
    const [error, setError] = React.useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null); // Store the selected video
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [currentVideoId, setCurrentVideoId] = useState(null); // Define currentVideoId state
    const [watchDuration, setWatchDuration] = useState(0);
    const navigate = useNavigate(); // useNavigate for navigation instead of useHistory

    const userId = localStorage.getItem("userId"); // If userId is stored in localStorage

    const videoRef = useRef(null);

    useEffect(() => {
        if (videoId) {
            // Fetch video details if videoId is in the URL
            const fetchVideo = async () => {
                try {
                    console.log("Fetching video details for videoId:", videoId);
                    const video = await VideoService.getVideoById(videoId);
                    console.log("Fetched video details:", video);
                    setSelectedVideo(video); // Set selected video from the API response
                } catch (err) {
                    console.error("Error fetching video details:", err);
                    setError("Video not found.");
                }
            };

            fetchVideo();
        }
    }, [videoId]);

    // Handle play video
    const handlePlay = async (video) => {
        if (video.url) {
            setVideoUrl(video.url);
            setIsVideoModalOpen(true);
            setCurrentVideoId(video.uuid);
            fetchWatchDuration(video.uuid); // Fetch user's watch history before starting

            const watchHistoryData = {
                id: video.uuid,
                userId: userId,
                videoId: video.uuid,
                vedioName: video.name,
                watchedOn: new Date().toISOString(),
                watchDuration: 0,
                isCompleted: false,
            };

            if (!userId || !video.uuid || !video.name) {
                toast.error("Failed to record watch history. Missing required data.");
                return;
            }

            try {
                await VideoService.watchHistoryAdd(watchHistoryData);
            } catch (error) {
                toast.error("Failed to record watch history.");
            }
        } else {
            toast.error("No video URL found for this video.");
        }
    };

    // Fetch watch duration from user's history
    const fetchWatchDuration = async (videoId) => {
        if (!userId || !videoId) return;

        try {
            const response = await VideoService.getUserWatchHistory(userId);
            const watchHistory = response?.data || [];
            const videoHistory = watchHistory.find((item) => item.videoId === videoId);

            if (videoHistory) {
                setWatchDuration(videoHistory.watchDuration); // Set watch duration if available
            } else {
                setWatchDuration(0); // If no history, start from 0
            }
        } catch (error) {
            console.error("Failed to fetch watch history:", error);
        }
    };

    // Handle modal close
    const handleCloseModal = () => {
        setIsVideoModalOpen(false);
        setVideoUrl("");
    };

    const handleSearch = (event) => {
        debouncedSearch(event.target.value);
    };

    // Debounce the search term to optimize performance
    const debounce = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    const debouncedSearch = debounce((value) => setSearchTerm(value), 300);

    const filteredVideos = Array.isArray(videos)
        ? videos.filter((video) =>
            video.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.genre?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className="overflow-x-auto">
            <div className="border-t border-l border-r border-white border-opacity-20 rounded-t-lg bg-stone-900">
                <div className="flex justify-between items-center p-4">
                    <p className="text-xl font-semibold text-white">All Videos</p>
                    <div className="flex items-center bg-stone-900 border border-white border-opacity-20 rounded-md p-1">
                        <input
                            type="text"
                            placeholder="Search Video"
                            className="bg-stone-900 text-white focus:outline-none"
                            onChange={handleSearch}
                            aria-label="Search Videos"
                        />
                        <i className="ri-search-line text-white ml-2" aria-hidden="true"></i>
                    </div>
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="border-b border-l border-r border-white border-opacity-20 rounded-b-lg overflow-hidden">
                <table className="table-auto w-full bg-black text-white">
                    <thead>
                        <tr>
                            <th className="p-4 text-left">Video Name</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">Genre</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVideos.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-4 text-center">
                                    No videos found.{" "}
                                    <button className="text-teal-500" onClick={() => navigate("/dashboard/uploadVideo")}>
                                        Add Video
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            filteredVideos.map((video) => (
                                <tr key={video.uuid}>
                                    <td className="p-4">{video.name}</td>
                                    <td className="p-4">{video.category}</td>
                                    <td className="p-4">{video.genre}</td>
                                    <td className="p-4">
                                        <button
                                            className="text-blue-500"
                                            onClick={() => handlePlay(video)}
                                        >
                                            Play Video
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {isVideoModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg relative w-[75%] h-[75%] max-w-[1200px] max-h-[800px] overflow-hidden">
                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                        <VideoPlayer
                            src={videoUrl}
                            startAt={watchDuration} // Pass the watch duration to the VideoPlayer
                            onClose={handleCloseModal}
                            videoRef={videoRef}
                        />
                    </div>
                </div>
            )}
        </div>

    );
};

export default VideoTable;
