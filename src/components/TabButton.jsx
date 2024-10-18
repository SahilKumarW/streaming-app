import React, { useState } from 'react';

const TabButton = () => {
  const [isMonthly, setIsMonthly] = useState(true); // State to toggle between Monthly and Yearly

  return (
    <div className="flex ml-[60px]  rounded-md h-[61px] p-2 bg-[#0F0F0F]">
      {/* Monthly Button */}
      <button
        className={`w-full px-4 py-2 text-center rounded-l-md  h-[45px]${
          isMonthly ? 'bg-[#1F1F1F] text-white' : 'bg-[#0F0F0F] text-[#999999]'
        }`}
        onClick={() => setIsMonthly(true)} // Switch to Monthly
      >
        Monthly
      </button>
      
      {/* Yearly Button */}
      <button
        className={`w-full px-4 py-2 text-center rounded-r-md h-[45px] ${
          !isMonthly ? 'bg-[#1F1F1F] text-white' : 'bg-[#0F0F0F] text-[#999999]'
        }`}
        onClick={() => setIsMonthly(false)} // Switch to Yearly
      >
        Yearly
      </button>
    </div>
  );
};

export default TabButton;
