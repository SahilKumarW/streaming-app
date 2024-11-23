import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import dashboardIcon from "../assets/dashboardIcon.svg";
import DashboardPIC from "../assets/Dashboard.svg";
import Borrower from "../assets/Borrower.svg";
import Application from "../assets/Application.svg";
import SubscriptionIcon from "/src/assets/subscriptionIcon.svg";

const Dashboard = () => {
  const location = useLocation(); // Get the current route location

  return (
    <div className="dashboard_section flex">
      <div className="left_section border-r-[1px] border-[#097969] w-[250px]">
        <div className="flex">
          <img
            src={dashboardIcon}
            alt="icon"
            className="w-[66px] h-[66px] mt-[28px] ml-[32px] filter brightness-0 invert"
          />
          <div className="flex flex-col">
            <p className="font-bold text-[15px] mt-[36px] ml-[16px]">Streaming App</p>
            <p className="font-normal text-[9px] leading-3 ml-[16px] w-[120px]">
              This is lorem ipsum tagline line purpose
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <ul className="ml-[32px] space-y-4">
            <li className="w-full h-[56px] rounded-lg cursor-pointer hover:bg-gray-300">
              <NavLink
                to="/dashboard"
                className="flex justify-start items-center w-full h-full rounded-lg hover:bg-gray-300 px-4"
              >
                <img src={DashboardPIC} alt="" className="w-5 h-5 mt-[2px]" />
                <span className="pl-2">Dashboard</span>
              </NavLink>
            </li>
            <li className="w-full h-[56px] rounded-lg cursor-pointer hover:bg-gray-300">
              <NavLink
                to="/dashboard/user-management"
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-start items-center w-full h-full rounded-lg bg-gray-500 text-white px-4"
                    : "flex justify-start items-center w-full h-full rounded-lg hover:bg-gray-300 px-4"
                }
              >
                <img src={Borrower} alt="" className="w-5 h-5 mt-[2px]" />
                <span className="pl-2">User Management</span>
              </NavLink>
            </li>
            <li className="w-full h-[56px] rounded-lg cursor-pointer hover:bg-gray-300">
              <NavLink
                to="/dashboard/video-management"
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-start items-center w-full h-full rounded-lg bg-gray-500 text-white px-4"
                    : "flex justify-start items-center w-full h-full rounded-lg hover:bg-gray-300 px-4"
                }
              >
                <img src={Application} alt="" className="w-5 h-5 mt-[2px]" />
                <span className="pl-2">Videos Management</span>
              </NavLink>
            </li>
            <li className="w-full h-[56px] rounded-lg cursor-pointer hover:bg-gray-300">
              <NavLink
                to="/dashboard/create-customer"
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-start items-center w-full h-full rounded-lg bg-gray-500 text-white px-4"
                    : "flex justify-start items-center w-full h-full rounded-lg hover:bg-gray-300 px-4"
                }
              >
                <img
                  src={SubscriptionIcon}
                  alt=""
                  className="w-5 h-5 mt-[2px] filter brightness-0 invert"
                />
                <span className="pl-2">Subscription Management</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="right_section w-[calc(100%-250px)] flex justify-center items-center">
        {/* Render buttons only on the main dashboard page */}
        {location.pathname === "/dashboard" && (
          <div className="flex space-x-8 justify-center w-full">
            <button
              className="flex flex-col items-center justify-center w-[150px] h-[250px] bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition"
              onClick={() => window.location.href = "/dashboard/user-management"}
            >
              <img src={Borrower} alt="User Icon" className="w-[60px] h-[60px] mb-4" />
              <span className="text-sm font-bold uppercase">Manage Users</span>
            </button>
            <button
              className="flex flex-col items-center justify-center w-[150px] h-[250px] bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition"
              onClick={() => window.location.href = "/dashboard/video-management"}
            >
              <img src={Application} alt="Videos Icon" className="w-[60px] h-[60px] mb-4" />
              <span className="text-sm font-bold uppercase">Manage Videos</span>
            </button>
            <button
              className="flex flex-col items-center justify-center w-[150px] h-[250px] bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition"
              onClick={() => window.location.href = "/dashboard/create-customer"}
            >
              <img
                src={SubscriptionIcon}
                alt="Subscription Icon"
                className="w-[80px] h-[80px] mb-4 filter brightness-0 invert"
              />
              <span className="text-sm font-bold uppercase">Manage Subscriptions</span>
            </button>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
