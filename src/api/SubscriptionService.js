import { get, getAuthData } from './axios'; // Assuming axios is correctly set up

const BASE_URL = '/Subscription';

const SubscriptionService = {
    // Fetch subscription plans
    getStreamingPlans: async () => {
        const { token } = getAuthData(); // Get token from local storage or elsewhere
        try {
            const response = await get(`${BASE_URL}/GetStreamingPlans`, {
                headers: { Authorization: `Bearer ${token}` }, // Include token for authorization
            });

            // Log the full response to the console
            console.log("Response received:", response);

            if (response.apiCode === 0 && response.data) {
                return response.data; // Correctly return the plans data
            } else {
                console.error("Failed to fetch plans:", response.displayMessage);
                return [];
            }
        } catch (error) {
            console.error("Error fetching subscription plans:", error.response ? error.response.data : error.message);
            return [];
        }
    },
};

export default SubscriptionService;
