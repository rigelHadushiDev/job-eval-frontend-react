// src/components/CRMSideBar.jsx
import React, { useEffect } from "react";
import { FaBriefcase, FaUser, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CRMSidebar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.accessToken) {
      navigate("/sign-in");
    }
  }, [auth, navigate]);

  const isLoggedIn = !!auth?.accessToken;

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setAuth({});
      navigate("/sign-in");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <aside className="w-64 h-screen border-r border-gray-200 bg-white">
      <div className="p-4">
        <nav className="space-y-1">
          <NavLink
            to="/crm/jobposting"
            className={({ isActive }) =>
              `w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <FaBriefcase className="mr-2 h-4 w-4" />
            <span>Managing Job Posting</span>
          </NavLink>
          <NavLink
            to="/crm/personal-details"
            className={({ isActive }) =>
              `w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <FaUser className="mr-2 h-4 w-4" />
            <span>Personal Details</span>
          </NavLink>
          <NavLink
            to="/crm/add-employee"
            className={({ isActive }) =>
              `w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <FaUserPlus className="mr-2 h-4 w-4" />
            <span>Add Employee</span>
          </NavLink>
          {isLoggedIn && (
            <button
              onClick={handleAuthClick}
              className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <FaSignOutAlt className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </button>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default CRMSidebar;
