import React, { useEffect } from "react";

const VideoTable = ({ videos = [], onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [error, setError] = React.useState(null);

    // Log the videos list when the component mounts
    useEffect(() => {
        console.log("Videos List:", videos);
    }, [videos]);

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

    // Log filteredVideos after it's defined
    console.log("Filtered Videos:", filteredVideos);

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
                                    <button className="text-teal-500" onClick={() => window.location.href = "/uploadVideo"}>
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
                                            className="text-blue-500 mr-2"
                                            onClick={() => {
                                                console.log("Editing video:", video);
                                                onEdit(video);
                                            }}
                                            aria-label={`Edit ${video.name}`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500"
                                            onClick={() => {
                                                if (window.confirm(`Are you sure you want to delete ${video.name}?`)) {
                                                    onDelete(video.uuid);
                                                }
                                            }}
                                            aria-label={`Delete ${video.name}`}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VideoTable;
