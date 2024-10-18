import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import bgImg from "../assets/bgImg.jpg";
import Button from "../components/Button";
import Container from '../assets/Container.png'



const ForgotPassword = () => {
  return (
    <div
      className="flex justify-center items-center pt-10  h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Container})` }}
    >
      <div className="w-[404px] h-[508px] bg-[#09090F] rounded-[20px] flex flex-col items-center">
        <div className="w-[194px] h-[76px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[46px]">
          Forgot Password
        </div>
        <p className="text-[10px] font-normal leading-[22px] text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
        <div className="mt-[30px]">
          <Formik
            initialValues={{ otp1: "", otp2: "", otp3: "", otp4: "" }}
            validate={(values) => {
              const errors = {};
              // Add any validation logic here if needed
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
                <div className="flex space-x-[20px] mb-4">
                  <Field
                  
                    type="text"
                    name="otp1"
                    maxLength="1"
                    className="w-[63px] h-[56px] rounded-[14px] border border-black bg-gray-700 bg-opacity-50 text-center text-white text-[18px] font-medium leading-[18px] focus:outline-none "
                  />
                  <Field
                    type="text"
                    name="otp2"
                    maxLength="1"
                    className="w-[63px] h-[56px] rounded-[14px] border border-black bg-gray-700 bg-opacity-50 text-center text-white text-[18px] font-medium leading-[18px] focus:outline-none"
                  />
                  <Field
                    type="text"
                    name="otp3"
                    maxLength="1"
                    className="w-[63px] h-[56px] rounded-[14px] border border-black bg-gray-700 bg-opacity-50 text-center text-white text-[18px] font-medium leading-[18px] focus:outline-none"
                  />
                  <Field
                    type="text"
                    name="otp4"
                    maxLength="1"
                    className="w-[63px] h-[56px] rounded-[14px] border border-black bg-gray-700 bg-opacity-50 text-center text-white text-[18px] font-medium leading-[18px] focus:outline-none"
                  />
                </div>
                <p className="text-[10px] font-normal leading-[22px] text-white mb-4">
                  Lorem ipsum dolor sit amet.
                </p>
                <Button name="Confirm" className="mt-36" />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
