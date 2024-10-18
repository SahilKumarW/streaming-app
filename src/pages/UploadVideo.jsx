import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CustomInput from '../components/CustomeInput';
import edit from '../assets/edit.svg';
import arrow from '../assets/arrow.svg';
import Button from '../components/Button';
import { FaCamera } from 'react-icons/fa';

const UploadVideo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`flex flex-col justify-center items-center bg-black ${isModalOpen ? 'blur-background' : ''}`}>
        <p className='text-[28px] leading-[38px] font-semibold text-white mt-8'>Upload Video</p>
        <p className='text-[10px] leading-[22px] font-normal text-[#FFFFFF]'>This is lorem ipsum text used for dummy purpose</p>
        
        {/* Outlined dashed div with camera icon */}
        <div className='relative w-[550px] h-[126px] outline-dashed rounded-lg mt-[27px] bg-black '>
          {/* Camera icon in a circle with black background */}
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d3d3d3] p-3 rounded-full'>
            <FaCamera 
              size={24} 
              className="text-[#4A4A4A] cursor-pointer " 
              // onClick={handleIconClick} 
            />
          </div>
        </div>

        {/* Form */}
        <div className='mt-[50px]'>
          <CustomInput placeholder="Movie Name" />
          <CustomInput placeholder="Category" icon={<img src={arrow} />} />
          <CustomInput placeholder="Genre" icon={<img src={arrow} />} />
          <CustomInput placeholder="Story Line" />
          <CustomInput placeholder="Cast" />
        </div>

        <div className='mt-3'>
          <Button name={"Upload Video"} />
        </div>
      </div>
    </>
  );
};

export default UploadVideo;
