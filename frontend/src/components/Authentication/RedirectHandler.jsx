import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "./RefreshToken";

const RedirectHandler = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkToken() {
            const result = await getAccessToken(); // Calls backend to check refresh token
    
            if (result.token) {
                const role = result.role;
                if (role === "user") {
                    navigate("/studentDashboard", { replace: true }); // Use replace: true
                } else if (role === "admin") {
                    navigate("/adminDashboard", { replace: true }); // Use replace: true
                }
            } else {
                setLoading(false);
            }
        }
    
        checkToken();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return null; // If no valid token, render Home page normally
};

export default RedirectHandler;
