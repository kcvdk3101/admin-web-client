import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const { loginWithPopup } = useAuth0();
  const history = useHistory();

  return (
    <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
      <div className="relative sm:max-w-sm w-full ">
        <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
        <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
        <div className="relative  rounded-3xl p-4 bg-gray-100 shadow-md">
          <button
            className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
            onClick={() =>
              loginWithPopup().then(() => history.push("/admin/dashboard"))
            }
          >
            Login with Auth0
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
