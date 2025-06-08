import { useState } from "react";
import { LoginHandler } from "./LoginHandler";

export function UserLogin() {
    const isAdmin = false;
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        LoginHandler({isAdmin, email, password})
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                </label>
                <input type="text" name="email" id="email" placeholder="Enter your email" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:brown6"
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                </label>
                <input type="password" name="password" id="password" placeholder="Enter your password" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:brown6"
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
            </div>
            <button type="submit" className="w-full text-white py-3 bg-brown6 shadow-lg shadow-brown2 rounded-md transition hover:shadow-md cursor-pointer active:scale-95">
                Login as User
            </button>
        </form>
    )
}