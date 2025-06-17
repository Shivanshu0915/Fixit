import axios from "axios";
import { useNavigate } from "react-router";
import { getAccessToken } from "../../Authentication/RefreshToken";

const ProfileHandlerFns = ({ userData, setProfileImage, setIsEditing }) => {
    const navigate = useNavigate();

    const handleSave = async () => {
        const result = await getAccessToken();
        if (!result.token) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/admin/profile/update-data", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${result.token}`,
                },
                body: JSON.stringify({
                    name: userData.name,
                    college: userData.college,
                    hostel: userData.hostel,
                    phone: userData.phone,
                    email: userData.email,
                    category: userData.department,
                    position: userData.position,
                }),
            });

            if (!res.ok) throw new Error("Update failed");

            const data = await res.json();
            alert("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to update profile.");
        }
    };


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const result = await getAccessToken();
        if (!result.token) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("http://localhost:3000/admin/profile/upload-image", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${result.token}`,
                },
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            setProfileImage(data.imageUrl); // show uploaded image
        } catch (err) {
            console.error("Error uploading image:", err);
            alert("Image upload failed.");
        }
    };

    const logoutHandler = async () => {
        try {
            await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });

            // Remove accessToken from sessionStorage
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("role");

            // Redirect user
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return { handleSave, handleImageChange, logoutHandler };
};

export default ProfileHandlerFns;