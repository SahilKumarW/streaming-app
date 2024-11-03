import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VideoTable from "../components/VideoTable";
import Button from "../components/Button";
import VideoService from '../api/videoService';
import tom from "/Assets/tom.jpg";

const VideoManagement = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [videos, setVideos] = useState([]); // State for video list
    const [video, setVideo] = useState(null); // State for a single video

    useEffect(() => {
        if (id) {
            fetchVideoById(id);
        } else {
            fetchVideoList(); // Fetch all videos if no ID is present
        }
    }, [id]);

    const fetchVideoById = async (videoId) => {
        try {
            const response = await VideoService.getVideoById(videoId);
            setVideo(response.data);
        } catch (error) {
            console.error("Error fetching video:", error);
        }
    };

    const fetchVideoList = async () => {
        try {
            const response = await VideoService.showVideoList();
            setVideos(response.data); // Set the list of videos
        } catch (error) {
            console.error("Error fetching video list:", error);
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
                    {id && video ? (
                        <VideoTable videos={[video]} /> // Display single video if ID is present
                    ) : (
                        videos.length > 0 ? (
                            <VideoTable videos={videos} /> // Display all videos if ID is not present
                        ) : (
                            <p className="text-center text-white">Loading videos...</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoManagement;
