import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Container from "../assets/Container.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center items-center pt-10  h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Container})` }}
    >
      <div className="w-[404px] h-[508px] bg-[#09090F] rounded-[20px] flex flex-col items-center">
        <div className="w-[194px] h-[76px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[46px]">
          Welcome to App Name
        </div>
        <p className="text-[10px] font-normal leading-[22px] text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
        <div className="mt-[30px]">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values, "values");
              onLogin(values); // Call the onLogin prop with form values
              setSubmitting(false); // Finish submitting
            }}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form className="flex flex-col items-center w-full">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <p
                  onClick={() => navigate("/forgot-password")}
                  className="w-[109px] h-[22px] text-white font-medium text-[12px] leading-[22px] ml-auto opacity-60 cursor-pointer"
                >
                  Forgot Password?
                </p>
                {/* </Link> */}
                <Button
                  name="Login"
                  type="submit" // Ensure button triggers the form submission
                  className="mt-14"
                  disabled={isSubmitting} // Disable button while submitting
                />
              </Form>
            )}
          </Formik>
        </div>
        <div className="mt-[10px]">
          <p className="text-[12px] font-normal leading-[18px] text-[#C4C4C4] opacity-60">
            Don’t have an account?
            <span
              onClick={() => navigate("/signup")}
              className="text-[12px] font-normal leading-[18px] text-[#C4C4C4] pl-1 opacity-100 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
