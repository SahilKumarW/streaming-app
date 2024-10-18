// import React from 'react'
// import Navbar from '../components/Navbar'
// import PaymentCard from '../components/PaymentCard'
// import TabButton from '../components/TabButton'
// import PricingTable from '../components/PricingTable'

// const Subscription = () => {
//   return (
//     <>
//     <Navbar/>
//     <div className='flex flex-col justify-center items-center mt-[95px]'>
//         <p className='text-white text-[28px] font-medium leading-[42px]'>Choose the plan that's right for you</p>
//         <div className='flex '>
//             <p className='font-normal text-[16px] leading-[24px] text-[#999999] mt-[10px]'>Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!</p>
//             {/* <button className='ml-[60px] border border-gray-800 text-center'>Montly/Yearly</button>
//              */}
//              <TabButton />
//         </div>
//         <div className='flex mt-[60px] gap-5'>
//             <PaymentCard title="Basic Plan" description="Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles." price='$9.99'/>
//             <PaymentCard title="Standard Plan" description="Access to a wider selection of movies and shows, including most new releases and exclusive content." price='$12.99'/>
//             <PaymentCard title="Premium Plan" description="Access to a widest selection of movies and shows, including all new releases and Offline Viewing." price='$13.99'/>
//         </div>
//         <p className='text-white text-[38px] font-medium leading-[57px] mt-[100px]'>Compare our plans and find the right one for you</p>
//         <p className='font-normal text-[16px] leading-[24px] text-[#999999] mt-[2px]'>            <p className='font-normal text-[16px] leading-[24px] text-[#999999] mt-[10px]'>Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!</p>
//         </p>
//        <div className='mt-[60px] rounded-lg'>
//         <PricingTable/>
//        </div>
//     </div>
//     </>
//   )
// }

// export default Subscription


import React from 'react';
import Navbar from '../components/Navbar';
import PaymentCard from '../components/PaymentCard';
import TabButton from '../components/TabButton';
import PricingTable from '../components/PricingTable';

const Subscription = () => {
  return (
    <>
      <Navbar />
      <div className='mt-[95px] px-8'>
        {/* "Choose the plan" section, no longer centered */}
        <div className='mb-[40px]'>
          <p className='text-white text-[28px] font-medium leading-[42px]'>
            Choose the plan that's right for you
          </p>
          <div className='flex '>
            <p className='font-normal text-[16px] leading-[24px] text-[#999999] mt-[10px]'>Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!</p>
            {/* <button className='ml-[60px] border border-gray-800 text-center'>Montly/Yearly</button>
             */}
             <TabButton />
        </div>
        </div>

        {/* Payment Plans */}
        <div className='flex mt-[60px] gap-5'>
          <PaymentCard
            title="Basic Plan"
            description="Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles."
            price='$9.99'
          />
          <PaymentCard
            title="Standard Plan"
            description="Access to a wider selection of movies and shows, including most new releases and exclusive content."
            price='$12.99'
          />
          <PaymentCard
            title="Premium Plan"
            description="Access to the widest selection of movies and shows, including all new releases and Offline Viewing."
            price='$13.99'
          />
        </div>

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
