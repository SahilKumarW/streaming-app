// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import Container from '../assets/Container.png'

// import Button from "../components/Button";

// const DeleteAccountModal = () => {
//   return (
//     <div className="flex justify-center items-center pt-10  h-screen bg-cover bg-center" 
//     >
//       <div className="w-[404px] h-[508px] bg-[#09090F] rounded-[20px] flex flex-col items-center">
//         <div className="w-[194px] h-[76px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[46px]">
//           Delete Account
//         </div>
//         <div className="mt-[30px]">
//             <p className="text-[15px] leading-[22px] font-medium text-white" >  First, let's confirm your identity</p>
//         </div>
//         <div className="mt-2">
//             <p className="text-[12px] leading-[18px] font-medium text-white">Before you make any changes we need to make sure it’s you.</p>
//         </div>
        
//         <div className="mt-[30px]">

//         <Formik
//           initialValues={{ currentPassword: '', enterNewPassword: '', confirmNewPassword: '' }}
//           validate={values => {
//             const errors = {};
//             if (!values.currentPassword) {
//               errors.currentPassword = 'Required';
//             }
//             if (!values.enterNewPassword) {
//               errors.enterNewPassword = 'Required';
//             }
           
//             if (!values.confirmNewPassword) {
//               errors.confirmNewPassword = 'Required';
//             }
//             return errors;
//           }}
//           onSubmit={(values, { setSubmitting }) => {
//             setTimeout(() => {
//               alert(JSON.stringify(values, null, 2));
//               setSubmitting(false);
//             }, 400);
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form className="flex flex-col items-center w-full">
//                 <label className="text-left pr-[210px] font-medium text-[12px] leading-[18px] pb-2">Text a Code</label>
//               <Field
//                 type="text"
//                 name="enterPassword"
//                 placeholder="0345*******"
//                 className=" w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
//               />
//               {/* <ErrorMessage name="email" component="div" className="text-red-500 text-sm " /> */}
//               <label className="text-left pr-[210px] font-medium text-[12px] leading-[18px] pb-2">Email a Code</label>
//               <Field
//                 type="text"
//                 name="enterNewPassword"
//                 placeholder="xyz@gmail.com"
//                 className=" w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
//               />
              
//               {/* <ErrorMessage name="password" component="div" className="text-red-500 text-sm " /> */}
//               {/* <Button name="Deactive Account" className='mt-4' /> */}
//             </Form>
//           )}
//         </Formik>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default DeleteAccountModal;


import React from "react";
import { Formik, Form, Field } from 'formik';
import Button from "../components/Button";

const DeleteAccountModal = ({ onClose }) => {
  return (
    <div className="flex justify-center items-center pt-10 h-screen bg-cover bg-center">
      <div className="w-[404px] h-[550px] bg-[#09090F] rounded-[20px] flex flex-col items-center">
        <div className="w-[194px] h-[76px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[30px]">
          Delete Account
        </div>
        <div className="mt-[30px]">
            <p className="text-[15px] leading-[22px] font-medium text-white">First, let's confirm your identity</p>
        </div>
        <div className="mt-2">
            <p className="text-[12px] leading-[18px] font-medium text-white">Before you make any changes we need to make sure it’s you.</p>
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
                alert("Account deleted successfully");
                setSubmitting(false);
                onClose(); // Close the modal after submission
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center w-full">
                <label className="text-left pr-[210px] font-medium text-[12px] leading-[18px] pb-2">Text a Code</label>
                <Field
                  type="text"
                  name="enterPassword"
                  placeholder="0345*******"
                  className="w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
                />
                <label className="text-left pr-[210px] font-medium text-[12px] leading-[18px] pb-2">Email a Code</label>
                <Field
                  type="text"
                  name="enterNewPassword"
                  placeholder="xyz@gmail.com"
                  className="w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
                />
                <Button name="Confirm Delete" className='mt-4' type="submit" />
                <Button name="Cancel" className='mt-4' onClick={onClose} /> {/* Button to close the modal */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;

