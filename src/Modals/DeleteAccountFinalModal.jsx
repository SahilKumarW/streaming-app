import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import bgImg from "../assets/bgImg.jpg";
import Container from '../assets/Container.png'
import Button from "../components/Button";
import GradientButton from "../components/GradientButton";



const DeleteFinalModal = () => {
  return (
    <div
      className="flex justify-center items-center pt-4  h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Container})` }}
    >
      <div className="w-[404px] h-[530px] bg-[#09090F] rounded-[20px] flex flex-col items-center">
        <div className="w-[194px] h-[50px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[38px]">
          Delete Account
        </div>
        <p className="text-[10px] font-normal leading-[22px] text-white mt-2">
        We have sent an email to  <span className="text-[#1994BB]">xyz@gmail.com</span></p>

        <p className="text-[12px] font-normal leading-[22px] text-white mt-[21px]">Click the link in your email.</p>
        <p className="w-[311px] h-[44px] text-[10px] font-normal leading-[22px] text-white mt-[13px]">Check your inbox for an email from abc@gmail.com and click the link inside to confirm your email</p>
        <p className="w-[311px] h-[44px] text-[10px] font-normal leading-[22px] text-white mt-[10px]">If you do not receive an email within 10 mins check your spam folder and/or verify it hasn’t been blocked.</p>
        <GradientButton className="h-[40px] bg-black text-red-500 font-semibold text-[12px] leading-[18px] mt-[16px]" name='Resend Email'></GradientButton>
        <p className="mt-[10px] text-[#C4C4C4] text-[12px] leading-[18px] font-normal">or</p>
        <p className="text-white text-[12px] leading-[22px] font-normal mt-[10px]">Enter email’s 6-digit code</p>
        <div className="mt-[16px]">
        <Formik
          initialValues={{ code: '' }}
          validate={values => {
            const errors = {};
            if (!values.code) {
              errors.code = 'Required';
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
              <Field
                type="code"
                name="code"
                placeholder="Enter code"
                className=" w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
              />
              <Button name="Delete Account"  />
            </Form>
          )}
        </Formik>
        </div>
      </div>
    </div>
  );
};

export default DeleteFinalModal;
