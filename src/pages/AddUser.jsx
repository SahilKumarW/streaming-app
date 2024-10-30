import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import edit from '../assets/edit.svg';
import arrow from '../assets/arrow.svg';
import Modal from '../Modals/Modal';
import { FaCamera } from 'react-icons/fa';
import profile from "/Assets/profile.png";
import CustomInput from '../components/CustomeInput';
import UserService from '../api/userService'; // Importing UserService

const AddUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const handleAddUser = async () => {
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setMessageType('error');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        try {
            const newUser = {
                fullName,
                email,
                dob,
                role,
                password
            };

            const response = await UserService.addUser(newUser); // Calling addUser method

            setMessage('User added successfully!');
            setMessageType('success');

            // Clear form fields
            setFullName('');
            setEmail('');
            setDob('');
            setRole('');
            setPassword('');
            setConfirmPassword('');

            setTimeout(() => setMessage(''), 3000);

        } catch (error) {
            console.error('Error adding user:', error);
            setMessage('Failed to add user.');
            setMessageType('error');

            setTimeout(() => setMessage(''), 3000);
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
            {/* Success/Error Message */}
            {message && (
                <div className={`fixed top-0 left-0 right-0 p-4 text-center ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {message}
                </div>
            )}

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
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default AddUser;
