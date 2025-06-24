import React, { useState } from 'react';
import { getAccessToken } from '../Authentication/RefreshToken';
const API_URL = import.meta.env.VITE_API_URL;

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
      const res = await fetch(`${API_URL}/auth/change-profile-password`, {
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
      <div className="bg-chngpassbg rounded-lg w-full max-w-md p-6 relative border-1 border-profileborder">
        {/* Close Icon */}
        <button className="absolute top-3 right-3 text-chngpasstext text-xl cursor-pointer rounded-full hover:border-1 hover:border-chngpasstext p-1"
        onClick={()=>{
          onClose();
          setCurrentPassword('');
          setNewPassword('');
          setConfirmNewPassword('');
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" className='fill-chngpasstext'><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </button>

        <h2 className="text-chngpasstext text-xl font-semibold mb-4">Change Password</h2>

        <label className="text-chngpasstext block mb-2">Current Password</label>
        <input
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password"
          className="w-full p-3 mb-4 rounded-2xl border-1 border-profileborder bg-changpassbgsec text-chngpasstextsec focus:outline-none focus:ring-2 focus:ring-dashtext"
          placeholder="Enter current password"
        />

        <label className="text-chngpasstext block mb-2">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-2xl border-1 border-profileborder bg-changpassbgsec text-chngpasstextsec focus:outline-none focus:ring-2 focus:ring-dashtext"
          placeholder="Enter new password"
        />

        <label className="text-chngpasstext block mb-2">Confirm New Password</label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-2xl border-1 border-profileborder bg-changpassbgsec text-chngpasstextsec focus:outline-none focus:ring-2 focus:ring-dashtext"
          placeholder="Confirm new password"
        />

        <button className="w-full bg-gradient-to-r from-chngpassbtnbg1 to-chngpassbtnbg2 text-chngpassbtntext hover:opacity-90 py-3 rounded-2xl font-semibold cursor-pointer"
        onClick={handleUpdatePassword}>
          Update Password
        </button>
      </div>
    </div>
  );
}
