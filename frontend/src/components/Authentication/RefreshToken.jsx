import { jwtDecode } from "jwt-decode";
const API_URL = import.meta.env.VITE_API_URL;

export async function getAccessToken() {
    let token = sessionStorage.getItem("accessToken");
    const userRole = sessionStorage.getItem("role");

    if (!token) {
        console.log("token nhi hai");
        return await refreshAccessToken(userRole);
    }

    try {
        console.log("Token hai");
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
            console.log("Token hai but expired");
            return await refreshAccessToken(userRole);
        }

        return { token, role: decoded.role, error: null };
    } catch (err) {
        console.error("Invalid token format", err);
        return await refreshAccessToken(userRole);
    }
}

async function refreshAccessToken(userRole) {
    try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (res.ok) {
            const data = await res.json();
            sessionStorage.setItem("accessToken", data.accessToken);
            sessionStorage.setItem("role", data.role);

            return { token: data.accessToken, role: data.role, error: null };
        } else {
            console.log("refresh nhi hua");
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("role");
            return { token: null, role: null, error: userRole ? "sessionExpired" : "notLoggedIn" };
        }
    } catch (err) {
        console.log("token refresh mai error aaya")
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("role");
        console.error("Failed to refresh token", err);
        return { token: null, role: null, error: userRole ? "sessionExpired" : "notLoggedIn" };
    }
}


