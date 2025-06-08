import React, { useState } from "react";
import { AdminLogin } from "../components/Authentication/AdminLogin";
import { UserLogin } from "../components/Authentication/UserLogin";

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(true); // 'admin' or 'user'

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center bg-badamidark p-8">
      <div className="bg-white rounded-lg shadow-md shadow-white p-8 min-w-[40%] w-auto flex flex-col lg:flex-row">
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-4 text-brown6">
            {isAdmin ? "Admin Login" : "User Login"}
          </h2>
          <p className="text-gray-600 mb-6">
            {isAdmin ? "Login as an administrator to manage the platform."
          : "Login as a student to access your account."}
          </p>

          {/* Buttons to Toggle Login Mode */}
          <div className="flex space-x-4 mb-6">
            <button className={`py-2 px-4 rounded-md font-medium transition 
              ${isAdmin ? "bg-brown5 text-white hover:bg-brown6 cursor-pointer" : "bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer"}`}
              onClick={() => setIsAdmin(!isAdmin)}
            >
              Admin
            </button>
            <button
              className={`py-2 px-4 rounded-md font-medium transition 
                ${!isAdmin ? "bg-brown5 text-white hover:bg-brown6 cursor-pointer" : "bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer"}`}
              onClick={() => setIsAdmin(!isAdmin)}
            >
              User
            </button>
          </div>

          {/* Login Form */}
          {isAdmin ? (
            <AdminLogin></AdminLogin>
          ) : (
            <UserLogin></UserLogin>
          )}

          {/* Divider */}
          <div className="text-center text-sm text-gray-500 my-4">OR</div>

          {/* Sign Up Link */}
          <div className="text-sm text-gray-500 mt-6 pb-4 text-center flex justify-center">
            Haven't signup?{" "}
            <p className="animate-bounce">
              <a href="/Signup" className="m-1 text-red-500 font-medium hover:underline">
                Sign up here!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
