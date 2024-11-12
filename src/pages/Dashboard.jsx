import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom"; // Import useLocation
import dashboardIcon from "../assets/dashboardIcon.svg";
import DashboardPIC from "../assets/Dashboard.svg";
import Borrower from "../assets/Borrower.svg";
import Application from "../assets/Application.svg";

const Dashboard = () => {
  const location = useLocation(); // Get the current route location

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

      <div className="right_section w-[calc(100%-250px)] flex justify-center items-center">
        {/* Render buttons only on the main dashboard page */}
        {location.pathname === "/dashboard" && (
          <div className="flex flex-col space-y-4 items-center">
            <button
              className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
              onClick={() => window.location.href = "/dashboard/user-management"}
            >
              Manage Users
            </button>
            <button
              className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
              onClick={() => window.location.href = "/dashboard/video-management"}
            >
              Manage Videos
            </button>
            <button
              className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
              onClick={() => window.location.href = "/dashboard/subscription-management"}
            >
              Subscription Management
            </button>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
