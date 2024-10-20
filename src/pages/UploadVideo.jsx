import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import CustomInput from '../components/CustomeInput';
import Button from '../components/Button';
import arrow from '../assets/arrow.svg';
import VideoService from '../api/videoService';


const UploadVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [filename, setFilename] = useState("");
  const [movieName, setMovieName] = useState("");
  const [category, setCategory] = useState("");
  const [genre, setGenre] = useState("");
  const [storyLine, setStoryLine] = useState("");
  const [cast, setCast] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
      setErrorMessage("");
    }
  };

  const handleSubmitToFirstAPI = async () => {
    if (!selectedVideo) {
      setErrorMessage("Please select a video to upload.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append('video', selectedVideo);
    formData.append('movieName', movieName);
    formData.append('category', category);
    formData.append('genre', genre);
    formData.append('storyLine', storyLine);
    formData.append('cast', cast);

    try {
      const response = await VideoService.storeVideo(formData);
      console.log("Video upload successful:", response);
      setSuccessMessage("Video uploaded successfully!");
      // Clear form
      setSelectedVideo(null);
      setMovieName("");
      setCategory("");
      setGenre("");
      setStoryLine("");
      setCast("");
    } catch (error) {
      console.error("Error uploading video:", error);
      if (error.message.includes('File size exceeds server limit')) {
        setErrorMessage(error.message + " Please try a smaller file or contact support.");
      } else if (error.response) {
        setErrorMessage(`Upload failed: ${error.response.status} ${error.response.statusText}. ${error.message}`);
      } else if (error.request) {
        setErrorMessage("Upload failed: No response received from the server. Please try again.");
      } else {
        setErrorMessage(`Upload failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitToSecondAPI = async () => {
    if (!videoURL.trim() || !filename.trim() || !movieName.trim() || !category.trim() || !genre.trim()) {
      setErrorMessage("Please fill in all required fields (Video URL, Filename, Movie Name, Category, and Genre).");
      return;
    }

    // Basic URL validation
    if (!videoURL.startsWith('http://') && !videoURL.startsWith('https://')) {
      setErrorMessage("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const urlData = {
        url: videoURL,
        filename: filename,
        title: movieName,
        description: storyLine,
        category: category,
        genre: genre,
        cast: cast,
      };

      console.log('Sending data to server:', urlData);

      const response = await VideoService.storeVideoByUrl(urlData);
      console.log("Video URL upload successful:", response);
      setSuccessMessage("Video URL uploaded successfully!");
      // Clear form
      setVideoURL("");
      setFilename("");
      setMovieName("");
      setCategory("");
      setGenre("");
      setStoryLine("");
      setCast("");
    } catch (error) {
      console.error("Error uploading video URL:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([key, value]) => `${key}: ${value.join(', ')}`)
          .join('; ');
        setErrorMessage(`Validation errors: ${errorMessages}`);
      } else if (error.response) {
        setErrorMessage(`Upload failed: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        setErrorMessage("Upload failed: No response received from the server. Please try again.");
      } else {
        setErrorMessage(`Upload failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-black p-4">
      <p className="text-[28px] leading-[38px] font-semibold text-white mt-8">Upload Video</p>
      <p className="text-[10px] leading-[22px] font-normal text-[#FFFFFF]">This is lorem ipsum text used for dummy purpose</p>

      {/* File Input and Camera Icon */}
      <div className="relative w-[550px] h-[126px] outline-dashed rounded-lg mt-[27px] bg-black">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="video-upload"
        />
        <label htmlFor="video-upload" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d3d3d3] p-3 rounded-full cursor-pointer">
          <FaCamera size={24} className="text-[#4A4A4A]" />
        </label>
      </div>

      {selectedVideo && <div className="mt-4 text-white"><p>Selected Video: {selectedVideo.name}</p></div>}

      {/* Form Fields */}
      <div className="mt-[50px]">
        <CustomInput placeholder="Movie Name" value={movieName} onChange={(e) => setMovieName(e.target.value)} />
        <CustomInput placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} icon={<img src={arrow} alt="Arrow" />} />
        <CustomInput placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} icon={<img src={arrow} alt="Arrow" />} />
        <CustomInput placeholder="Story Line" value={storyLine} onChange={(e) => setStoryLine(e.target.value)} />
        <CustomInput placeholder="Cast" value={cast} onChange={(e) => setCast(e.target.value)} />
      </div>

      {/* Upload Buttons */}
      <div className="mt-3">
        <Button name={loading ? "Uploading..." : "Upload to First API (File)"} onClick={handleSubmitToFirstAPI} disabled={loading} />
      </div>

      <div className="mt-3">
        <CustomInput 
          placeholder="Video URL" 
          value={videoURL} 
          onChange={(e) => setVideoURL(e.target.value)}
          required 
        />
      </div>

      <div className="mt-3">
        <CustomInput 
          placeholder="Filename" 
          value={filename} 
          onChange={(e) => setFilename(e.target.value)}
          required 
        />
      </div>

      <div className="mt-3">
        <Button name={loading ? "Uploading..." : "Upload to Second API (URL)"} onClick={handleSubmitToSecondAPI} disabled={loading} />
      </div>

      {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </div>
  );
};

export default UploadVideo;



