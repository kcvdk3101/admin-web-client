import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  handleDarkMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleDarkMode }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { logout } = useAuth0();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="bg-blue-600 text-gray-100 flex justify-between md:hidden dark:bg-gray-700">
        <Link
          to="/admin/dashboard"
          className="block p-4 text-white font-bold dark:text-green-500"
        >
          eShop Administration
        </Link>

        <button
          className="mobile-menu-button p-4 focus:outline-none dark:text-green-500"
          onClick={handleToggle}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className={toggle ? "sidebar-md" : "sidebar"}>
        <Link
          to="/admin/dashboard"
          className="text-white flex items-center space-x-2 px-4 dark:text-green-500"
        >
          <span className="text-2xl font-extrabold">eShop Administration</span>
        </Link>
        <nav>
          <Link to="/admin/dashboard" className="btn-link">
            Dashboard
          </Link>
          <Link to="/admin/categories" className="btn-link">
            Categories
          </Link>
          <Link to="/admin/vendors" className="btn-link">
            Vendors
          </Link>
          <Link to="/admin/coupon" className="btn-link">
            Coupon
          </Link>
          <Link to="/admin/analysis" className="btn-link">
            Analysis
          </Link>
          <button
            className="btn-link w-full text-left"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </button>
          <label
            htmlFor="toggleB"
            className="flex items-center cursor-pointer pl-3 mt-2"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="toggleB"
                className="sr-only"
                onClick={handleDarkMode}
              />
              <div className="block bg-white w-14 h-6 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-blue-500 w-6 h-4 rounded-full transition"></div>
            </div>
            <div className="ml-3 text-white font-medium">Dark mode</div>
          </label>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
