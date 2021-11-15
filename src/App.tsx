import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import LoadingProgress from "./components/common/LoadingProgress";
import NotFound from "./components/common/NotFound";
import Sidebar from "./components/layout/Sidebar";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Analysis from "./features/analysis/Analysis";
import Categories from "./features/categories/Categories";
import Coupons from "./features/coupon/Coupons";
import Dashboard from "./features/dashboard/Dashboard";
import Vendors from "./features/vendors/Vendors";

const App: React.FC = () => {
  const { isLoading } = useAuth0();
  const [isDark, setIsDark] = useState(false);

  const handleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      {isLoading ? (
        <LoadingProgress />
      ) : (
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute
            path="/admin"
            render={(props) => (
              <>
                <div className={isDark ? "main dark" : "main"}>
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
                    <ProtectedRoute
                      exact
                      path="/admin/coupons"
                      component={Coupons}
                    />
                    <ProtectedRoute
                      exact
                      path="/admin/vendors"
                      component={Vendors}
                    />
                    <ProtectedRoute
                      exact
                      path="/admin/analysis"
                      component={Analysis}
                    />
                    <Route path="*" component={NotFound} />
                  </Switch>
                </div>
              </>
            )}
          />
          <Route path="*" render={() => <Redirect to="/" />} />
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
          {/* <>
            <div className={isDark ? "main dark" : "main"}>
              <Sidebar handleDarkMode={handleDarkMode} />
              <Switch></Switch>
              
            </div>
          </> */}
        </Switch>
      )}
    </>
  );
};

export default App;
