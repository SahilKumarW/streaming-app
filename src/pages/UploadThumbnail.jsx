import React, { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomInput from '../components/CustomeInput';
import Button from '../components/Button';
import VideoService from '../api/videoService';
import { getAuthData } from '../api/axios';

const UploadThumbnail = () => {
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [filename, setFilename] = useState("");
    const [loading, setLoading] = useState(false);
    const [videoList, setVideoList] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loadingVideos, setLoadingVideos] = useState(true);

    // Fetch video list on component mount
    useEffect(() => {
        const fetchVideoList = async () => {
            try {
                const response = await VideoService.showVideoList();
                setVideoList(response.data);
            } catch (error) {
                toast.error("Failed to fetch video list.");
            } finally {
                setLoadingVideos(false);
            }
        };

        fetchVideoList();
    }, []);

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedThumbnail(file);
        }
    };

    // Handle the form submission (uploading or updating the thumbnail)
    const handleSubmitToAPI = async () => {
        if (!filename.trim() || !selectedThumbnail || !selectedVideo) {
            toast.error("Please fill in all fields: select a video, filename, and upload a thumbnail.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('File', selectedThumbnail);
        formData.append('Description', filename);
        formData.append('VideoId', selectedVideo);

        // Assuming you have a function to get the auth token
        const { token } = getAuthData();

        // Check if the video already has a thumbnail
        const selectedVideoData = videoList.find((video) => video.uuid === selectedVideo);
        const thumbnailExists = selectedVideoData && selectedVideoData.thumbnailUrl;

        try {
            if (thumbnailExists) {
                // If thumbnail exists, make PUT request to update it
                const response = await VideoService.updateThumbnail(formData, token);
                if (response && response.data && response.data.thumbnailUrl) {
                    toast.success("Thumbnail updated successfully!");
                } else {
                    toast.error("Failed to update thumbnail.");
                }
            } else {
                // Otherwise, make POST request to upload a new thumbnail
                const response = await VideoService.uploadThumbnail(formData, token);
                if (response && response.data && response.data.thumbnailUrl) {
                    toast.success("Thumbnail uploaded successfully!");
                } else {
                    toast.error("Failed to upload thumbnail.");
                }
            }
        } catch (error) {
            toast.error("Error occurred while uploading the thumbnail.");
        } finally {
            setLoading(false);
            // Clear form fields after successful upload
            setFilename("");
            setSelectedThumbnail(null);
            setSelectedVideo(null);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center bg-black p-4">
            <p className="text-[28px] leading-[38px] font-semibold text-white mt-8">Upload Thumbnail</p>
            <p className="text-[10px] leading-[22px] font-normal text-[#FFFFFF]">
                Please upload the thumbnail for the selected video.
            </p>

            {/* Video Dropdown Selection */}
            <div className="mt-4 w-[550px]">
                <select
                    className="w-full p-2 rounded-lg bg-gray-700 text-white"
                    value={selectedVideo || ""}
                    onChange={(e) => setSelectedVideo(e.target.value)}
                    disabled={loadingVideos}
                >
                    <option value="" disabled>Select Video</option>
                    {videoList.map((video) => (
                        <option key={video.uuid} value={video.uuid}>
                            {video.name} | {video.category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Thumbnail Upload Section */}
            <div className="relative w-[550px] h-[126px] outline-dashed rounded-lg mt-[27px] bg-black">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="thumbnail-upload"
                    required
                />
                <label htmlFor="thumbnail-upload" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d3d3d3] p-3 rounded-full cursor-pointer">
                    <FaCamera size={24} className="text-[#4A4A4A]" />
                </label>
            </div>

            {selectedThumbnail && <div className="mt-4 text-white"><p>Selected Thumbnail: {selectedThumbnail.name}</p></div>}

            {/* Filename Input */}
            <div className="mt-[50px]">
                <CustomInput placeholder="Filename" value={filename} onChange={(e) => setFilename(e.target.value)} />
            </div>

            {/* Upload Button */}
            <div className="mt-3">
                <Button name={loading ? "Uploading..." : "Upload Thumbnail"} onClick={handleSubmitToAPI} disabled={loading} />
            </div>

            {/* Toast Notifications */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
        </div>
    );
};

export default UploadThumbnail;
