import React, { useState, useEffect } from "react";
import { UserSignUpHandler } from "./SignUpHandler";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export function UserSignup({moveToOtp}){
    const [colleges, setColleges] = useState([]);
    const [hostels, setHostels] = useState([]);

    const[userSignupData, setUserSignupData] = useState({
        isAdmin : false,
        name : "",
        college : "",
        hostel : "",
        regNo: "",
        phone : "",
        email : "",
        password : ""
    })

    useEffect(() => {
        axios.get(`${API_URL}/auth/get-college`)
            .then(response => setColleges(response.data))
            .catch(error => console.error("Error fetching colleges:", error));

        axios.get(`${API_URL}/auth/get-hostel`)
            .then(response => setHostels(response.data))
            .catch(error => console.error("Error fetching hostels:", error));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target; // Get field fieldname & value
        setUserSignupData((prevUser) => ({
          ...prevUser, // Spread previous state
          [name]: value, // Update only the changed field
        }));
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        alert("Requesting OTP... Please wait a moment.")
        await UserSignUpHandler(userSignupData, moveToOtp);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Name
                </label>
                <input type="text" name="name" id="name" autoFocus placeholder="Enter your name" className="w-full p-3 border rounded-md"
                onChange={handleChange} required/>
            </div>
            {/* College Selection */}
            <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-2">College</label>
                <select name="college" id="college" className="w-full p-3 border rounded-md"
                onChange={handleChange} >
                    <option value="">Select your college</option>
                    {colleges.map(college => (
                        <option key={college} value={college}>{college}</option>
                    ))}
                </select>
            </div>

            {/* Hostel Selection */}
            <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-2">Hostel</label>
                <select name="hostel" id="hostel" className="w-full p-3 border rounded-md"
                onChange={handleChange} >
                    <option value="">Select your hostel</option>
                    {hostels.map(hostel => (
                        <option key={hostel} value={hostel}>{hostel}</option>
                    ))}
                </select>
            </div>

            <div className="mb-2">
                <label htmlFor="authority" className="block text-gray-700 font-medium mb-2">
                    Registration Number
                </label>
                <input type="text" name="regNo" id="RegNo" placeholder="Enter your Registration Number" className="w-full p-3 border rounded-md"
                onChange={handleChange} required/>
            </div>
            <label htmlFor="PhoneNo." className="block text-gray-700 font-medium mb-2">
                Phone No.
            </label>
            <div className="mb-2 flex md-4 border rounded-md">
                <input type="text" name="phone" placeholder="Enter your phone number" className="w-full p-3 rounded-md"
                onChange={handleChange} required/>
            </div>
            <div className="mb-2">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                </label>
                <input type="text" name="email" id="email" placeholder="Enter your official college email (e.g., student@mnnit.ac.in)" className="w-full p-3 border rounded-md"
                onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                </label>
                <input type="password" name="password" id="password" placeholder="Enter your password" className="w-full p-3 border rounded-md"
                onChange={handleChange} required/>
            </div>
            <button  type="submit" className="w-full text-white py-3 shadow-md flex justify-center items-center shadow-brown2 rounded-md hover:shadow-md bg-brown6 hover:bg-badamidark cursor-pointer active:scale-95 transition">
                Sign Up
            </button>
        </form>
    )
}
