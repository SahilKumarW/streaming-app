import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoService from "../api/videoService";
import VideoPlayer from "../pages/VideoPlayer";
import EditVideoModal from "../Modals/EditVideoModal";
import { toast } from "react-toastify";

const VideoTable = ({ videos = [] }) => {
    const { videoId } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [watchDuration, setWatchDuration] = useState(0);
    const [videoList, setVideoList] = useState(videos);  // Track videos state locally
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoId) {
            const fetchVideo = async () => {
                try {
                    const video = await VideoService.getVideoById(videoId);
                    setSelectedVideo(video);
                } catch (err) {
                    setError("Video not found.");
                }
            };
            fetchVideo();
        }
    }, [videoId]);

    const handlePlay = async (video) => {
        if (video.url) {
            setVideoUrl(video.url);
            setIsVideoModalOpen(true);
            setCurrentVideoId(video.uuid);
            fetchWatchDuration(video.uuid);

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
            } catch {
                toast.error("Failed to record watch history.");
            }
        } else {
            toast.error("No video URL found for this video.");
        }
    };

    const handleEdit = (video) => {
        setSelectedVideo(video);
        setIsEditModalOpen(true);
    };

    const fetchWatchDuration = async (videoId) => {
        if (!userId || !videoId) return;

        try {
            const response = await VideoService.getUserWatchHistory(userId);
            const watchHistory = response?.data || [];
            const videoHistory = watchHistory.find((item) => item.videoId === videoId);

            if (videoHistory) {
                setWatchDuration(videoHistory.watchDuration);
            } else {
                setWatchDuration(0);
            }
        } catch {
            console.error("Failed to fetch watch history.");
        }
    };

    const handleCloseModal = () => {
        setIsVideoModalOpen(false);
        setVideoUrl("");
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.trim());
    };

    const filteredVideos = Array.isArray(videoList)
        ? videoList.filter((video) =>
            video.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.genre?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleSaveEdit = async (updatedVideo) => {
        try {
            // await VideoService.editVideoMetadata(updatedVideo);
            toast.success("Video updated successfully!");
            setIsEditModalOpen(false);

            // Update the video list locally
            setVideoList((prevVideos) =>
                prevVideos.map((video) =>
                    video.uuid === updatedVideo.uuid ? updatedVideo : video
                )
            );
        } catch (err) {
            toast.error("Failed to update video.");
            console.error("Error updating video:", err);
        }
    };

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
                                    <button
                                        className="text-teal-500"
                                        onClick={() => navigate("/dashboard/uploadVideo")}
                                    >
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
                                    <td className="p-4 space-x-2">
                                        <button
                                            className="text-blue-500"
                                            onClick={() => handlePlay(video)}
                                        >
                                            Play
                                        </button>
                                        <button
                                            className="text-green-500"
                                            onClick={() => handleEdit(video)}
                                        >
                                            Edit
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
                            startAt={watchDuration}
                            onClose={handleCloseModal}
                            videoRef={videoRef}
                        />
                    </div>
                </div>
            )}
            {isEditModalOpen && selectedVideo && (
                <EditVideoModal
                    video={selectedVideo}
                    onSave={handleSaveEdit}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default VideoTable;
