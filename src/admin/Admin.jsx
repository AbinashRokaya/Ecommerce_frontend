import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="min-h-screen w-full grid grid-cols-12 bg-gray-100">
      {/* Sidebar */}
      <div className="col-span-2 bg-gray-500 p-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Admin Panel</h2>
        </div>
        <div className="w-full min-h-screen bg-gray-700 rounded-lg p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${isActive ? "text-white" : "text-gray-400"} text-gray-300 hover:text-white cursor-pointer `
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="productList"
                className={({ isActive }) =>
                  `${isActive ? "text-white" : "text-gray-400"} text-gray-300 hover:text-white cursor-pointer `
                }
              >
                Product List
              </NavLink>
            </li>

            <li>
              <NavLink
                to="categoryList"
                className={({ isActive }) =>
                  `${isActive ? "text-white" : "text-gray-400"} text-gray-300 hover:text-white cursor-pointer `
                }
              >
                Category List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="orders"
                className={({ isActive }) =>
                  `${isActive ? "text-white" : "text-gray-400"} text-gray-300 hover:text-white cursor-pointer `
                }
              >
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-10 bg-gray-300 ">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
