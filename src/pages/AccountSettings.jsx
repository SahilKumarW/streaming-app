import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CustomInput from '../components/CustomeInput';
import edit from '../assets/edit.svg';
import arrow from '../assets/arrow.svg';
import profile from "/Assets/profile.png"
import ChangePassword from '../Modals/ChangePassword';
import ChangeDobModal from '../Modals/ChangeDobModal';
import SubscriptionModal from '../Modals/SubscriptionModal';
import AccountActionModal from '../Modals/AccountActionModal';
import DeleteAccountModal from '../Modals/DeleteAccountModal';
import ChangeEmailModal from '../Modals/ChangeEmailModal';
import VerifyEmailModal from '../Modals/VerifyEmailModal';
import { FaCamera } from 'react-icons/fa';



const AccountSettings = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDOBModalOpen, setIsDOBModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isAccountActionModalOpen, setIsAccountActionModalOpen] = useState(false); 

  

  const handleOpenEmailModal = () =>{
    setIsEmailModalOpen(true);

  };
  const handleCloseEmailModal = () =>{
    setIsEmailModalOpen(false);
    
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleCloseDOBModal = () => {
    setIsDOBModalOpen(false);
  };

  const handleOpenDOBModal = () => {
    setIsDOBModalOpen(true);
  };

  const handleCloseSubscriptionModal = () => {
    setIsSubscriptionModalOpen(false);
  };

  const handleOpenSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true);
  };

  const handleOpenPaymentModal = () =>{

  }
  const handleOpenSecurityModal = () =>{

  }

  const handleCloseAccountActionModal = () => {
    setIsAccountActionModalOpen(false);
  };

  const handleOpenAccountActionModal = () => {
    setIsAccountActionModalOpen(true);
  };

  

  return (
    <>
      <Navbar />
      <div className={`flex flex-col justify-center items-center bg-black ${ isEmailModalOpen || isPasswordModalOpen || isDOBModalOpen || isSubscriptionModalOpen || isAccountActionModalOpen ? 'blur-background' : ''}`}>
        <p className='text-[28px] leading-[38px] font-semibold text-white'>Account Settings</p>
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


        <div className='mt-[50px]'>
          <CustomInput placeholder="Full name" />
          <CustomInput placeholder="Email Address" icon={<img src={edit} />} 
          onIconClick={handleOpenEmailModal}/>
          <CustomInput 
            placeholder="Date of Birth" 
            icon={<img src={arrow} alt="arrow" />}
            onIconClick={handleOpenDOBModal} 
          />
          <CustomInput 
            placeholder="Change Password" 
            icon={<img src={arrow} alt="arrow" />}
            onIconClick={handleOpenPasswordModal}
          />
          <CustomInput 
            placeholder="Subscription Management"  
            icon={<img src={arrow} />}
            onIconClick={handleOpenSubscriptionModal} 
          />
          <CustomInput 
            placeholder="Payment information" 
            icon={<img src={arrow} />}
            onIconClick={handleOpenPaymentModal} 
          />
          <CustomInput 
            placeholder="Security Settings" 
            icon={<img src={arrow} />}
            onIconClick={handleOpenSecurityModal} 
          />
          <CustomInput 
            placeholder="Account Actions" 
            icon={<img src={arrow} />}
            onIconClick={handleOpenAccountActionModal} 
          />
        </div>
      </div>

      {/* Modals */}

      {isEmailModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black bg-opacity-70 absolute"></div>
          <div className="relative z-10">
            <ChangeEmailModal onClose={handleCloseEmailModal} />
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black bg-opacity-70 absolute"></div>
          <div className="relative z-10">
            <ChangePassword onClose={handleClosePasswordModal} />
          </div>
        </div>
      )}

      {isDOBModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black bg-opacity-70 absolute"></div>
          <div className="relative z-10">
            <ChangeDobModal onClose={handleCloseDOBModal} />
          </div>
        </div>
      )}

      {isSubscriptionModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black bg-opacity-70 absolute"></div>
          <div className="relative z-10">
            <SubscriptionModal onClose={handleCloseSubscriptionModal} />
          </div>
        </div>
      )}

      {isAccountActionModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black bg-opacity-70 absolute"></div>
          <div className="relative z-10">
            <AccountActionModal onClose={handleCloseAccountActionModal} />
          </div>
        </div>
      )}
      
   



    </>
  );
};

export default AccountSettings;





