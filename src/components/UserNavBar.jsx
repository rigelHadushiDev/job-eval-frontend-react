import logo from "../assets/images/logo.png";
import { useNavigate, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa"; // icons

const UserNavBar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

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
              <div className="md:ml-auto">
                <div className="flex space-x-2">
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
                  <button
                    onClick={handleAuthClick}
                    className={`flex items-center ${isLoggedIn ? "" : ""} ${
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
        </div>
      </nav>
    </div>
  );
};

export default UserNavBar;
