import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Container from "../assets/Container.png";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import AuthService from "../api/authService"; // Import AuthService for API call
import { toast } from "react-toastify";
import * as Yup from "yup"; // Import Yup for validation schema

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    gender: Yup.number()
      .oneOf([0, 1], "Please select a valid gender")
      .required("Gender is required"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignup = async (values, setSubmitting) => {
    setLoading(true);
    try {
      const response = await AuthService.register({
        ...values,
        gender: Number(values.gender),
        dateOfBirth: new Date(values.dateOfBirth).toISOString(), // Ensure date format is correct
      });

      // Check if the response indicates success
      if (response.displayMessage === 'User added successfully.') {
        toast.success(response.displayMessage);
        navigate("/login"); // Redirect to login after successful registration
      } else {
        throw new Error(response.displayMessage || "Registration failed");
      }
    } catch (error) {
      // Improved error handling
      console.error("Error during signup:", error);
      if (error.response && error.response.data) {
        const serverError = error.response.data.displayMessage || "An error occurred. Please try again.";
        setErrorMessage(serverError); // Set error message for user feedback
        toast.error(serverError); // Toast the error message
      } else {
        setErrorMessage(error.message || "An unexpected error occurred.");
        toast.error(error.message || "An unexpected error occurred.");
      }
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
      <div className="w-[404px] pb-5 bg-[#09090F] rounded-[20px] flex flex-col items-center">
        <div className="w-[194px] h-[76px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[46px]">
          Create A New Account
        </div>
        <p className="text-[10px] font-normal leading-[22px] text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )}
        <div className="mt-[20px]">
          <Formik
            initialValues={{
              name: "",
              email: "",
              phoneNumber: "",
              gender: -1, // Ensure default invalid gender selection
              dateOfBirth: "",
              password: "",
            }}
            validationSchema={SignupSchema} // Apply Yup validation schema
            onSubmit={(values, { setSubmitting }) => {
              handleSignup(values, setSubmitting);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center w-full">
                <Field
                  type="text"
                  name="name"
                  placeholder="Full name"
                  className="w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
                />
                <ErrorMessage
                  name="name"
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
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone number"
                  className="w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  as="select"
                  name="gender"
                  className="w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
                >
                  <option value={-1} label="Select gender" />
                  <option value={0} label="Male" />
                  <option value={1} label="Female" />
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  type="date"
                  name="dateOfBirth"
                  className="w-[311px] h-[56px] rounded-[14px] border border-white bg-black text-white text-[12px] font-medium leading-[18px] px-4 mb-4 placeholder-gray-500"
                />
                <ErrorMessage
                  name="dateOfBirth"
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
                  name={loading ? "Registering..." : "Register"}
                  className="mt-7"
                  disabled={isSubmitting || loading}
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
