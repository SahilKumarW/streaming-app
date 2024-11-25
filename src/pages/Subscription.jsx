import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PaymentCard from '../components/PaymentCard';
import TabButton from '../components/TabButton';
import PricingTable from '../components/PricingTable';
import SubscriptionService from '../api/SubscriptionService'; // Import the SubscriptionService

const Subscription = () => {
  const [plans, setPlans] = useState([]); // State to hold subscription plans
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State to hold error messages
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch subscription plans when the component mounts
    const fetchPlans = async () => {
      try {
        const response = await SubscriptionService.getStreamingPlans();

        // Log the response to check the received data
        console.log("Plans received:", response);

        if (response.length > 0) {
          setPlans(response); // Update the plans state with the fetched data
        } else {
          console.error("Failed to fetch plans");
          setError("No plans available.");
        }
      } catch (error) {
        console.error("Error fetching subscription plans:", error.message);
        setError("Failed to fetch plans. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchPlans(); // Call the function to fetch the plans
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <>
      <Navbar setMovies={setMovies} />
      <div className='mt-[95px] px-8'>
        {/* "Choose the plan" section */}
        <div className='mb-[40px]'>
          <p className='text-white text-[28px] font-medium leading-[42px]'>
            Choose the plan that's right for you
          </p>
          <div className='flex'>
            <p className='font-normal text-[16px] leading-[24px] text-[#999999] mt-[10px]'>
              Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!
            </p>
            <TabButton />
          </div>
        </div>

        {/* Loading and Error Handling */}
        {loading && (
          <div className="text-white text-center mt-4">
            <p>Loading plans...</p>
          </div>
        )}
        {error && !loading && (
          <div className="text-red-500 text-center mt-4">
            <p>{error}</p>
          </div>
        )}

        {/* Render Subscription Plans */}
        {!loading && !error && (
          <div className='flex mt-[60px] gap-5'>
            {plans.length > 0 ? (
              plans.map(plan => (
                <PaymentCard
                  key={plan.planId}
                  title={plan.planName}
                  description={plan.planDescription}
                  price={`$${plan.price}`}
                />
              ))
            ) : (
              <p className="text-white text-center mt-4">No plans available at the moment.</p>
            )}
          </div>
        )}

        {/* Plan Comparison Section */}
        <p className='text-white text-[38px] font-medium leading-[57px] mt-[100px]'>
          Compare our plans and find the right one for you
        </p>
        <p className='font-normal text-[16px] leading-[24px] text-[#999999] mt-[10px]'>
          Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!
        </p>

        {/* Pricing Table */}
        <div className='mt-[60px] rounded-lg'>
          <PricingTable />
        </div>
      </div>
    </>
  );
};

export default Subscription;
