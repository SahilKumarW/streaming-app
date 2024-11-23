import instance from './axios'; // Ensure this is configured correctly
import { post, get, put, getAuthData } from './axios';

const BASE_URL = '/UploadVedios';

// Function to check if the user has admin access
const isAdmin = () => {
    const role = localStorage.getItem('role');
    if (role !== 'Admin') {
        console.error("Access denied: Only Admins can access this endpoint.");
        return false;
    }
    return true;
};

const VideoService = {
    // Function to store video with corrected request handling and admin check
    storeVideo: async (formData) => {
        const file = formData.get('video');
        if (!file || !(file instanceof File)) {
            throw new Error("Video file is missing or invalid.");
        }

        // Check if the user is an admin
        if (!isAdmin()) {
            throw new Error("Only admins can upload videos.");
        }

        // Retrieve authorization data
        const { token, userId } = getAuthData();
        if (!userId) {
            throw new Error("User ID not found. Cannot proceed with upload.");
        }

        // Construct the upload URL with userId as a query parameter
        const url = `${BASE_URL}/StoreVideo`;

        try {
            // Send POST request to upload the video
            const response = await post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // Include token only if user is admin
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            });
            return response.data; // Return the response data if successful
        } catch (error) {
            console.error("Error uploading video:", error.response ? error.response.data : error.message);
            throw error; // Re-throw the error for external handling
        }
    },

    // API call to add video to watch history
    watchHistoryAdd: async ({ userId, videoId, vedioName, watchedOn, watchDuration, isCompleted }) => {
        try {
            // Ensure watchDuration is a string in the correct format (e.g., "00:00:30")
            const formattedWatchDuration = watchDuration === 0 ? "00:00:00" : watchDuration; // Adjust as needed

            const response = await post(`${BASE_URL}/watch-history-add`, {
                userId,
                videoId,
                vedioName,
                watchedOn,
                watchDuration: formattedWatchDuration, // Ensure correct format
                isCompleted,
            }, getAuthData());

            console.log("Sending watch history data:", { userId, videoId, vedioName, watchedOn, formattedWatchDuration, isCompleted });

            return response.data;
        } catch (error) {
            // Handle error more thoroughly
            if (error.response) {
                console.error("Error response from server:", error.response.data); // Server error details
                console.error("Error status:", error.response.status); // Status code
            } else if (error.request) {
                console.error("No response received from server:", error.request); // Network error or no response
            } else {
                console.error("Error message:", error.message); // General error message
            }

            throw error; // Re-throw to handle it later
        }
    },

    // API call to update watch history
    watchHistoryUpdate: async (
        { userId, videoId, vedioName, watchedOn, watchDuration, isCompleted },
        watchHistoryId
    ) => {
        try {
            const response = await post(
                `${BASE_URL}/watch-history-update/${watchHistoryId}`,
                {
                    userId,
                    videoId,
                    vedioName,
                    watchedOn,
                    watchDuration,
                    isCompleted,
                },
                getAuthData()
            );
            return response.data;
        } catch (error) {
            console.error("Error updating watch history:", error);
            throw error;
        }
    },

    // Get user watch history
    // getUserWatchHistory: async () => {
    //     const { token, userId } = getAuthData(); // Retrieve token and userId
    //     if (!token || !userId) {
    //         throw new Error('User is not authenticated');
    //     }

    //     try {
    //         const response = await axios.get(`${BASE_URL}/get-user-watch-history/${userId}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'accept': 'text/plain', // Set the accept header as per the curl request
    //             },
    //         });

    //         const watchHistory = response.data.data || []; // Get the 'data' array from the response

    //         // Format and return the watch history in a more structured way
    //         const formattedHistory = watchHistory.map(item => ({
    //             id: item.id,
    //             videoId: item.videoId,
    //             videoName: item.videoName,
    //             watchedOn: item.watchedOn,
    //             watchDuration: item.watchDuration,
    //             isCompleted: item.isCompleted,
    //             videoDetails: {
    //                 name: item.videoDetails.name,
    //                 genre: item.videoDetails.genre,
    //                 category: item.videoDetails.category,
    //                 url: item.videoDetails.url,
    //                 thumbnailUrl: item.videoDetails.thumbnail.thumbnailUrl,
    //             },
    //             userDetails: {
    //                 userId: item.userDetails.id,
    //                 userName: item.userDetails.name,
    //                 userEmail: item.userDetails.email,
    //             },
    //         }));

    //         return formattedHistory; // Return the formatted history
    //     } catch (error) {
    //         console.error("Error fetching user watch history:", error.response?.data || error.message);
    //         throw error; // Re-throw the error to handle it later
    //     }
    // },

    // Upload thumbnail to the server
    uploadThumbnail: async (formData, token) => {
        if (!formData || !(formData instanceof FormData)) {
            throw new Error("FormData is required for uploading the thumbnail.");
        }

        try {
            const response = await post(`${BASE_URL}/upload-thumbnail`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // Include token for authorization
                },
            });

            return response; // Return the response data from the API
        } catch (error) {
            console.error("Error uploading thumbnail:", error.response ? error.response.data : error.message);
            throw error; // Re-throw the error to handle it later
        }
    },

    updateThumbnail: async (formData, token) => {
        if (!formData || !(formData instanceof FormData)) {
            throw new Error("FormData is required for updating the thumbnail.");
        }

        try {
            const response = await put(`${BASE_URL}/update-thumbnail`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // Include token for authorization
                },
            });

            return response; // Return the response data from the API
        } catch (error) {
            console.error("Error updating thumbnail:", error.response ? error.response.data : error.message);
            throw error; // Re-throw the error to handle it later
        }
    },

    // Store video by URL
    storeVideoByUrl: async (urlData) => {
        const { token } = getAuthData();
        return await post(`${BASE_URL}/Store-url`, urlData, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },


    // Rate video
    rateVideo: async ({ videoId, rating }) => {
        const { token, userId } = getAuthData();
        if (!videoId || !rating) {
            throw new Error("Both videoId and rating are required.");
        }

        const ratingData = {
            videoId,
            rating,
            userId, // Optionally include userId if needed for tracking
        };

        try {
            const response = await post(`${BASE_URL}/rate-vedio`, ratingData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data; // Return the response data as needed
        } catch (error) {
            console.error("Error rating video:", error.response ? error.response.data : error.message);
            throw error; // Re-throw the error to handle it later
        }
    },

    // Get average rating for a video
    getAverageRating: async (videoId) => {
        const { token } = getAuthData();
        try {
            const response = await get(`${BASE_URL}/average-rating/${videoId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data === null) {
                console.log(`No ratings found for movie ${videoId}`);
                return 0; // Return 0 if no ratings are found
            }

            return response.data; // Return the average rating if available
        } catch (error) {
            console.error(`Error fetching rating for movie ${videoId}:`, error);
            return 0; // Return 0 on error
        }
    },

    // Calculate average rating
    calculateAverageRating: (ratings) => {
        if (ratings === null) {
            return 0; // No ratings found, return 0
        }

        if (Array.isArray(ratings) && ratings.length === 0) {
            return 0; // If ratings array is empty, return 0
        }

        const sum = ratings.reduce((total, rating) => total + rating, 0);
        return (sum / ratings.length).toFixed(1); // Round to one decimal place
    },

    // Get video by ID
    getVideoById: async (videoId) => {
        const { token } = getAuthData();
        try {
            const response = await get(`${BASE_URL}/get-vedio-by-id?id=${videoId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.data) {
                throw new Error("Video not found.");
            }

            return response.data;
        } catch (error) {
            console.error("Error retrieving video:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    searchVideos: async ({ name, genre, category }) => {
        const { token } = getAuthData(); // Retrieve the auth token
        try {
            const response = await get(
                `${BASE_URL}/Search`,
                {
                    params: {
                        Name: name || "", // Send empty if not provided
                        Genre: genre || "",
                        Category: category || "",
                    },
                    headers: {
                        Authorization: `Bearer ${token}`, // Include auth token
                    },
                }
            );

            return response.data || []; // Return the response data or an empty array if no data
        } catch (error) {
            console.error(
                "Error searching videos:",
                error.response ? error.response.data : error.message
            );
            throw error; // Rethrow for further handling
        }
    },

    // Show video list
    showVideoList: async () => {
        const { token, userId } = getAuthData(); // Get userId from local storage
        const url = `${BASE_URL}/show-vedio-list/${userId}`; // Use userId from local storage
        return await get(url, {
            headers: {
                Authorization: `Bearer ${token}`, // Include Authorization header
            },
        }).catch((error) => {
            console.error("Error fetching video list:", error.response ? error.response.data : error.message);
            throw error; // Re-throw the error to handle it later
        });
    },

    // Get top-rated movies
    getTopRatedMovies: async () => {
        const { token } = getAuthData();
        return await get(`${BASE_URL}/get-top-rated-movies`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Get top-rated TV shows
    getTopRatedTvShows: async () => {
        const { token } = getAuthData();
        try {
            const response = await get(`${BASE_URL}/get-top-rated-tvshows`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data; // Explicitly return data if structure is consistent
        } catch (error) {
            console.error("Failed to fetch top-rated TV shows", error);
            throw error;
        }
    },

    // Get user watch history
    getUserWatchHistory: async () => {
        const { token, userId } = getAuthData(); // Get userId for the request
        return await get(`${BASE_URL}/get-user-watch-history/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // // Upload thumbnail
    // uploadThumbnail: async (thumbnailData) => {
    //     const { token } = getAuthData();
    //     return await post(`${BASE_URL}/upload-thumbnail`, thumbnailData, {
    //         headers: { Authorization: `Bearer ${token}` },
    //     });
    // },

    // Fetch favorite videos for a user
    getFavoriteVideos: async (userId) => {
        const { token } = getAuthData();
        const response = await get(`${BASE_URL}/get-favorite-videos/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    // Add favorite video
    addFavoriteVideo: async ({ videoId, userId }) => {
        const { token } = getAuthData();

        const url = `${BASE_URL}/add-favorite-video?videoId=${videoId}&userId=${userId}`;

        return await post(url, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Remove favorite video
    removeFavoriteVideo: async ({ videoId, userId }) => {
        const { token } = getAuthData();
        const url = `${BASE_URL}/remove-favorite-video?videoId=${videoId}&userId=${userId}`;
        return await put(url, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default VideoService;
