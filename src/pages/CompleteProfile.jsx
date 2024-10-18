import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Container from '../assets/Container.png'


import Button from "../components/Button";

const CompleteProfile = () => {
  return (
    <div className="flex justify-center items-center pt-10  h-screen bg-cover bg-center" 
    style={{backgroundImage:   `url(${Container})`}}>
      <div className="w-[404px] h-[508px] bg-[#09090F] rounded-[20px] flex flex-col items-center">
        <div className="w-[194px] h-[76px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[46px]">
          Complete your Profile
        </div>
        <p className="text-[10px] font-normal leading-[22px] text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
        <div className="mt-[30px]">

        <Formik
          initialValues={{ phoneNo: '', Dob: '' }}
          validate={values => {
            const errors = {};
            if (!values.phoneNo) {
              errors.phoneNo = 'Required';
            }
            //  else if (
            //   !/^[A-Z0-9._%+-]+@[A-Z]{2,}$/i.test(values.email)
            // ) {
            //   errors.email = 'Invalid email address';
            // }
            if (!values.Dob) {
              errors.Dob = 'Required';
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
                type="number"
                name="phoneNo"
                placeholder="Phone Number"
                className=" w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
              />
              {/* <ErrorMessage name="email" component="div" className="text-red-500 text-sm " /> */}
              
              <Field
                type="text"
                name="Dob"
                placeholder="Enter DOB"
                className=" w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
              />
              {/* <ErrorMessage name="password" component="div" className="text-red-500 text-sm " /> */}
              <Button name="Confirm" className='mt-24' />
            </Form>
          )}
        </Formik>
        </div>
        
      </div>
    </div>
  );
};

export default CompleteProfile;
