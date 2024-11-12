// src/pages/CreateCustomer.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import dashboardIcon from "../assets/dashboardIcon.svg";
import DashboardPIC from "../assets/Dashboard.svg";
import Borrower from "../assets/Borrower.svg";
import Application from "../assets/Application.svg";
import Button from "../components/Button"; // Import the custom Button component

const CreateCustomer = () => {
    const [formData, setFormData] = useState({
        userId: "",
        paymentMethodId: "",
        email: "",
        name: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);
        // Place your API call logic here
    };

    return (
        <div className="dashboard_section flex">
            <div className="left_section border-r-[1px] border-[#097969] w-[250px]">
                <div className="flex">
                    <img
                        src={dashboardIcon}
                        alt="icon"
                        className="w-[66px] h-[66px] mt-[28px] ml-[32px]"
                    />
                    <div className="flex flex-col">
                        <p className="font-bold text-[15px] mt-[36px] ml-[16px]">Streaming App</p>
                        <p className="font-normal text-[9px] leading-3 ml-[16px] w-[120px]">
                            This is lorem ipsum tagline line purpose
                        </p>
                    </div>
                </div>

                <div className="flex flex-col mt-8">
                    <ul className="ml-[32px]">
                        <li className="flex justify-center items-center w-[216px] h-[56px] rounded-lg cursor-pointer hover:bg-gray-300 pr-12">
                            <NavLink
                                to="/dashboard"
                                className="flex justify-center items-center w-[216px] h-[56px] rounded-lg hover:bg-gray-300"
                            >
                                <img src={DashboardPIC} alt="" className="w-5 h-5 mt-[2px]" />
                                <span className="pl-2">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="flex justify-center items-center rounded-lg hover:bg-gray-300 w-[216px] h-[56px]">
                            <NavLink
                                to="/dashboard/user-management"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex justify-center items-center w-[216px] h-[56px] rounded-lg bg-gray-500 text-white"
                                        : "flex justify-center items-center w-[216px] h-[56px] rounded-lg hover:bg-gray-300"
                                }
                            >
                                <img src={Borrower} alt="" className="w-5 h-5 mt-[2px]" />
                                <span className="pl-2">User Management</span>
                            </NavLink>
                        </li>
                        <li className="flex justify-center items-center w-[216px] h-[56px] rounded-lg hover:bg-gray-300">
                            <NavLink
                                to="/dashboard/video-management"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex justify-center items-center w-[216px] h-[56px] rounded-lg bg-gray-500 text-white"
                                        : "flex justify-center items-center w-[216px] h-[56px] rounded-lg hover:bg-gray-300"
                                }
                            >
                                <img src={Application} alt="" className="w-5 h-5 mt-[2px]" />
                                <span className="pl-2">Videos Management</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="right_section w-[calc(100%-250px)] flex justify-center items-center p-8">
                <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-[900px] space-y-6 border border-white">
                    <h2 className="text-2xl font-bold mb-4 text-center text-white">Create Customer</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="userId" className="font-semibold mb-2 text-white">User ID</label>
                                <input
                                    type="text"
                                    id="userId"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-500 text-white bg-transparent"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="paymentMethodId" className="font-semibold mb-2 text-white">Payment Method ID</label>
                                <input
                                    type="text"
                                    id="paymentMethodId"
                                    name="paymentMethodId"
                                    value={formData.paymentMethodId}
                                    onChange={handleChange}
                                    className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-500 text-white bg-transparent"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="font-semibold mb-2 text-white">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-500 text-white bg-transparent"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="name" className="font-semibold mb-2 text-white">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-500 text-white bg-transparent"
                                    required
                                />
                            </div>
                            <div className="flex flex-col col-span-2">
                                <label htmlFor="description" className="font-semibold mb-2 text-white">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-500 text-white bg-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Center the button and ensure white text */}
                        <div className="flex justify-center mt-6">
                            <Button
                                type="submit"
                                className="mt-4 text-white bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded-md font-semibold transition-colors duration-300"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCustomer;
