import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Container from "../assets/Container.png";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import AuthService from "../api/authService"; // Import AuthService for API call

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSignup = async (values, setSubmitting) => {
    setLoading(true); // Start loading
    try {
      const response = await AuthService.register(values); // Use AuthService to register

      // Check if the response indicates success
      if (response.status === 200) {
        console.log("Registration successful:", response.data);
        navigate("/login"); // Redirect to login after successful registration
      } else {
        throw new Error("Registration failed"); // Handle other statuses
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message); // Set error message for user feedback
    } finally {
      setSubmitting(false); // Allow form submission again
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      className="flex justify-center items-center pt-10 h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Container})` }}
    >
      <div className="w-[404px] h-[508px] bg-[#09090F] rounded-[20px] flex flex-col items-center">
        <div className="w-[194px] h-[76px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[46px]">
          Create A New Account
        </div>
        <p className="text-[10px] font-normal leading-[22px] text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div> // Display error message
        )}
        <div className="mt-[30px]">
          <Formik
            initialValues={{ fullName: "", email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.fullName) {
                errors.fullName = "Required";
              }
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
              handleSignup(values, setSubmitting); // Pass setSubmitting to handleSignup
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center w-full">
                <Field
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  className="w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm"
                />
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
                <Button
                  name={loading ? "Registering..." : "Register"} // Change button text based on loading state
                  className="mt-7"
                  disabled={isSubmitting || loading} // Disable button when submitting or loading
                  type="submit"
                />
              </Form>
            )}
          </Formik>
        </div>
        <div className="mt-[4px]">
          <p className="text-[12px] font-normal leading-[18px] text-[#C4C4C4] opacity-60">
            Already Registered?
            <span
              onClick={() => navigate("/login")}
              className="text-[12px] font-normal leading-[18px] text-[#C4C4C4] pl-1 opacity-100 cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
