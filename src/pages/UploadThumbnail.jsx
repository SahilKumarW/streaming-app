import React, { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomInput from '../components/CustomeInput';
import Button from '../components/Button';
import VideoService from '../api/videoService';

const UploadThumbnail = () => {
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [filename, setFilename] = useState("");
    const [loading, setLoading] = useState(false);
    const [videoList, setVideoList] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null); // Store selected video UUID
    const [loadingVideos, setLoadingVideos] = useState(true); // Loading state for video list

    // Fetch video list on component mount
    useEffect(() => {
        const fetchVideoList = async () => {
            try {
                const response = await VideoService.showVideoList(); // Assuming this is your API for video list
                setVideoList(response.data); // Assuming response.data contains the list of videos
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
            console.log("Selected file:", file);  // Log the file to check if it's being selected
            setSelectedThumbnail(file); // Set the selected file
        }
    };

    // Handle the form submission (uploading the thumbnail)
    const handleSubmitToAPI = async () => {
        // Validate form inputs
        if (!filename.trim() || !selectedThumbnail || !selectedVideo) {
            toast.error("Please fill in all fields: select a video, filename, and upload a thumbnail.");
            return;
        }

        setLoading(true); // Set loading state to true during upload

        const formData = new FormData();
        console.log("Appending file to FormData:", selectedThumbnail);  // Log to check if the file is available
        formData.append('File', selectedThumbnail);  // Ensure selectedThumbnail is set properly
        formData.append('Description', filename);
        formData.append('VideoId', selectedVideo);
        console.log([...formData.entries()]); // Log entries to check their contents
        console.log("File type:", selectedThumbnail.type);
        console.log("File size:", selectedThumbnail.size);


        try {
            const response = await VideoService.uploadThumbnail(formData);
            if (response.status === 200) {
                toast.success("Thumbnail uploaded successfully!");
                // Clear form fields after successful upload
                setFilename("");
                setSelectedThumbnail(null);
                setSelectedVideo(null);
            }
        } catch (error) {
            toast.error("Upload failed. Please try again.");
        } finally {
            setLoading(false); // Reset loading state after operation completes
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
