import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VideoTable from "../components/VideoTable";
import Button from "../components/Button";
import VideoService from '../api/videoService';
import tom from "/Assets/tom.jpg";

const VideoManagement = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // Get the video ID from the URL
    const [videos, setVideos] = useState([]); // State for the list of videos
    const [video, setVideo] = useState(null); // State for a single video
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Fetch the logged-in user's name from local storage
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
            setUserName(storedUserName); // Set the user name in state
        }
    }, []);

    // Fetch video or list of videos based on URL parameter (id)
    useEffect(() => {
        if (id) {
            // If an ID is provided, fetch the single video by its ID
            fetchVideoById(id);
        } else {
            // If no ID is present, fetch the list of videos
            fetchVideoList();
        }
    }, [id]);  // Re-fetch when the ID changes

    const fetchVideoById = async (videoId) => {
        try {
            const response = await VideoService.getVideoById(videoId);
            setVideo(response.data);  // Set the fetched video
        } catch (error) {
            console.error("Error fetching video:", error);
        }
    };

    const fetchVideoList = async () => {
        try {
            const response = await VideoService.getAllVideos();
            setVideos(response.data); // Set the list of videos
        } catch (error) {
            console.error("Error fetching video list:", error);
        }
    };

    // Placeholder function for uploading or updating a thumbnail
    const handleThumbnailUpload = () => {
        console.log("Handle Add/Update Thumbnail");
        // Implement thumbnail upload logic here
    };

    // Logout function
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");  // Navigate to login page after logout
    };

    return (
        <div className="right_section bg-black text-white min-h-screen">
            {/* First fixed header */}
            <div className="sticky top-0 bg-black text-white z-10 flex justify-between items-center p-4 px-6">
                <p className="text-2xl font-semibold">Administration</p>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <img src={tom} alt="User Avatar" className="w-10 h-10 rounded-full" />
                        <p>{userName || "Guest"}</p> {/* Display the username */}
                    </div>
                    <div className="flex items-center cursor-pointer gap-2" onClick={handleLogout}>
                        <p>Logout</p>
                        <i className="ri-logout-circle-r-line mr-1"></i>
                    </div>
                </div>
            </div>

            {/* Second fixed header */}
            <div className="sticky top-16 bg-stone-800 z-10 justify-between items-center py-4 px-6">
                <div className="flex justify-between items-center w-full">
                    <div>
                        <p className="text-xl font-semibold">Manage Videos</p>
                        <p className="text-gray-400">
                            Administer and oversee video content and permissions within the platform.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            name={"Add Video"}
                            className={"bg-teal-500 text-white px-4 py-2 rounded"}
                            onClick={() => navigate("/dashboard/uploadVideo")}
                        />
                        {/* Add/Update Thumbnail button */}
                        <Button
                            name={"Add/Update Thumbnail"}
                            className={"bg-teal-500 text-white px-4 py-2 rounded"}
                            onClick={() => navigate("/dashboard/uploadThumbnail")}
                        />
                    </div>
                </div>
                {/* <div className="flex items-end pb-0">
                    <p className="text-lg font-semibold cursor-pointer text-white underline text-teal-500">
                        Videos
                    </p>
                </div> */}
            </div>

            {/* Scrollable content */}
            <div className="p-6 rounded-lg overflow-y-auto" style={{ maxHeight: 'calc(100vh - 192px)' }}>
                <div className="overflow-y-auto max-h-96 rounded-lg">
                    {/* Display single video if ID is present, otherwise display all videos */}
                    {id && video ? (
                        <VideoTable videos={[video]} />  // Display the single video in the array format
                    ) : (
                        videos.length > 0 ? (
                            <VideoTable videos={videos} />  // Display all videos if no ID
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