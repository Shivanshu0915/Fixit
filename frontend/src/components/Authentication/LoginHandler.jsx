import axios from "axios";
// import {toast} from "react-toastify";
// import {useNavigate} from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export const LoginHandler = async (props)=>{
    // const navigate = useNavigate();
    // console.log(props);
    try{
        const response = await axios.post(`${API_URL}/auth/login`, props, {
            headers : {
                "Content-Type" : "application/json",
            },
            withCredentials: true, // Send cookies
        });
        const accessToken = response.data.accessToken;

        // Decode the token to get id, email, role
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const { id: userId, email: userEmail, role } = payload;

        // Store decoded values
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("role", role);
        // toast.success("Logged in successfully!");
        alert("Logged in successfully!");
        window.location.href = response.data.role === "user" ? "/studentDashboard" : "/adminDashboard";
        // navigate(response.data.role === "user" ? "/studentDashboard" : "/adminDashboard");

    }
    catch(error){
        console.error("Error in logging in: ", error);
        // toast.error("Login Failed! Check your credentials.")
        alert("Login Failed! Check your credentials.")
    }
}
