// import React from "react";

// const VideoTable = ({ videos }) => {
//     return (
//         <div className="overflow-x-auto">
//             <div className="border-t border-l border-r border-white border-opacity-20 rounded-t-lg bg-stone-900">
//                 <div className="flex justify-between items-center p-4">
//                     <p className="text-xl font-semibold text-white">All Videos</p>
                    
//                 </div>
//             </div>

//             <div className="border-b border-l border-r border-white border-opacity-20 rounded-b-lg overflow-hidden">
//                 <table className="table-auto w-full bg-black text-white">
//                     <thead>
//                         <tr className="border-b border-gray-600">
                            
//                             <th className="px-4 py-2 border-r border-white border-opacity-10 text-left font-normal">Name</th>
//                             <th className="px-4 py-2 border-r border-white border-opacity-10 text-left font-normal">Categories</th>
//                             <th className="px-4 py-2 border-r border-white border-opacity-10 text-left font-normal">Date Uploaded</th>
//                             <th className="px-4 py-2 border-r border-white border-opacity-10 text-left font-normal">Release Date</th>
//                             <th className="px-10 py-2 text-left font-normal">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {videos.map((video) => (
//                             <tr key={video.id} className="border-b border-gray-600">
//                                 <td className="px-4 py-2 border-r border-gray-600 flex items-center gap-2 text-left text-sm">
//                                         <img
//                                             src={video.image}
//                                             alt={video.name}
//                                             className="w-8 h-8 rounded-full"
//                                         />
//                                         {video.name}
//                                     </td>
                                
//                                 <td className="px-4 py-2 border-r border-gray-600 text-left text-sm">{video.categories.join(", ")}</td>
//                                 <td className="px-4 py-2 border-r border-gray-600 text-left text-sm">{video.dateUploaded}</td>
//                                 <td className="px-4 py-2 border-r border-gray-600 text-left text-sm">{video.releaseDate}</td>
//                                 <td className="px-4 py-2 text-center">
//                                     <div className="flex justify-center gap-6">
//                                         <i className="ri-edit-line cursor-pointer"></i>
//                                         <i className="ri-delete-bin-line cursor-pointer"></i>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default VideoTable;

import React, { useState } from "react";

const VideoTable = ({ videos }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter videos based on the search term
    const filteredVideos = videos.filter((video) =>
        video.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="overflow-x-auto">
            <div className="border-t border-l border-r border-white border-opacity-20 rounded-t-lg bg-stone-900">
                <div className="flex justify-between items-center p-4">
                    <p className="text-xl font-semibold text-white">All Videos</p>
                    
                    {/* Search Box with Icon */}
                    <div className="flex items-center border border-gray-600 rounded-lg bg-stone-900 pl-3 pr-2 py-1">
                        
                        <input
                            type="text"
                            placeholder="Search videos..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="bg-stone-900 outline-none text-white "
                        />
                        <i className="ri-search-line text-white mr-2"></i>
                    </div>
                </div>
            </div>

            <div className="border-b border-l border-r border-white border-opacity-20 rounded-b-lg overflow-hidden">
                <table className="table-auto w-full bg-black text-white">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="px-4 py-2 border-r border-white border-opacity-10 text-left font-normal">Name</th>
                            <th className="px-4 py-2 border-r border-white border-opacity-10 text-left font-normal">Categories</th>
                            <th className="px-4 py-2 border-r border-white border-opacity-10 text-left font-normal">Date Uploaded</th>
                            <th className="px-4 py-2 border-r border-white border-opacity-10 text-left font-normal">Release Date</th>
                            <th className="px-10 py-2 text-left font-normal">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredVideos.map((video) => (
                            <tr key={video.id} className="border-b border-gray-600">
                                <td className="px-4 py-2 border-r border-gray-600 flex items-center gap-2 text-left text-sm">
                                    <img
                                        src={video.image}
                                        alt={video.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    {video.name}
                                </td>
                                <td className="px-4 py-2 border-r border-gray-600 text-left text-sm">
                                    {video.categories.join(", ")}
                                </td>
                                <td className="px-4 py-2 border-r border-gray-600 text-left text-sm">
                                    {video.dateUploaded}
                                </td>
                                <td className="px-4 py-2 border-r border-gray-600 text-left text-sm">
                                    {video.releaseDate}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <div className="flex justify-center gap-6">
                                        <i className="ri-edit-line cursor-pointer"></i>
                                        <i className="ri-delete-bin-line cursor-pointer"></i>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VideoTable;
