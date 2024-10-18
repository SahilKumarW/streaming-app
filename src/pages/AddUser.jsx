import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import CustomInput from '../components/CustomeInput'
import edit from '../assets/edit.svg';
import arrow from '../assets/arrow.svg';
import Modal from '../Modals/Modal';
import { FaCamera } from 'react-icons/fa';
import profile from "/Assets/profile.png";

const AddUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    <div className={` flex flex-col justify-center items-center bg-black ${isModalOpen ? 'blur-background' : ''}`}>
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

        <CustomInput placeholder="Full name"/>
        <CustomInput placeholder="Email Address" icon={<img src={edit}/>} />
        <CustomInput placeholder="Date of Birth" icon={<img src={edit}/>} />
        
        <CustomInput placeholder="Enter Role" icon={<img src={arrow}/>}
        //  onIconClick={handleIconClick}
          />
        <CustomInput placeholder="Enter Password" icon={<img src={edit}/>} />
        <CustomInput placeholder="Confirm Password" icon={<img src={edit}/>} />
        </div>
    </div>
     {/* Modal */}
     <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

export default AddUser;