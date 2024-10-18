import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="border-[0.5px] border-[#B4b4B4] w-full"></div>
      <div className="flex justify-between items-center">
        <p className="text-[15px] font-light leading-[22px] py-[18px] mx-auto pl-[100px]">
          @2024 All Rights Reserved
        </p>
        <div className="flex space-x-2">
          <p className="text-[15px] font-light leading-[22px] py-[18px] pr-[20px]">
            Contact Us
          </p>
          <p className="text-[15px] font-light leading-[22px] py-[18px] pr-[40px]">
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
