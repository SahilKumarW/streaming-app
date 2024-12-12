import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PaymentCard from "../components/PaymentCard";
import TabButton from "../components/TabButton";
import axios from "axios";
import PricingTable from "../components/PricingTable";
import SubscriptionService from "../api/SubscriptionService"; // Import the SubscriptionService
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const Subscription = () => {
  let isMounted = true;
  const location = useLocation();

  // Create a URLSearchParams object to parse query parameters
  const queryParams = new URLSearchParams(location.search);

  // Get a specific query parameter
  const sessionIdParam = queryParams.get("session_id");
  const planName = queryParams.get("planName");
  const planDescription = queryParams.get("planDescription");
  const priceId = queryParams.get("priceId");

  // Load Stripe.js with your publishable key
  const stripePromise = loadStripe(
    "pk_test_51QEDfMRpQLllWkQe2xqLUPdL8OavOvRsCMGHXjuEeoNvS9fPF7UPiMR0j6Wf4gyTxzRJW9N5bT8dzF4popS3VPt500346b7515"
  );

  // Replace this with your secret key for testing only
  const stripeSecretKey =
    "sk_test_51QEDfMRpQLllWkQennFeY6ltAwWu0Dvm1Zpxd7YIXhHQtjLWq9cEtcDEUO18VdiNQBMtw2oTqOghlC0zzTU5F02000DQsvJvm3"; // NEVER DO THIS IN PRODUCTION

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

  //  Publishable Key: pk_test_51QEDfMRpQLllWkQe2xqLUPdL8OavOvRsCMGHXjuEeoNvS9fPF7UPiMR0j6Wf4gyTxzRJW9N5bT8dzF4popS3VPt500346b7515
  //  Secret Key: sk_test_51QEDfMRpQLllWkQennFeY6ltAwWu0Dvm1Zpxd7YIXhHQtjLWq9cEtcDEUO18VdiNQBMtw2oTqOghlC0zzTU5F02000DQsvJvm3

  useEffect(() => {
    if (isMounted) {
      if (sessionIdParam) {
        getStripeSession(sessionIdParam);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [sessionIdParam]);

  // async function getStripeSession(sessionId) {
  //   const stripe = await stripePromise;

  //   if (!stripe) {
  //     console.error('Stripe.js has not loaded.');
  //     return;
  //   }
  //   try {
  //     // Make a GET request to Stripe's sessions endpoint
  //     const session = await axios.get(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
  //       headers: {
  //         Authorization: `Bearer ${stripeSecretKey}`, // Replace with your Stripe secret key
  //       },
  //     });

  //     // const paymentMethodId = session?.data?.payment_method_configuration_details?.id;

  //     // if (paymentMethodId) {
  //     //   let paymentMethod = await SubscriptionService.AddPaymentMethod({ paymentMethodId, setAsDefault: true, customer: session?.data?.customer, })
  //     //   console.log({ paymentMethod })
  //     // }

  //     // console.log({ paymentMethodId })

  //     // Response contains session details
  //     console.log("Session Data:", session.data);
  //     if (session?.data?.payment_status == 'paid') {
  //       let subscription = await SubscriptionService.SubscribeByID({
  //         customerId: session?.data?.customer,
  //         priceId: priceId,
  //         planName: planName
  //       })

  //       console.log({ subscription })
  //     }

  //     // You can now access session details like:
  //     // response.data.id, response.data.payment_status, response.data.customer, etc.
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching session data:", error.response?.data || error.message);
  //     throw error;
  //   }
  // }

  async function getStripeSession(sessionId) {
    try {
      // Fetch session details
      const session = await axios.get(
        `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${stripeSecretKey}`, // Replace with your Stripe secret key
          },
        }
      );

      console.log("Session Data:", session.data);

      if (session?.data?.payment_status === "paid") {
        // Fetch subscription details
        const subscriptionId = session.data.subscription;
        const subscription = await axios.get(
          `https://api.stripe.com/v1/subscriptions/${subscriptionId}`,
          {
            headers: {
              Authorization: `Bearer ${stripeSecretKey}`, // Replace with your Stripe secret key
            },
          }
        );

        // Extract payment method ID
        const paymentMethodId = subscription.data.default_payment_method;

        if (paymentMethodId) {
          console.log("Payment Method ID:", paymentMethodId);

          // Example usage
          let paymentMethod = await SubscriptionService.CreateCustomer({
            paymentMethodId,
            // customer: session.data.customer,
            name: planName,
            description: planDescription,
            email: localStorage.getItem("email"),
          });
          console.log({ paymentMethod });
        }

        // Example: Subscribe user to a plan
        // let subscriptionDetails = await SubscriptionService.SubscribeByID({
        //   customerId: session.data.customer,
        //   priceId: priceId,
        //   planName: planName,
        // });

        // console.log({ subscriptionDetails });
      }
    } catch (error) {
      console.error(
        "Error fetching session data:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  function getTimestampSevenDaysInFuture() {
    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.getTime() + 8 * 24 * 60 * 60 * 1000
    ); // Add 7 days in milliseconds
    return Math.floor(futureDate.getTime() / 1000); // Convert to Unix timestamp (seconds)
  }

  const handleSubscriptionCheckout = async ({
    plan,
    price_id,
    trial = false,
  }) => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe.js has not loaded.");
      return;
    }

    const timestamp = getTimestampSevenDaysInFuture();

    try {
      // Prepare parameters for the API call
      const params = new URLSearchParams();
      params.append("mode", "subscription");
      params.append(
        "success_url",
        `http://localhost:5173/subscription?session_id={CHECKOUT_SESSION_ID}&planName=${plan?.planName}&planDescription=${plan?.planDescription}&priceId=${plan?.priceId}`
      ); // Replace with your success URL
      params.append("cancel_url", "http://localhost:5173/subscription"); // Replace with your cancel URL

      // Append line items (Price ID and quantity)
      params.append("line_items[0][price]", price_id); // Replace with your recurring Price ID
      params.append("line_items[0][quantity]", "1");
      if (trial) {
        params.append("subscription_data[trial_end]", timestamp);
      }

      // Create a Checkout session
      const response = await axios.post(
        "https://api.stripe.com/v1/checkout/sessions",
        params,
        {
          headers: {
            Authorization: `Bearer ${stripeSecretKey}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { id: sessionId } = response.data;

      // Redirect to Stripe-hosted checkout page
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error(
        "Error creating checkout session:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <Navbar setMovies={setMovies} />
      <div className="mt-[95px] px-8">
        {/* "Choose the plan" section */}
        <div className="mb-[40px]">
          <p className="text-white text-[28px] font-medium leading-[42px]">
            Choose the plan that's right for you
          </p>
          <div className="flex">
            <p className="font-normal text-[16px] leading-[24px] text-[#999999] mt-[10px]">
              Join StreamVibe and select from our flexible subscription options
              tailored to suit your viewing preferences. Get ready for non-stop
              entertainment!
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
          <div className="flex mt-[60px] gap-5">
            {plans.length > 0 ? (
              plans.map((plan) => (
                <PaymentCard
                  key={plan.planId}
                  title={plan.planName}
                  description={plan.planDescription}
                  price={`$${plan.price}`}
                  onChoose={() =>
                    handleSubscriptionCheckout({
                      plan,
                      price_id: plan?.priceId,
                    })
                  }
                  onTrial={() =>
                    handleSubscriptionCheckout({
                      plan,
                      price_id: plan?.priceId,
                      trial: true,
                    })
                  }
                />
              ))
            ) : (
              <p className="text-white text-center mt-4">
                No plans available at the moment.
              </p>
            )}
          </div>
        )}

        {/* Plan Comparison Section */}
        <p className="text-white text-[38px] font-medium leading-[57px] mt-[100px]">
          Compare our plans and find the right one for you
        </p>
        <p className="font-normal text-[16px] leading-[24px] text-[#999999] mt-[10px]">
          Join StreamVibe and select from our flexible subscription options
          tailored to suit your viewing preferences. Get ready for non-stop
          entertainment!
        </p>

        {/* Pricing Table */}
        <div className="mt-[60px] rounded-lg">
          <PricingTable />
        </div>
      </div>
    </>
  );
};

export default Subscription;
