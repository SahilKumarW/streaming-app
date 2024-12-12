import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import VideoService from "../api/videoService";

const categories = [
    { display: "Movies", value: "Movies" },
    { display: "TV Shows", value: "TVShows" },
];
const genreOptions = [
    "Action", "Adventure", "Horror", "Historical",
    "Thriller", "Romance", "Supernatural", "Fantasy",
    "SciFi", "Documentary"
];

const EditVideoModal = ({ video, onSave, onClose }) => {
    const [editedVideo, setEditedVideo] = useState({
        name: "",
        category: "",  // Initialize category with video category
        genre: "",     // Initialize genre with video genre
    });

    useEffect(() => {
        if (video) {
            setEditedVideo({
                ...video, // Directly use the video object to set default values
                category: video.category, // Keep original category value
                genre: video.genre,       // Keep original genre value
            });
        }
    }, [video]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedVideo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        const { name, category, genre } = editedVideo;

        if (!name || category === "" || genre === "") {
            toast.error("Please fill all the fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category); // Send category as is
        formData.append("genre", genre);       // Send genre as is

        try {
            await VideoService.editVideoMetadata(video.uuid, formData);
            // toast.success("Video metadata updated successfully!");

            if (onSave) {
                onSave({
                    ...editedVideo,
                });
            }

            onClose();
        } catch (error) {
            console.error("Error updating video metadata:", error);
            toast.error("Failed to update video metadata.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md h-[60vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Edit Video</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={editedVideo.name || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-md"
                        placeholder="Video Name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        value={editedVideo.category || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-md"
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.value}>
                                {category.display}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Genre</label>
                    <select
                        name="genre"
                        value={editedVideo.genre || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-md"
                    >
                        <option value="" disabled>
                            Select Genre
                        </option>
                        {genreOptions.map((genre, index) => (
                            <option key={index} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-teal-500 text-white px-4 py-2 rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditVideoModal;
