import { post, get, put } from './axios'; // Assuming axios.js is set up correctly

const VideoService = {
    // Video Upload APIs
    storeVideo: async (formData) => {
        return await post('/videos', formData); // POST to /videos
    },
    storeVideoByUrl: async (urlData) => {
        return await post('/videos', urlData); // POST to /videos for URL-based video upload
    },

    // Watch History APIs
    watchHistoryAdd: async (watchData) => {
        return await post('/watchHistory', watchData); // POST to /watchHistory
    },
    watchHistoryUpdate: async (watchData) => {
        return await put(`/watchHistory/${watchData.id}`, watchData); // PUT to /watchHistory/:id
    },

    // Ratings and Reviews
    rateVideo: async (ratingData) => {
        return await post('/ratings', ratingData); // POST to /ratings
    },
    getAverageRating: async (videoId) => {
        return await get(`/ratings?videoId=${videoId}`); // GET ratings for a video
    },

    // Video Retrieval
    getVideoById: async (videoId) => {
        return await get(`/videos/${videoId}`); // GET specific video by ID
    },
    searchVideos: async (query) => {
        return await get(`/videos?q=${query}`); // GET videos matching the search query
    },
    showVideoList: async () => {
        return await get('/videos'); // GET all videos
    },
    getTopRatedMovies: async () => {
        return await get('/videos?category=movies&sort=rating'); // GET top-rated movies
    },
    getTopRatedTvShows: async () => {
        return await get('/videos?category=tvshows&sort=rating'); // GET top-rated TV shows
    },

    // User Watch History
    getUserWatchHistory: async (userId) => {
        return await get(`/watchHistory?userId=${userId}`); // GET watch history for a user
    },

    // Thumbnail Upload
    uploadThumbnail: async (thumbnailData) => {
        return await post('/videos/upload-thumbnail', thumbnailData); // POST thumbnail data
    },

    // Favorites Management
    getFavoriteVideos: async (userId) => {
        return await get(`/favorites?userId=${userId}`); // GET favorite videos for a user
    },
    addFavoriteVideo: async (favoriteData) => {
        return await post('/favorites', favoriteData); // POST favorite video data
    },
    removeFavoriteVideo: async (favoriteData) => {
        return await put(`/favorites/${favoriteData.id}`, favoriteData); // PUT updated favorite data
    },
};

export default VideoService;
