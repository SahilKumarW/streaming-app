// import React, { useState } from "react";
// import Button from "../components/Button";
// import { useNavigate } from "react-router-dom";
// import VideoTable from "../components/VideoTable"; 
// import tom from "/Assets/tom.jpg";

// const VideoManagement = () => {
//     const navigate = useNavigate();

//     const [videos, setVideos] = useState([
//         {
//             id: 1,
//             name: "Inception",
//             categories: ["Action", "Sci-Fi"],
//             dateUploaded: "01-02-2023",
//             releaseDate: "16-07-2010",
//             image: "/Assets/brad.jpg", 
//         },
//         {
//             id: 2,
//             name: "The Dark Knight",
//             categories: ["Action", "Drama"],
//             dateUploaded: "15-03-2023",
//             releaseDate: "18-07-2008",
//             image: "/Assets/jeo.jpg", 
//         },
//         {
//             id: 3,
//             name: "Interstellar",
//             categories: ["Sci-Fi", "Adventure"],
//             dateUploaded: "05-09-2023",
//             releaseDate: "07-11-2014",
//             image: "/Assets/bale.jpg", 
//         },
//         {
//             id: 4,
//             name: "The Matrix",
//             categories: ["Action", "Sci-Fi"],
//             dateUploaded: "11-12-2023",
//             releaseDate: "31-03-1999",
//             image: "/Assets/tom.jpg", 
//         },
//         {
//             id: 5,
//             name: "Avengers: Endgame",
//             categories: ["Action", "Adventure"],
//             dateUploaded: "20-06-2023",
//             releaseDate: "26-04-2019",
//             image: "/Assets/mathew.png",
//         },
//     ]);

//     const [activeTab, setActiveTab] = useState("videos");

//     return (
//         <div className="right_section bg-black text-white min-h-screen">
//             <div className="flex justify-between items-center p-10">
//                 <p className="text-2xl font-semibold">Administration</p>
//                 <div className="flex items-center gap-8">
//                     <div className="flex items-center gap-2">
//                         <img
//                             src={tom}
//                             alt="User Avatar"
//                             className="w-10 h-10 rounded-full"
//                         />
//                         <p>Tom Cruise</p>
//                     </div>

//                     <div className="flex items-center cursor-pointer gap-2">
//                         <p>Logout</p>
//                         <i className="ri-logout-circle-r-line mr-1"></i>
//                     </div>
//                 </div>
//             </div>
//             <div className="bg-stone-800 justify-between items-center mb-8 px-8 py-8">
//                 <div className="flex justify-between items-center mb-6">
//                     <div>
//                         <p className="text-xl font-semibold">Manage Videos</p>
//                         <p className="text-gray-400">
//                             Administer and oversee videos within the platform.
//                         </p>
//                     </div>
//                     <Button
//                         name={"Upload Video"}
//                         className={"bg-teal-500 text-white px-4 py-2 rounded"}
//                         onClick={() => navigate("/uploadvideo")}
//                     />
//                 </div>
//                 {/* Tabs (videos Section) */}
//                 <div className="flex items-end pb-0">
//                     {/* "Videos" Heading */}
//                     <p
//                         className={`text-lg font-semibold cursor-pointer text-white ${activeTab === "videos" ? "underline text-teal-500" : ""
//                             }`}
//                         onClick={() => setActiveTab("videos")}
//                     >
//                         Videos
//                     </p>
//                 </div>
//             </div>

//             <div className="p-6 rounded-lg">
//                 {/* Display Video Table if the "Videos" tab is active */}
//                 {activeTab === "videos" && (
//                     <>
//                         <VideoTable
//                             videos={videos}
//                             className="rounded-lg" // Adding rounded corners to the table
//                         />
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default VideoManagement;

import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import VideoTable from "../components/VideoTable";
import tom from "/Assets/tom.jpg";
import axios from "axios";
import { get } from "../api/axios";

const VideoManagement = () => {
    const navigate = useNavigate();
    // const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [videos, setVideos] = useState([
        {
            id: 1,
            name: "Inception",
            categories: ["Action", "Sci-Fi"],
            dateUploaded: "01-02-2023",
            releaseDate: "16-07-2010",
            image: "/Assets/brad.jpg", 
        },
        {
            id: 2,
            name: "The Dark Knight",
            categories: ["Action", "Drama"],
            dateUploaded: "15-03-2023",
            releaseDate: "18-07-2008",
            image: "/Assets/jeo.jpg", 
        },
        {
            id: 3,
            name: "Interstellar",
            categories: ["Sci-Fi", "Adventure"],
            dateUploaded: "05-09-2023",
            releaseDate: "07-11-2014",
            image: "/Assets/bale.jpg", 
        },
        {
            id: 4,
            name: "The Matrix",
            categories: ["Action", "Sci-Fi"],
            dateUploaded: "11-12-2023",
            releaseDate: "31-03-1999",
            image: "/Assets/tom.jpg", 
        },
        {
            id: 5,
            name: "Avengers: Endgame",
            categories: ["Action", "Adventure"],
            dateUploaded: "20-06-2023",
            releaseDate: "26-04-2019",
            image: "/Assets/mathew.png",
        },
    ]);

    // Fetch videos based on the search term
    useEffect(() => {
        if (searchTerm.trim() === "") {
            // Fetch all videos if no search term is present
            fetchVideos();
        } else {
            // Fetch videos matching the search term
            searchVideos(searchTerm);
        }
    }, [searchTerm]);

    const fetchVideos = async () => {
        try {
            const response = await axios.get("/api/UploadVedios/Search");
            setVideos(response.data);  // Assume response.data contains the video list
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const searchVideos = async () => {
        const authToken = localStorage.getItem('authToken');
        try {
            const data = await get(`/api/UploadVedios/Search?query=${searchTerm}`, authToken);
            console.log(data);  // Handle your data as needed
            setVideos(data);  // Update state with the search results
        } catch (error) {
            console.error('Error searching videos:', error);
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
                {/* Display Video Table if the "Videos" tab is active */}
                <VideoTable
                    videos={videos}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm} // Pass search term and setter to the table
                    className="rounded-lg" // Adding rounded corners to the table
                />
            </div>
        </div>
    );
};

export default VideoManagement;

