// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import CustomInput from '../components/CustomeInput';
// import edit from '../assets/edit.svg';
// import arrow from '../assets/arrow.svg';
// import Button from '../components/Button';
// import { FaCamera } from 'react-icons/fa';

// const UploadVideo = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleIconClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <div className={`flex flex-col justify-center items-center bg-black ${isModalOpen ? 'blur-background' : ''}`}>
//         <p className='text-[28px] leading-[38px] font-semibold text-white mt-8'>Upload Video</p>
//         <p className='text-[10px] leading-[22px] font-normal text-[#FFFFFF]'>This is lorem ipsum text used for dummy purpose</p>
        
//         {/* Outlined dashed div with camera icon */}
//         <div className='relative w-[550px] h-[126px] outline-dashed rounded-lg mt-[27px] bg-black '>
//           {/* Camera icon in a circle with black background */}
//           <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d3d3d3] p-3 rounded-full'>
//             <FaCamera 
//               size={24} 
//               className="text-[#4A4A4A] cursor-pointer " 
//               // onClick={handleIconClick} 
//             />
//           </div>
//         </div>

//         {/* Form */}
//         <div className='mt-[50px]'>
//           <CustomInput placeholder="Movie Name" />
//           <CustomInput placeholder="Category" icon={<img src={arrow} />} />
//           <CustomInput placeholder="Genre" icon={<img src={arrow} />} />
//           <CustomInput placeholder="Story Line" />
//           <CustomInput placeholder="Cast" />
//         </div>

//         <div className='mt-3'>
//           <Button name={"Upload Video"} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default UploadVideo;


import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import CustomInput from '../components/CustomeInput';
import Button from '../components/Button';
import arrow from '../assets/arrow.svg';
import axios from 'axios';  // Import axios for making HTTP requests

const UploadVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for the request

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
      console.log("Selected video:", file);
    }
  };

  // Function to handle the actual upload to the server
  const handleSubmit = async () => {
    if (!selectedVideo) {
      alert('Please select a video file to upload.');
      return;
    }

    setLoading(true);

    // Prepare form data
    const formData = new FormData();
    formData.append('video', selectedVideo);
    formData.append('movieName', 'Inception');  // Example, you can grab these from input fields
    formData.append('category', 'Action');
    formData.append('genre', 'Sci-Fi');
    formData.append('storyLine', 'This is a placeholder story line.');
    formData.append('cast', 'Leonardo DiCaprio');

    try {
      const response = await axios.post('/api/UploadVideos/StoreVideo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Important for file uploads
        },
      });

      // Handle successful response
      if (response.status === 200) {
        alert('Video uploaded successfully!');
        console.log(response.data);
      }
    } catch (error) {
      // Handle error
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-black">
        <p className="text-[28px] leading-[38px] font-semibold text-white mt-8">
          Upload Video
        </p>
        <p className="text-[10px] leading-[22px] font-normal text-[#FFFFFF]">
          This is lorem ipsum text used for dummy purpose
        </p>

        {/* Outlined dashed div with camera icon */}
        <div className="relative w-[550px] h-[126px] outline-dashed rounded-lg mt-[27px] bg-black">
          {/* File input to upload video */}
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            style={{ display: 'none' }}
            id="video-upload"
          />

          {/* Camera icon as trigger for video upload */}
          <label
            htmlFor="video-upload"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d3d3d3] p-3 rounded-full cursor-pointer"
          >
            <FaCamera size={24} className="text-[#4A4A4A]" />
          </label>
        </div>

        {selectedVideo && (
          <div className="mt-4 text-white">
            <p>Selected Video: {selectedVideo.name}</p>
          </div>
        )}

        {/* Form Fields */}
        <div className="mt-[50px]">
          <CustomInput placeholder="Movie Name" />
          <CustomInput placeholder="Category" icon={<img src={arrow} />} />
          <CustomInput placeholder="Genre" icon={<img src={arrow} />} />
          <CustomInput placeholder="Story Line" />
          <CustomInput placeholder="Cast" />
        </div>

        <div className="mt-3">
          <Button name={loading ? "Uploading..." : "Upload Video"} onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default UploadVideo;

