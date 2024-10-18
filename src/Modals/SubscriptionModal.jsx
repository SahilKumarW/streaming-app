import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AiOutlineClose } from 'react-icons/ai'; // Import cross icon
import Button from "../components/Button";

const SubscriptionModal = ({ onClose }) => {
  return (
    <div className="flex justify-center items-center pt-10 h-screen bg-cover bg-center">
      <div className="w-[404px] h-[508px] bg-[#09090F] rounded-[20px] flex flex-col items-center relative">
        
       
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white text-3xl"
      >
        <AiOutlineClose className="w-6 h-6" />  {/* Close Icon */}
      </button>
        
        <div className="w-[194px] h-[76px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[46px]">
          Subscription Management
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
                <label className="text-left pr-[210px] font-medium text-[12px] leading-[18px] pb-2">Plan Details</label>
                <Field
                  type="text"
                  name="enterPassword"
                  placeholder="This is lorem ipsum text for current plan"
                  className="w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
                />
                <label className="text-left pr-[210px] font-medium text-[12px] leading-[18px] pb-2">Choose Plan</label>
                <Field
                  type="text"
                  name="enterNewPassword"
                  placeholder="Select Plan"
                  className="w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
                />
                <label className="text-left pr-[210px] font-medium text-[12px] leading-[18px] pb-2">Renewal Date</label>
                <Field
                  type="text"
                  name="confirmNewPassword"
                  placeholder="Your next billing plan is 31 August 2024"
                  className="w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
                />
                <Button name="Done" className="mt-4" />
              </Form>
            )}
          </Formik>
        </div>
        
      </div>
    </div>
  );
};

export default SubscriptionModal;
