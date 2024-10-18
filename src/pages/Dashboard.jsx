import React from "react";
import { NavLink, Outlet } from "react-router-dom"; // Use NavLink for active links
import dashboardIcon from "../assets/dashboardIcon.svg";
import DashboardPIC from "../assets/Dashboard.svg";
import Borrower from "../assets/Borrower.svg";
import Application from "../assets/Application.svg";

const Dashboard = () => {
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
            <li className="flex justify-center items-center w-[216px] h-[56px] rounded-lg hover:bg-gray-300 ">
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

      <div className="right_section w-[calc(100%-250px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
