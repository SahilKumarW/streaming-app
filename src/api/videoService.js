import { post, get, put } from './axios'; // Assuming axios.js is set up correctly

const VideoService = {
    // Video Upload APIs
    storeVideo: async (formData) => {
        try {
            const file = formData.get('video');
            console.log('Uploading file:', file.name, 'Size:', file.size, 'bytes');

            if (file.size > 578) {
                throw new Error('File size exceeds server limit of 578 bytes. Please contact the server administrator.');
            }

            return await post('/api/UploadVedios/StoreVideo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            });
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    },
    storeVideoByUrl: async (urlData) => {
        try {
            return await post('/api/UploadVedios/Store-url', urlData);
        } catch (error) {
            console.error('URL upload error:', error);
            throw error;
        }
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
    searchVideos: async (query) => {
        const authToken = localStorage.getItem('authToken');
        return get(`/api/UploadVedios/Search?query=${query}`, authToken);
    },
    getVideoById: async (videoId) => {
        const authToken = localStorage.getItem('authToken');
        return get(`/api/UploadVedios/get-vedio-by-id?id=${videoId}`, authToken);
    },
    showVideoList: async () => {
        return get('/videos');
    },
    getTopRatedMovies: async () => {
        return get('/videos?category=Movie&_sort=rating&_order=desc');
    },
    getTopRatedTvShows: async () => {
        return get('/videos?category=TV Show&_sort=rating&_order=desc');
    },

    // User Watch History
    getUserWatchHistory: async (userId) => {
        return get(`/watchHistory?userId=${userId}&_expand=video`);
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
