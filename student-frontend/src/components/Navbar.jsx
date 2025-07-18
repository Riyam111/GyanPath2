import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

function Navbar() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
const dropdownRef = useRef(null);
  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdownOpen(false);
  };
useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left - Logo & Links */}
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-violet-400">🎓 GyanPath</h1>

          {/* Show on medium+ screens */}
          {token && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/all-students"
                className="text-gray-700 hover:text-violet-500 transition"
              >
                All Students

              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-violet-500 transition"
              >
                Profile
              </Link>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="relative" ref={dropdownRef}>
          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <FaUserCircle
              className="text-3xl text-gray-700 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-50">
            {token ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-violet-600 hover:bg-gray-100"
              >
                Login
              </Link>
            )}
            </div>
            )}
          </div>

          {/* Mobile - Profile Icon + Dropdown */}
          <div className="md:hidden" >
            <FaUserCircle
              className="text-3xl text-gray-700 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-50">
                {token ? (
                  <>
                    <Link
                      to="/all-students"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      All Students
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-violet-600 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
