import instance from './axios'; // Ensure this is configured correctly
import { post, get, put } from './axios';

const BASE_URL = '/UploadVedios';

// Function to get the token and userId
const getAuthData = () => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

    if (!userId) {
        console.error("User ID not found. Please log in again.");
    }

    return { token, userId }; // Return both token and userId
};

const VideoService = {
    // Store video
    storeVideo: async (formData) => {
        const file = formData.get('video');
        if (file.size > 578) throw new Error('File size exceeds limit.');

        const { token } = getAuthData(); // Retrieve token
        return await post(`${BASE_URL}/StoreVideo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // Include token for authorization
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });
    },

    // Store video by URL
    storeVideoByUrl: async (urlData) => {
        const { token } = getAuthData();
        return await post(`${BASE_URL}/Store-url`, urlData, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Add to watch history
    watchHistoryAdd: async (watchData) => {
        const { token, userId } = getAuthData();
        return await post(`${BASE_URL}/watch-history-add`, { ...watchData, userId }, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Update watch history
    watchHistoryUpdate: async (watchData) => {
        const { token } = getAuthData();
        return await post(`${BASE_URL}/watch-history-update`, watchData, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Rate video
    rateVideo: async (ratingData) => {
        const { token } = getAuthData();
        return await post(`${BASE_URL}/rate-vedio`, ratingData, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Get average rating for a video
    getAverageRating: async (videoId) => {
        const { token } = getAuthData();
        return await get(`${BASE_URL}/average-rating?videoId=${videoId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Get video by ID
    getVideoById: async (videoId) => {
        const { token } = getAuthData();
        return await get(`${BASE_URL}/get-vedio-by-id?id=${videoId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Search videos
    searchVideos: async (query) => {
        const { token } = getAuthData();
        return await get(`${BASE_URL}/Search?query=${query}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Show video list
    showVideoList: async () => {
        const { token, userId } = getAuthData(); // Get userId from local storage
        const url = `${BASE_URL}/show-vedio-list?UserId=${userId}`; // Use userId from local storage
        console.log("Fetching video list with URL:", url); // Debug log
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
        return await get(`${BASE_URL}/get-user-watch-history?userId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Upload thumbnail
    uploadThumbnail: async (thumbnailData) => {
        const { token } = getAuthData();
        return await post(`${BASE_URL}/upload-thumbnail`, thumbnailData, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Get favorite videos for a user
    getFavoriteVideos: async () => {
        const { token, userId } = getAuthData();
        return await get(`${BASE_URL}/get-favorite-videos/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Add favorite video
    addFavoriteVideo: async (favoriteData) => {
        const { token } = getAuthData();
        return await post(`${BASE_URL}/add-favorite-video`, favoriteData, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Remove favorite video
    removeFavoriteVideo: async (favoriteData) => {
        const { token } = getAuthData();
        return await put(`${BASE_URL}/remove-favorite-video`, favoriteData, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default VideoService;
