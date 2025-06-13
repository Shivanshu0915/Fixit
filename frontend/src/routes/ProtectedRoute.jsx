import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAccessToken } from "../components/Authentication/RefreshToken";

function ProtectedRoute({ children, allowedRole }) {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // To store the error flag

    useEffect(() => {
        async function verifyToken() {
            const result = await getAccessToken();
            if (!result.token) {
                setIsAuthenticated(false);
                setError(result.error);
            } else {
                setIsAuthenticated(true);
                setRole(sessionStorage.getItem("role"));
            }
            setLoading(false);
        }
        verifyToken();
    }, [location.pathname]);

    if (loading){
        // return(
        //     <div className="bg-stubgdark text-white w-[100vw] h-[100vh]">
        //         Loading...
        //     </div>
        // )
        return null;
    };

    if (isAuthenticated === false) {
        if (error === "sessionExpired") {
            alert("Session expired. Login in again to continue");
        } else {
            alert("Login to continue");
        }
        return <Navigate to="/login" />;
    }

    if (role !== allowedRole) {
        alert("Access Denied!");
        return <Navigate to="/unauthorized" />;
    }
    return children;
}
export default ProtectedRoute;