import React, { useState } from "react";
import { OtpHandler } from "../components/Authentication/SignUpHandler";
import { useNavigate } from "react-router";

const OTPPage = ({isAdmin, formData, onFailure}) => {
  const navigate = useNavigate();
  const[otp, setOtpEntered] = useState("");
  let isResend = false;

  return (
    <div className="min-h-screen flex items-center justify-center bg-badami1">
      <div className="w-full max-w-md bg-badami2 shadow-xl rounded-2xl p-6">
        <div className="p-4">
          <h1 className="text-3xl font-bold text-center text-midnight mb-4">
            Enter OTP
          </h1>
          <p className="text-center text-brown4 mb-6">
            We sent a 6-digit code to your registered email. Please enter it below.
          </p>
          <form className="space-y-4">
            <input type="text" maxLength={6} placeholder="Enter OTP" className="w-full p-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-tahiti  text-midnight bg-brown1 border-brown3"
            onChange={(e)=>{
              setOtpEntered(e.target.value);
            }}/>
            <button className="w-full py-3 text-lg font-semibold bg-btn-green  text-white rounded-lg hover:bg-green1 cursor-pointer active:scale-95 transition" type="submit"
            onClick={(e)=>{
              e.preventDefault();
              isResend = false;
              OtpHandler({isAdmin, formData, otp, onFailure, navigate, isResend});
            }}>
              Verify OTP
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-brown5">
              Didn’t receive the code?&nbsp;
              <button type="button" className="text-orange1 hover:underline animate-bounce hover:cursor-pointer active:scale-95 transition"
              onClick={(e)=>{
                e.preventDefault();
                isResend = true;
                OtpHandler({isAdmin, formData, otp, onFailure, navigate, isResend})
              }}>
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
