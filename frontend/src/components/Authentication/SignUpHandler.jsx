import axios from "axios";
import { ErrorMsg } from "./AuthErrorMsgs";
// import {toast } from "react-toastify"
const API_URL = import.meta.env.VITE_API_URL;

export const UserSignUpHandler = async (props, moveToOtp) => {
    try{
        const response = await axios.post(`${API_URL}/auth/signup`, props , {
            headers: {
                "Content-Type": "application/json",
            },
        });
        alert("Redirecting to OTP page!");
        moveToOtp(props.email);
    } 
    catch (error) {
        ErrorMsg(error);
    }
};

export const AdminSignUpHandler = async (props, moveToOtp) => {
    try{
        const signupObject = {};
        props.forEach((value, key) => {
            if(!(key === "document")) signupObject[key] = value;
        });

        const response = await axios.post(`${API_URL}/auth/signup`,signupObject);
        alert("Redirecting to OTP page!");
        moveToOtp(props);
    } 
    catch(error) {
        ErrorMsg(error);
    }
};

export const OtpHandler = async ({isAdmin, formData, otp, onFailure, navigate, isResend}) => {
    let props;
    if(isAdmin){
        const formObject = Object.fromEntries(formData.entries());
        props = {
            email : formObject.email,
            otp : otp
        }
    }
    else{
        props = {
            email : formData,
            otp : otp
        }
    }

    const path = isResend ? `${API_URL}/auth/resend-otp` : `${API_URL}/auth/verify-otp`;
    try{
        const response = await axios.post(path, props);
        if(isResend === true){
            // toast.success("OTP resent successfully!") 
            alert("OTP resent successfully!") 
            return;
        }
        else{
            if(isAdmin){
                alert("Otp verified successfully!")
                const response = await axios.post(`${API_URL}/auth/admin-signup-request`, formData);
                alert("Waiting for approval. Check  your email");
                navigate("/");
            }
            else{
                alert("User signed up successfully! Login to continue.");
                navigate("/login")
            }
            return;
        }
    } 
    catch (error) {
        ErrorMsg(error);
        onFailure();
    }
};

