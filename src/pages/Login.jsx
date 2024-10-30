import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Container from "../assets/Container.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const login = (values) => {
    axios
      .post("http://streamapp2-env.eba-jqkp2xdu.us-east-2.elasticbeanstalk.com/api/auth", {
        username: values.email,
        password: values.password,
      })
      .then((response) => {
        console.log("Response from login:", response.data); // Log response data

        // Check for successful login and access token
        if (response.data.apiCode === 0 && response.data.data) {
          const { token, id: userId, role } = response.data.data; // Extract token, user ID, and role
          console.log("Extracted token:", token); // Log extracted token

          if (token) {
            // Save token, userId, and role to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('role', role);

            toast.success("User Successfully Logged In");
            console.log(localStorage.getItem('token'));
            console.log(localStorage.getItem('userId'));
            console.log(localStorage.getItem('role'));

            // Navigate to home page
            navigate("/home");
          } else {
            toast.error("Token not found in response!");
          }
        } else {
          toast.error("Email or password is incorrect!");
        }
      })
      .catch((error) => {
        console.log("Login failed:", error);
        if (error.response && error.response.status === 401) {
          toast.error("Email or password is incorrect!");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };

  const initialValues = {
    email: "",
    password: ""
  };

  return (
    <div
      className="flex justify-center items-center pt-10 h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Container})` }}
    >
      <div className="w-[404px] h-[438px] bg-[#09090F] rounded-[20px] flex flex-col items-center">
        <div className="w-[194px] h-[76px] text-center flex justify-center items-center text-white text-[28px] leading-[38px] font-semibold mt-[46px]">
          Welcome to App Name
        </div>
        <p className="text-[10px] font-normal leading-[22px] text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
        <div className="mt-[30px]">
          <Formik
            initialValues={initialValues}
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
              login(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
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
                <Button
                  name="Login"
                  type="submit"
                  className="mt-2"
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </div>
        <div className="mt-[10px]">
          <p className="text-[12px] font-normal leading-[18px] text-[#C4C4C4] opacity-60">
            Don't have an account?
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
