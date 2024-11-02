import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import VideoTable from "../components/VideoTable";
import Button from "../components/Button";
import VideoService from '../api/videoService';
import tom from "/Assets/tom.jpg";

const VideoManagement = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the video ID from the URL
    const [video, setVideo] = useState(null); // State for a single video

    useEffect(() => {
        if (id) {
            fetchVideoById(id); // Fetch the video if an ID is present
        }
    }, [id]);

    const fetchVideoById = async (videoId) => {
        try {
            const response = await VideoService.getVideoById(videoId);
            setVideo(response.data); // Set the fetched video data
        } catch (error) {
            console.error("Error fetching video:", error);
        }
    };

    return (
        <div className="right_section bg-black text-white min-h-screen">
            <div className="flex justify-between items-center p-10">
                <p className="text-2xl font-semibold">Administration</p>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <img src={tom} alt="User Avatar" className="w-10 h-10 rounded-full" />
                        <p>Tom Cruise</p>
                    </div>
                    <div className="flex items-center cursor-pointer gap-2">
                        <p>Logout</p>
                        <i className="ri-logout-circle-r-line mr-1"></i>
                    </div>
                </div>
            </div>

            <div className="bg-stone-800 justify-between items-center mb-8 px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-xl font-semibold">Manage Videos</p>
                        <p className="text-gray-400">
                            Administer and oversee video content and permissions within the platform.
                        </p>
                    </div>
                    <Button
                        name={"Add Video"}
                        className={"bg-teal-500 text-white px-4 py-2 rounded"}
                        onClick={() => navigate("/uploadVideo")}
                    />
                </div>
                <div className="flex items-end pb-0">
                    <p className="text-lg font-semibold cursor-pointer text-white underline text-teal-500">
                        Videos
                    </p>
                </div>
            </div>

            <div className="p-6 rounded-lg">
                <div className="overflow-y-auto max-h-96 rounded-lg">
                    {video ? (
                        <VideoTable videos={[video]} /> // Pass the single video in an array
                    ) : (
                        <p className="text-center text-white">Loading video...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoManagement;
