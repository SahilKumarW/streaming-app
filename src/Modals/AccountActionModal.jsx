// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import Container from '../assets/Container.png';
// import Button from "../components/Button";
// import arrow from '../assets/arrow.svg'; // Import arrow icon

// const AccountActionModal = () => {
//   return (
//     <div className="flex justify-center items-center pt-10 h-screen bg-cover bg-center">
//       <div className="w-[404px] h-[508px] bg-[#09090F] rounded-[20px] flex flex-col items-center">
        
//         {/* Modal Title */}
//         <div className="w-[194px] h-[76px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[46px]">
//           Account Actions
//         </div>

//         <div className="mt-[30px]">
//           <Formik
//             initialValues={{ currentPassword: '', enterNewPassword: '', confirmNewPassword: '' }}
//             validate={values => {
//               const errors = {};
//               if (!values.currentPassword) {
//                 errors.currentPassword = 'Required';
//               }
//               if (!values.enterNewPassword) {
//                 errors.enterNewPassword = 'Required';
//               }
//               if (!values.confirmNewPassword) {
//                 errors.confirmNewPassword = 'Required';
//               }
//               return errors;
//             }}
//             onSubmit={(values, { setSubmitting }) => {
//               setTimeout(() => {
//                 alert(JSON.stringify(values, null, 2));
//                 setSubmitting(false);
//               }, 400);
//             }}
//           >
//             {({ isSubmitting }) => (
//               <Form className="flex flex-col items-center w-full">
                
//                 {/* Deactivate Account Field with Arrow */}
//                 <label className="text-left pr-[200px] font-medium text-[12px] leading-[18px] pb-2">Deactivate Account</label>
//                 <div className="relative w-[311px]">
//                   <Field
//                     type="text"
//                     name="enterPassword"
//                     placeholder="Choose Reason"
//                     className="w-full h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 placeholder-gray-500"
//                   />
//                   <img 
//                     src={arrow} 
//                     alt="arrow" 
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[23px] h-[23px]" 
//                   />
//                 </div>

//                 {/* Delete Account Field with Arrow */}
//                 <label className="text-left pr-[220px] font-medium text-[12px] leading-[18px] pb-2 mt-4">Delete Account</label>
//                 <div className="relative w-[311px]">
//                   <Field
//                     type="text"
//                     name="enterNewPassword"
//                     placeholder="Delete"
//                     className="w-full h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 placeholder-gray-500"
//                   />
//                   <img 
//                     src={arrow} 
//                     alt="arrow" 
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[23px] h-[23px]" 
//                   />
//                 </div>

//                 <Button name="Deactivate Account" className='mt-4' />
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountActionModal;

import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import Button from "../components/Button";
import arrow from '../assets/arrow.svg'; // Import arrow icon
import DeleteAccountModal from './DeleteAccountModal'; // Import DeleteAccountModal

const AccountActionModal = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Function to open the Delete Account modal and hide the current modal
  const openDeleteAccountModal = () => {
    setDeleteModalOpen(true);
  };

  // If the delete modal is open, return null to hide the current modal
  if (isDeleteModalOpen) {
    return <DeleteAccountModal onClose={() => setDeleteModalOpen(false)} />;
  }

  return (
    <div className="flex justify-center items-center pt-10 h-screen bg-cover bg-center">
      <div className="w-[404px] h-[508px] bg-[#09090F] rounded-[20px] flex flex-col items-center">
        
        {/* Modal Title */}
        <div className="w-[194px] h-[76px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[46px]">
          Account Actions
        </div>

        <div className="mt-[30px]">
          <Formik
            initialValues={{ currentPassword: '', enterNewPassword: '', confirmNewPassword: '' }}
            validate={values => {
              const errors = {};
              if (!values.currentPassword) {
                errors.currentPassword = 'Required';
              }
              if (!values.enterNewPassword) {
                errors.enterNewPassword = 'Required';
              }
              if (!values.confirmNewPassword) {
                errors.confirmNewPassword = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center w-full">
                
                {/* Deactivate Account Field with Hover Arrow */}
                <label className="text-left pr-[200px] font-medium text-[12px] leading-[18px] pb-2">Deactivate Account</label>
                <div className="relative w-[311px]">
                  <Field
                    type="text"
                    name="enterPassword"
                    placeholder="Choose Reason"
                    className="w-full h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 placeholder-gray-500"
                  />
                  <img 
                    src={arrow} 
                    alt="arrow" 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[23px] h-[23px] cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out" 
                  />
                </div>

                {/* Delete Account Field with Hover Arrow */}
                <label className="text-left pr-[220px] font-medium text-[12px] leading-[18px] pb-2 mt-4">Delete Account</label>
                <div className="relative w-[311px]">
                  <Field
                    type="text"
                    name="enterNewPassword"
                    placeholder="Delete"
                    className="w-full h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 placeholder-gray-500"
                  />
                  <img 
                    src={arrow} 
                    alt="arrow" 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[23px] h-[23px] cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
                    onClick={openDeleteAccountModal} // Open the Delete Account modal
                  />
                </div>

                <Button name="Deactivate Account" className='mt-4' />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AccountActionModal;



