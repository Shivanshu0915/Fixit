import React, { useState } from "react";

import { UserSignup } from "../components/Authentication/UserSignup.jsx"
import { AdminSignup } from "../components/Authentication/AdminSignup.jsx";
import OTPPage from "./OTP.jsx";

const Signup = () => {
  const [isAdmin, setLoginMode] = useState(true); // 'admin' or 'user'
  const [data, setData] = useState(null);
  const [email, setEmail] = useState(null);
  return (
    <>
      {(data || email) ? (
        isAdmin ? <OTPPage isAdmin={isAdmin} formData={data} onFailure={() => setData(null)} /> : <OTPPage isAdmin={isAdmin} formData={email} onFailure={() => setEmail(null)} />
      ) : (
        <div className="min-h-[100vh] w-full flex items-center justify-center bg-badamidark p-8">
          <div className="bg-white rounded-lg shadow-md shadow-white p-8 min-w-[40%] w-auto flex flex-col lg:flex-row">

            <div className="w-full">
              <h2 className="text-3xl font-bold mb-4 text-brown6">
                {isAdmin ? "Admin Sign Up" : "User Sign Up"}
              </h2>
              <p className="text-gray-600 mb-6">
                {isAdmin ? "Signup as a super admin to manage the platform for your college."
                  : "Signup as a student to make your account."}
              </p>

              {/* Buttons to Toggle Login Mode */}
              <div className="flex space-x-4 mb-6">
                <button className={`py-2 px-4 rounded-md font-medium transition 
                  ${isAdmin ? "bg-brown5 text-white hover:bg-brown6 cursor-pointer" : "bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer"}`}
                  onClick={() => setLoginMode(!isAdmin)}
                >
                  Admin
                </button>
                <button
                  className={`py-2 px-4 rounded-md font-medium transition 
                    ${!isAdmin ? "bg-brown5 text-white hover:bg-brown6 cursor-pointer" : "bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer"}`}
                  onClick={() => setLoginMode(!isAdmin)}
                >
                  User
                </button>
              </div>

              {/* Signup Form */}
              {isAdmin ? (
                <AdminSignup moveToOtp={setData}></AdminSignup>)
                : (
                  <UserSignup moveToOtp={setEmail}></UserSignup>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
