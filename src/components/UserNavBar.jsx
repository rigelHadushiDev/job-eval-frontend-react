import logo from "../assets/images/logo.png";
import { useNavigate, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaChevronDown,
  FaCog,
  FaUsers,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";

const UserNavBar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = !!auth?.accessToken;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAuthClick = () => {
    setDropdownOpen(false);
    if (isLoggedIn) {
      setAuth({});
      navigate("/sign-in");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div>
      <nav
        className="
          fixed top-0 left-0 w-full
          bg-[#f0f6fe]
          shadow-md
          z-50
        "
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                <img className="h-10 w-auto" src={logo} alt="React Jobs" />
                <span className="hidden md:block text-2xl font-bold ml-2">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Code
                  </span>
                  <span className="text-black">Pioneers</span>
                </span>
              </NavLink>
              <div className="md:ml-auto flex items-center space-x-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-black text-[#f0f6fe] rounded-md px-3 py-2 font-bold"
                      : "text-black px-3 py-2 rounded-md font-normal"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/jobs"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-black text-[#f0f6fe] rounded-md px-3 py-2 font-bold"
                      : "text-black px-3 py-2 rounded-md font-normal"
                  }
                >
                  Jobs
                </NavLink>
                {isLoggedIn && auth?.role === "USER" && (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen((open) => !open)}
                      className="flex items-center px-3 py-2 rounded-md text-black hover:bg-gray-200 focus:outline-none"
                      type="button"
                    >
                      <FaUserCircle className="h-6 w-6 mr-1" />
                      <span className="hidden md:block">Profile</span>
                      <FaChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                        <NavLink
                          to="/personal-details"
                          className="flex items-center px-4 py-2 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FaCog className="mr-2" />
                          Personal Details
                        </NavLink>
                        <NavLink
                          to="/user-data"
                          className="flex items-center px-4 py-2 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FaUsers className="mr-2" />
                          User Data
                        </NavLink>
                        <NavLink
                          to="/my-applications"
                          className="flex items-center px-4 py-2 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FaFileAlt className="mr-2" />
                          My Applications
                        </NavLink>
                      </div>
                    )}
                  </div>
                )}
                <button
                  onClick={handleAuthClick}
                  className={`flex items-center ${
                    location.pathname === "/sign-in"
                      ? "bg-black text-[#f0f6fe] rounded-md px-3 py-2 font-bold"
                      : "text-black px-3 py-2 rounded-md font-normal"
                  }`}
                >
                  {isLoggedIn ? (
                    <>
                      <FaSignOutAlt className="inline mr-2" />
                      Log out
                    </>
                  ) : (
                    <>
                      <FaSignInAlt className="inline mr-2" />
                      Log in
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavBar;
