import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import LoadingProgress from "./components/common/LoadingProgress";
import NotFound from "./components/common/NotFound";
import EditCouponManagement from "./components/form/EditCoupon/EditCouponManagement";
import Sidebar from "./components/layout/Sidebar";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Analysis from "./features/analysis/Analysis";
import Categories from "./features/categories/Categories";
import Coupons from "./features/coupon/Coupons";
import Dashboard from "./features/dashboard/Dashboard";
import Vendors from "./features/vendors/Vendors";

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  const handleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <>
          <div className={isDark ? "main dark" : "main"}>
            <>
              <Sidebar handleDarkMode={handleDarkMode} />
              <Switch>
                <ProtectedRoute
                  exact
                  path="/admin/dashboard"
                  component={Dashboard}
                />
                <ProtectedRoute
                  exact
                  path="/admin/categories"
                  component={Categories}
                />
                <ProtectedRoute path="/admin/coupons" component={Coupons} />
                <ProtectedRoute path="/admin/vendors" component={Vendors} />
                <Route
                  path="/admin/coupons/edit"
                  component={EditCouponManagement}
                />
                <ProtectedRoute
                  exact
                  path="/admin/analysis"
                  component={Analysis}
                />
              </Switch>
            </>
          </div>
        </>
        <Route path="*" exact component={NotFound} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Switch>
    </>
  );
};

export default App;
