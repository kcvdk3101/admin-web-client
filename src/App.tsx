import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import Analysis from "./features/analysis/Analysis";
import { Categories } from "./features/categories/Categories";
import Dashboard from "./features/dashboard/Dashboard";
import Login from "./features/login/Login";
import Vendors from "./features/vendors/Vendors";

const App: React.FC = () => {
  const { isAuthenticated, isLoading, logout } = useAuth0();

  // const btn = document.querySelector(".mobile-menu-button");
  // const sidebar = document.querySelector(".sidebar");

  // // add our event listener for the click
  // btn.addEventListener("click", () => {
  //   sidebar.classList.toggle("-translate-x-full");
  // });

  const handleTranslateX = () => {
    return document
      .querySelector(".sidebar")
      ?.classList.toggle("-translate-x-full");
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <div className="relative min-h-screen md:flex">
          <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
            <Link
              to="/admin/dashboard"
              className="block p-4 text-white font-bold"
            >
              eShop Administration
            </Link>

            <button
              className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
              onClick={handleTranslateX}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
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

          <div className="sidebar bg-blue-600 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
            <Link
              to="/admin/dashboard"
              className="text-white flex items-center space-x-2 px-4"
            >
              <span className="text-2xl font-extrabold">
                eShop Administration
              </span>
            </Link>
            <nav>
              <Link
                to="/admin/dashboard"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/categories"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
              >
                Categories
              </Link>
              <Link
                to="/admin/vendors"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
              >
                Vendors
              </Link>
              <Link
                to="/admin/analysis"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
              >
                Analysis
              </Link>
              <button
                className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </button>
            </nav>
          </div>
          <Switch>
            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route exact path="/admin/categories" component={Categories} />
            <Route exact path="/admin/vendors" component={Vendors} />
            <Route exact path="/admin/analysis" component={Analysis} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </div>
      )}
    </>
  );
};

export default App;
