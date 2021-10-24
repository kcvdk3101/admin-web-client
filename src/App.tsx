import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/layout/Sidebar";
import Login from "./components/login/Login";
import Analysis from "./features/analysis/Analysis";
import Categories from "./features/categories/Categories";
import CouponComponent from "./features/coupon/Coupon";
import Dashboard from "./features/dashboard/Dashboard";
import Vendors from "./features/vendors/Vendors";

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
            <Route exact path="/admin/coupon" component={CouponComponent} />
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
