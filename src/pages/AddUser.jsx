import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CustomInput from '../components/CustomeInput';
import edit from '../assets/edit.svg';
import arrow from '../assets/arrow.svg';
import Modal from '../Modals/Modal';
import { FaCamera } from 'react-icons/fa';
import profile from "/Assets/profile.png";
import axios from 'axios'; // Use axios for API requests

const AddUser = () => {
    // State for managing modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for form inputs
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State for success/error messages
    const [message, setMessage] = useState('');

    // Handle the form submission
    const handleAddUser = async () => {
        try {
            const response = await axios.get('/api/Users/add-user', {
                params: {
                    fullName,
                    email,
                    dob,
                    role,
                    password,
                    confirmPassword
                }
            });

            // Assuming response.data contains a success message or user data
            setMessage('User added successfully!');

            // Optionally, clear the form fields after successful submission
            setFullName('');
            setEmail('');
            setDob('');
            setRole('');
            setPassword('');
            setConfirmPassword('');

        } catch (error) {
            console.error('Error adding user:', error);
            setMessage('Failed to add user.');
        }
    };

    const handleIconClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={`flex flex-col justify-center items-center bg-black ${isModalOpen ? 'blur-background' : ''}`}>
                <p className='text-[28px] leading-[38px] font-semibold text-white mt-8'>Add User</p>
                <p className='text-[10px] leading-[22px] font-normal text-[#FFFFFF]'>This is lorem ipsum text used for dummy purpose</p>
                <div className='relative w-[126px] h-[126px] border border-[#B4B4B4] rounded-[50%] mt-[27px]'>
                    <img
                        src={profile}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-[50%]"
                    />
                    <div className='absolute right-[4px] bottom-[4px]'>
                        <FaCamera size={24} className="text-white" />
                    </div>
                </div>

                {/* Form */}
                <div className='mt-[50px]'>
                    <CustomInput placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <CustomInput placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} icon={<img src={edit} />} />
                    <CustomInput placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} icon={<img src={edit} />} />
                    <CustomInput placeholder="Enter Role" value={role} onChange={(e) => setRole(e.target.value)} icon={<img src={arrow} />} />
                    <CustomInput placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<img src={edit} />} />
                    <CustomInput placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} icon={<img src={edit} />} />
                </div>

                {/* Submit Button */}
                <button
                    className="bg-teal-500 text-white px-4 py-2 rounded mt-4"
                    onClick={handleAddUser}
                >
                    Add User
                </button>

                {/* Message display */}
                {message && <p className="text-white mt-4">{message}</p>}
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default AddUser;
