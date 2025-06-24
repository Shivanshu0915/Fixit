import React, { useState, useEffect } from "react";
import axios from "axios";
import { AdminSignUpHandler } from "./SignUpHandler";
const API_URL = import.meta.env.VITE_API_URL;

export function AdminSignup({ moveToOtp }) {
    const [colleges, setColleges] = useState([]);
    const [selectedCollege, setSelectedCollege] = useState("");
    const [customCollege, setCustomCollege] = useState("");
    
    const [hostels, setHostels] = useState([]);
    const [selectedHostel, setSelectedHostel] = useState("");
    const [customHostel, setCustomHostel] = useState("");

    const [categories, setCategories] = useState(["Mess", "Hostel", "Warden", "Chief Warden"]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [customCategory, setCustomCategory] = useState("");

    const [positions, setPositions] = useState(["Mess Manager", "Store Keeper", "Caretaker", "Technician"]);
    const [selectedPosition, setSelectedPosition] = useState("");
    const [customPosition, setCustomPosition] = useState("");

    const [document, setDocument] = useState(null);
    const [adminSignupData, setAdminSignupData] = useState({
        isAdmin: true,
        name: "",
        category: "",
        position: "",
        college: "",
        hostel: "",
        phone: "",
        email: "",
        password: "",
        document: null,
        domain: "",
    });

    useEffect(() => {
        axios.get(`${API_URL}/auth/get-college`)
            .then(response => setColleges(response.data))
            .catch(error => console.error("Error fetching colleges:", error));

        axios.get(`${API_URL}/auth/get-hostel`)
            .then(response => setHostels(response.data))
            .catch(error => console.error("Error fetching hostels:", error));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAdminSignupData((prevAdmin) => ({
            ...prevAdmin,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setDocument(file);
        setAdminSignupData((prevData) => ({
            ...prevData,
            document: file,
        }));
    };

    const handleDropdownChange = (event, setSelected, setCustom, fieldName) => {
        const value = event.target.value;
        setSelected(value);
        setCustom("");
        setAdminSignupData((prevData) => ({
            ...prevData,
            [fieldName]: value === "custom" ? "" : value,
        }));
    };

    // Updated custom input handler: removed setSelected("")
    const handleCustomInputChange = (event, setCustom, fieldName) => {
        const value = event.target.value;
        setCustom(value);
        setAdminSignupData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(adminSignupData).forEach((key) => {
            if (key === "document") {
                formData.append(key, document);
            } else {
                formData.append(key, adminSignupData[key]);
            }
        });
        alert("Requesting OTP... Please wait a moment.")
        await AdminSignUpHandler(formData, moveToOtp);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input  type="text" name="name" autoFocus placeholder="Enter your name" className="w-full p-3 border rounded-md" 
                onChange={handleChange} required />
            </div>

            {/* College Selection */}
            <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-2">College</label>
                <select  className="w-full p-3 border rounded-md"  value={selectedCollege}
                 onChange={(e) => handleDropdownChange(e, setSelectedCollege, setCustomCollege, "college")} required>
                    <option value="">Select your college</option>
                    {colleges.map(college => (
                        <option key={college} value={college}>{college}</option>
                    ))}
                    <option value="custom">Other (Enter Manually)</option>
                </select>
                {selectedCollege === "custom" && (
                    <input type="text" name="customCollege" placeholder="Enter college name" className="w-full p-3 border rounded-md mt-2" value={customCollege}
                    onChange={(e) => handleCustomInputChange(e, setCustomCollege, "college")} required/>
                )}
            </div>

            {/* Hostel Selection */}
            <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-2">Hostel</label>
                <select className="w-full p-3 border rounded-md" value={selectedHostel}
                 onChange={(e) => handleDropdownChange(e, setSelectedHostel, setCustomHostel, "hostel")} required>
                    <option value="">Select your hostel</option>
                    {hostels.map(hostel => (
                        <option key={hostel} value={hostel}>{hostel}</option>
                    ))}
                    <option value="custom">Other (Enter Manually)</option>
                </select>
                {selectedHostel === "custom" && (
                    <input  type="text"  name="customHostel"  placeholder="Enter hostel name" className="w-full p-3 border rounded-md mt-2" value={customHostel}
                    onChange={(e) => handleCustomInputChange(e, setCustomHostel, "hostel")} required/>
                )}
            </div>

            {/* Category Selection */}
            <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <select className="w-full p-3 border rounded-md" value={selectedCategory}
                    onChange={(e) => handleDropdownChange(e, setSelectedCategory, setCustomCategory, "category")}required>
                    <option value="">Select category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                    <option value="custom">Other (Enter Manually)</option>
                </select>
                {selectedCategory === "custom" && (
                    <input  type="text"  name="customCategory"  placeholder="Enter category" className="w-full p-3 border rounded-md mt-2" value={customCategory}
                        onChange={(e) => handleCustomInputChange(e, setCustomCategory, "category")} required/>
                )}
            </div>

            {/* Position Selection */}
            <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-2">Position</label>
                <select  className="w-full p-3 border rounded-md"  value={selectedPosition}
                 onChange={(e) => handleDropdownChange(e, setSelectedPosition, setCustomPosition, "position")}required>
                    <option value="">Select position</option>
                    {positions.map(position => (
                        <option key={position} value={position}>{position}</option>
                    ))}
                    <option value="custom">Other (Enter Manually)</option>
                </select>
                {selectedPosition === "custom" && (
                    <input  type="text"  name="customPosition"  placeholder="Enter position" className="w-full p-3 border rounded-md mt-2" value={customPosition}
                        onChange={(e) => handleCustomInputChange(e, setCustomPosition, "position")} required/>
                )}
            </div>
            
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
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
                <input  type="text" name="email" id="email" placeholder="Enter your email" className="w-full p-3 border rounded-md" 
                    onChange={handleChange} required/>
            </div>
            <div className="mb-2">
                <label htmlFor="domain" className="block text-gray-700 font-medium mb-2">
                    College domain
                </label>
                <input  type="text" name="domain" id="domain" placeholder="Enter official email domain (e.g., mnnit.ac.in)"
                 className="w-full p-3 border rounded-md" 
                    onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                </label>
                <input type="password"  name="password"  id="password"  placeholder="Enter your password"  className="w-full p-3 border rounded-md" 
                 onChange={handleChange} required/>
            </div>
            
            {/* Document Upload */}
            <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-2">Upload Document Proof</label>
                <input type="file" name="document" onChange={handleFileChange} className="w-full p-3 border rounded-md cursor-pointer" required/>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full text-white py-3 bg-brown6 rounded-md hover:bg-brown-700 cursor-pointer active:scale-95">
                Request Signup
            </button>
        </form>
    );
}