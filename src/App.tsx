import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Analysis from "./features/analysis/Analysis";
import Categories from "./features/categories/Categories";
import Dashboard from "./features/dashboard/Dashboard";
import Login from "./components/login/Login";
import Vendors from "./features/vendors/Vendors";
import Coupon from "./features/coupon/Coupon";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  const { isAuthenticated, isLoading, logout } = useAuth0();
  const [isDark, setIsDark] = useState(false);

  const handleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : !isAuthenticated ? (
        <Login />
      ) : (
        <div
          className={
            isDark
              ? "relative min-h-screen md:flex dark"
              : "relative min-h-screen md:flex"
          }
        >
          <Sidebar handleDarkMode={handleDarkMode} />
          <Switch>
            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route exact path="/admin/categories" component={Categories} />
            <Route exact path="/admin/vendors" component={Vendors} />
            <Route exact path="/admin/coupon" component={Coupon} />
            <Route exact path="/admin/analysis" component={Analysis} />
          </Switch>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      )}
    </>
  );
};

export default App;
