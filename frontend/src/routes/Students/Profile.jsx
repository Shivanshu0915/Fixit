import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../components/Authentication/RefreshToken";
import ChangePasswordModal from "../../components/StudentComponents/ChangePasswordModal";
import ProfileHeader from "../../components/StudentComponents/ProfileComponents/ProfileHeader";
import ProfileInfo from "../../components/StudentComponents/ProfileComponents/ProfileInfo";
import ProfileSettings from "../../components/StudentComponents/ProfileComponents/ProfileSettings";
import ProfileHandlerFns from "../../components/StudentComponents/ProfileComponents/ProfileHandler";
const API_URL = import.meta.env.VITE_API_URL;

export default function UserProfileDashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    regNo: "",
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
        const res = await fetch(`${API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${result.token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();

        setUserData({
          name: data.name,
          regNo: data.regNo,
          college: data.college,
          hostel: data.hostel,
          phone: data.phone,
          email: data.email,
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
    <div className="min-h-screen bg-gradient-to-b from-stubgdark to-stubgcard p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-3">
        <button onClick={() => window.history.back()} className="flex justify-start bg-profilebackbtn px-4 py-2 rounded text-white hover:bg-profilebackbtn/90 cursor-pointer">
          Back
        </button>
      </div>

      <ProfileHeader {...{ profileImage, handleImageChange, userData, isEditing, handleEdit, handleSave, handleCancel }} />
      <ProfileInfo {...{userData, isEditing, handleChange}}/>
      <ProfileSettings {...{setShowModal, logoutHandler}} />

      <ChangePasswordModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}