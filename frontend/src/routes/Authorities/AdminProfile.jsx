import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../components/Authentication/RefreshToken";
import axios from "axios";
import { useNavigate } from "react-router";
import ChangePasswordModal from "../../components/StudentComponents/ChangePasswordModal";
import AdminProfileHeader from "../../components/Admin Components/ProfileComponents/ProfileHeader";
import AdminProfileInfo from "../../components/Admin Components/ProfileComponents/AdminProfileInfo";
import AdminProfileSettings from "../../components/Admin Components/ProfileComponents/AdminProfileSettings";
import ProfileHandlerFns from "../../components/Admin Components/ProfileComponents/AdminProfileHandler";
const API_URL = import.meta.env.VITE_API_URL;

export default function UserProfileDashboard() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    department: "",
    position: "",
    college: "",
    hostel: "",
    phone: "",
    email: "",
  });

  const [showModal, setShowModal] = useState(false);

  // Fetch user info on load
  useEffect(() => {
    const fetchUserInfo = async () => {
      const result = await getAccessToken();
      if (!result.token) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
        return;
      }

      try {
        const res = await fetch(`${API_URL}/admin/profile`, {
          headers: {
            Authorization: `Bearer ${result.token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();

        setUserData({
          name: data.name,
          department: data.category,
          college: data.college,
          hostel: data.hostel,
          phone: data.phone,
          email: data.email,
          position: data.position,
        });

        setProfileImage(data.profileImage || null);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUserInfo();
  }, []);


  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const { handleSave, handleImageChange, logoutHandler} = ProfileHandlerFns({ userData, setProfileImage, setIsEditing });

  return (
    <div className="min-h-screen bg-gradient-to-b from-stubgdark to-stubgcard p-6 flex flex-col items-center text-white">
      {/* Back Button */}
      <div className="w-full max-w-4xl mb-3">
        <button onClick={() => window.history.back()} className="flex justify-start bg-profilebackbtn px-4 py-2 rounded text-white hover:bg-profilebackbtn/90 cursor-pointer">
          Back
        </button>
      </div>
     
      <AdminProfileHeader {...{profileImage, handleImageChange, userData, isEditing, handleEdit, handleSave, handleCancel}}/>
      <AdminProfileInfo {...{userData, isEditing, handleChange}} />
      <AdminProfileSettings {...{setShowModal, logoutHandler}} />

      <ChangePasswordModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}