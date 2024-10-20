import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import VideoTable from "../components/VideoTable";
import tom from "/Assets/tom.jpg";
import VideoService from '../api/videoService';

const VideoManagement = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchVideos();
    }, [searchTerm]);

    const fetchVideos = async () => {
        try {
            const data = await VideoService.searchVideos(searchTerm);
            setVideos(data);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    return (
        <div className="right_section bg-black text-white min-h-screen">
            <div className="flex justify-between items-center p-10">
                <p className="text-2xl font-semibold">Administration</p>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <img
                            src={tom}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
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
                            Administer and oversee videos within the platform.
                        </p>
                    </div>
                    <Button
                        name={"Upload Video"}
                        className={"bg-teal-500 text-white px-4 py-2 rounded"}
                        onClick={() => navigate("/uploadvideo")}
                    />
                </div>
                {/* Tabs (videos Section) */}
                <div className="flex items-end pb-0">
                    {/* "Videos" Heading */}
                    <p
                        className={`text-lg font-semibold cursor-pointer text-white`}
                    >
                        Videos
                    </p>
                </div>
            </div>

            <div className="p-6 rounded-lg">
                <VideoTable
                    videos={videos}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    className="rounded-lg"
                />
            </div>
        </div>
    );
};

export default VideoManagement;
