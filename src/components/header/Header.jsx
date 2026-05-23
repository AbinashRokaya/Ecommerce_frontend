import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

function Header() {
  const { role, isLogin } = useContext(LoginContext);
  return (
    <>
      <div className="flex justify-between items-center flex-row p-3 mb-1 bg-gray-500">
        <div className="flex flex-row gap-2 justify-center items-center text-xl font-bold b">
          <h1 className="text-gray-100">Ecommerce</h1>
        </div>

        <div className="flex justify-center items-center flex-row gap-2">
          {isLogin && role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-blue-300 text-white" : "bg-blue-600 text-white"
                } px-6 py-1.5 rounded`
              }
            >
              <p className="text-lg font-sans font-bold">Admin</p>
            </NavLink>
          )}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-300 text-white" : "bg-blue-600 text-white"
              } px-6 py-1.5 rounded`
            }
          >
            <p className="text-lg font-sans font-bold">Home</p>
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-300 text-white" : "bg-blue-600 text-white"
              } px-6 py-1.5 rounded`
            }
          >
            <p className="text-lg font-sans font-bold">Login</p>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
