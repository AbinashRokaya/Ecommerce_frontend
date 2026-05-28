import React, { useContext } from "react";
import Card from "./Card";
import { Link, NavLink, Outlet } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function () {
  const { role, isLogin, isSuccess } = useContext(LoginContext);
  return (
    <div
      className={`${isSuccess ? "blur-sm" : ""} min-h-screen w-full grid grid-cols-12 bg-gray-100 `}
    >
      <div className="col-span-2 bg-gray-500 p-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">User Panel</h2>
        </div>
        <div className="w-full min-h-screen bg-gray-700 rounded-lg p-4">
          <ul className="space-y-2 ">
            <li className="w-full">
              <NavLink
                to=""
                className={({ isActive }) =>
                  `${isActive ? "text-white" : "text-gray-400"} text-gray-300 hover:text-white cursor-pointer `
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  `${isActive ? "text-white" : "text-gray-400"} text-gray-300 hover:text-white cursor-pointer`
                }
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="about"
                className={({ isActive }) =>
                  `${isActive ? "text-white" : "text-gray-400"} text-gray-300 hover:text-white cursor-pointer`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-10 bg-gray-300 ">
        <Outlet />
      </div>
    </div>
  );
}
