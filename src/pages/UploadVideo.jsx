import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomInput from '../components/CustomeInput';
import Button from '../components/Button';
import arrow from '../assets/arrow.svg';
import VideoService from '../api/videoService';

const UploadVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [genre, setGenre] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [filename, setFilename] = useState("");

  const categories = ["Movies", "TV Shows"];
  const genreOptions = [
    "Action", "Adventure", "Horror", "Historical",
    "Thriller", "Romance", "Supernatural", "Fantasy",
    "SciFi", "Documentary"
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  const handleSubmitToFirstAPI = async () => {
    // Validation
    const requiredFields = [
      { name: "Video Name", value: name },
      { name: "Category", value: category },
      { name: "Genre", value: genre },
      { name: "Video", value: selectedVideo },
    ];

    const unfilledFields = requiredFields.filter(field => !field.value || (field.name === "Video" && !selectedVideo));

    if (unfilledFields.length > 0) {
      const fieldNames = unfilledFields.map(field => field.name).join(", ");
      toast.error(`Please fill in all required fields: ${fieldNames}`);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('video', selectedVideo);
    formData.append('name', name);
    const categoryValue = category === 'TV Shows' ? 1 : 0;
    formData.append('category', categoryValue);
    formData.append('genre', genre);

    try {
      const response = await VideoService.storeVideo(formData);
      toast.success("Video uploaded successfully!");
      setSelectedVideo(null);
      setName("");
      setCategory("");
      setGenre("");
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitToSecondAPI = async () => {
    if (!filename.trim() || !videoURL.trim()) {
      toast.error("Please fill in both fields: Filename and Video URL.");
      return;
    }

    if (!videoURL.startsWith('http://') && !videoURL.startsWith('https://')) {
      toast.error("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setLoading(true);

    try {
      const urlData = {
        url: videoURL,
        filename: filename,
        title: name,
        category: category,
        genre: genre,
      };

      console.log('Sending data to server:', urlData);

      const response = await VideoService.storeVideoByUrl(urlData);
      toast.success("Video URL uploaded successfully!");
      setVideoURL("");
      setFilename("");
      setName("");
      setCategory("");
      setGenre("");
    } catch (error) {
      toast.error("Upload failed. Please try again.");
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
          required
        />
        <label htmlFor="video-upload" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d3d3d3] p-3 rounded-full cursor-pointer">
          <FaCamera size={24} className="text-[#4A4A4A]" />
        </label>
      </div>

      {selectedVideo && <div className="mt-4 text-white"><p>Selected Video: {selectedVideo.name}</p></div>}

      {/* Form Fields */}
      <div className="mt-[50px]">
        <CustomInput placeholder="Video Name" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="relative w-full">
          <CustomInput
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ paddingRight: '30px' }}
          />
          <select
            className="absolute inset-0 opacity-0 cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              color: 'black',
              backgroundColor: 'white',
            }}
          >
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <img
            src={arrow}
            alt="Arrow"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90"
          />
        </div>

        {/* Genre Dropdown */}
        <div className="relative w-full mt-4">
          <CustomInput
            placeholder="Genre"
            value={genreOptions[genre]} // Display genre name based on index
            onChange={(e) => setGenre(e.target.value)}
            style={{ paddingRight: '30px' }} // Same styling as category dropdown
          />
          <select
            className="absolute inset-0 opacity-0 cursor-pointer"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={{
              color: 'black',
              backgroundColor: 'white',
            }}
          >
            <option value="" disabled>Select Genre</option>
            {genreOptions.map((genreOption, index) => (
              <option key={index} value={index}>
                {genreOption}
              </option>
            ))}
          </select>
          <img
            src={arrow}
            alt="Arrow"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90"
          />
        </div>
      </div>

      {/* Upload Buttons */}
      <div className="mt-3">
        <Button name={loading ? "Uploading..." : "Upload to First API (File)"} onClick={handleSubmitToFirstAPI} disabled={loading} />
      </div>

      {/* <div className="mt-3 space-y-4">
        <CustomInput placeholder="Video URL" value={videoURL} onChange={(e) => setVideoURL(e.target.value)} />
        <CustomInput placeholder="Filename" value={filename} onChange={(e) => setFilename(e.target.value)} />
      </div>

      <div className="mt-3">
        <Button name={loading ? "Uploading..." : "Upload to Second API (URL)"} onClick={handleSubmitToSecondAPI} disabled={loading} />
      </div> */}

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
    </div>
  );
};

export default UploadVideo;