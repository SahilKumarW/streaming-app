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


// import React, { useState } from 'react';
// import { FaCamera } from 'react-icons/fa';
// import CustomInput from '../components/CustomeInput';
// import Button from '../components/Button';
// import arrow from '../assets/arrow.svg';
// import axios from 'axios';  // Import axios for making HTTP requests

// const UploadVideo = () => {
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(false); // Loading state for the request

//   const handleVideoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedVideo(file);
//       console.log("Selected video:", file);
//     }
//   };

//   // Function to handle the actual upload to the server
//   const handleSubmit = async () => {
//     if (!selectedVideo) {
//       alert('Please select a video file to upload.');
//       return;
//     }

//     setLoading(true);

//     // Prepare form data
//     const formData = new FormData();
//     formData.append('video', selectedVideo);
//     formData.append('movieName', 'Inception');  // Example, you can grab these from input fields
//     formData.append('category', 'Action');
//     formData.append('genre', 'Sci-Fi');
//     formData.append('storyLine', 'This is a placeholder story line.');
//     formData.append('cast', 'Leonardo DiCaprio');

//     try {
//       const response = await axios.post('/api/UploadVideos/StoreVideo', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',  // Important for file uploads
//         },
//       });

//       // Handle successful response
//       if (response.status === 200) {
//         alert('Video uploaded successfully!');
//         console.log(response.data);
//       }
//     } catch (error) {
//       // Handle error
//       console.error('Error uploading video:', error);
//       alert('Failed to upload video. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col justify-center items-center bg-black">
//         <p className="text-[28px] leading-[38px] font-semibold text-white mt-8">
//           Upload Video
//         </p>
//         <p className="text-[10px] leading-[22px] font-normal text-[#FFFFFF]">
//           This is lorem ipsum text used for dummy purpose
//         </p>

//         {/* Outlined dashed div with camera icon */}
//         <div className="relative w-[550px] h-[126px] outline-dashed rounded-lg mt-[27px] bg-black">
//           {/* File input to upload video */}
//           <input
//             type="file"
//             accept="video/*"
//             onChange={handleVideoUpload}
//             style={{ display: 'none' }}
//             id="video-upload"
//           />

//           {/* Camera icon as trigger for video upload */}
//           <label
//             htmlFor="video-upload"
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d3d3d3] p-3 rounded-full cursor-pointer"
//           >
//             <FaCamera size={24} className="text-[#4A4A4A]" />
//           </label>
//         </div>

//         {selectedVideo && (
//           <div className="mt-4 text-white">
//             <p>Selected Video: {selectedVideo.name}</p>
//           </div>
//         )}

//         {/* Form Fields */}
//         <div className="mt-[50px]">
//           <CustomInput placeholder="Movie Name" />
//           <CustomInput placeholder="Category" icon={<img src={arrow} />} />
//           <CustomInput placeholder="Genre" icon={<img src={arrow} />} />
//           <CustomInput placeholder="Story Line" />
//           <CustomInput placeholder="Cast" />
//         </div>

//         <div className="mt-3">
//           <Button name={loading ? "Uploading..." : "Upload Video"} onClick={handleSubmit} />
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
  const [videoURL, setVideoURL] = useState(''); // State for storing video URL input

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
      console.log("Selected video:", file);
    }
  };

  // Function to handle the upload to the first API (existing API, file upload)
  const handleSubmitToFirstAPI = async () => {
    if (!selectedVideo) {
      alert('Please select a video file to upload.');
      return;
    }

    setLoading(true);

    // Prepare form data for file upload
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
        alert('Video uploaded successfully to the first API!');
        console.log(response.data);
      }
    } catch (error) {
      // Handle error
      console.error('Error uploading video to the first API:', error);
      alert('Failed to upload video. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the upload to the second API (new API, storing URL)
  const handleSubmitToSecondAPI = async () => {
    if (!videoURL) {
      alert('Please provide a video URL to upload.');
      return;
    }

    setLoading(true);

    // Prepare data for video URL upload
    const postData = {
      videoURL: videoURL,  // Sending video URL instead of file
      movieName: 'Inception',
      category: 'Action',
      genre: 'Sci-Fi',
      storyLine: 'This is a placeholder story line.',
      cast: 'Leonardo DiCaprio',
    };

    try {
      const response = await axios.post('/api/UploadVedios/Store-url', postData, {
        headers: {
          'Content-Type': 'application/json',  // Sending JSON data
        },
      });

      // Handle successful response
      if (response.status === 200) {
        alert('Video URL uploaded successfully to the second API!');
        console.log(response.data);
      }
    } catch (error) {
      // Handle error
      console.error('Error uploading video URL to the second API:', error);
      alert('Failed to upload video URL. Please try again later.');
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

        {/* Upload buttons for both APIs */}
        <div className="mt-3">
          <Button name={loading ? "Uploading..." : "Upload to First API (File)"} onClick={handleSubmitToFirstAPI} />
        </div>

        <div className="mt-3">
          <CustomInput 
            placeholder="Video URL" 
            value={videoURL} 
            onChange={(e) => setVideoURL(e.target.value)} 
          />
        </div>

        <div className="mt-3">
          <Button name={loading ? "Uploading..." : "Upload to Second API (URL)"} onClick={handleSubmitToSecondAPI} />
        </div>
      </div>
    </>
  );
};

export default UploadVideo;
