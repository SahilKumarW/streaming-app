import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Container from '../assets/Container.png'

import Button from "../components/Button";

const ChangeEmailModal = ({ onClose }) => {
  return (
    <div className="flex justify-center items-center pt-10  h-screen bg-cover bg-center" 
    >
      <div className="w-[404px] h-[354px] bg-[#09090F] rounded-[20px] flex flex-col items-center">
        <div className="w-[194px] h-[76px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[46px]">
          Change your Email
        </div>
        
        <div className="mt-[30px]">

        <Formik
          initialValues={{ enterNewEmail: '' }}
          validate={values => {
            const errors = {};
            if (!values.enterNewEmail) {
              errors.enterNewEmail = 'Required';
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
                type="text"
                name="enterNewEmail"
                placeholder="Enter New Email"
                className=" w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
              />
              {/* <ErrorMessage name="email" component="div" className="text-red-500 text-sm " /> */}
              
              
              {/* <ErrorMessage name="password" component="div" className="text-red-500 text-sm " /> */}
              <Button name="Verify Email" className='mt-14' />
            </Form>
          )}
        </Formik>
        </div>
        
      </div>
    </div>
  );
};

export default ChangeEmailModal;






