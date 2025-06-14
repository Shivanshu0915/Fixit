import React, { useState } from 'react';
import { getAccessToken } from '../Authentication/RefreshToken';

export default function ChangePasswordModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    try {
      const result = await getAccessToken();
      if (!result.token) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
        return;
      }
      const res = await fetch("http://localhost:3000/auth/change-profile-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${result.token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (error) {
      alert("An error occurred");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-auto">
      <div className="bg-[#020817] rounded-lg w-full max-w-md p-6 relative border-1 border-gray-800">
        {/* Close Icon */}
        <button className="absolute top-3 right-3 text-white text-xl cursor-pointer rounded-full hover:border-1 hover:border-white p-1"
        onClick={()=>{
          onClose();
          setCurrentPassword('');
          setNewPassword('');
          setConfirmNewPassword('');
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="white"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </button>

        <h2 className="text-white text-xl font-semibold mb-4">Change Password</h2>

        <label className="text-white block mb-2">Current Password</label>
        <input
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password"
          className="w-full p-3 mb-4 rounded-2xl border-1 border-gray-700 bg-[#0A0F25] text-white focus:outline-none focus:ring-2 focus:white"
          placeholder="Enter current password"
        />

        <label className="text-white block mb-2">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-2xl border-1 border-gray-700 bg-[#0A0F25] text-white focus:outline-none focus:ring-2 focus:white"
          placeholder="Enter new password"
        />

        <label className="text-white block mb-2">Confirm New Password</label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-2xl border-1 border-gray-700 bg-[#0A0F25] text-white focus:outline-none focus:ring-2 focus:white"
          placeholder="Confirm new password"
        />

        <button className="w-full bg-gradient-to-r from-[#5046E5] to-[#7d23CE] text-black hover:opacity-90 py-3 rounded-2xl font-semibold cursor-pointer"
        onClick={handleUpdatePassword}>
          Update Password
        </button>
      </div>
    </div>
  );
}
