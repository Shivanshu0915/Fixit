// ChangePasswordModal.jsx
import React, { useState } from 'react';

export default function ChangePasswordModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

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

        <button className="w-full bg-gradient-to-r from-[#5046E5] to-[#7d23CE] text-black hover:opacity-90 py-3 rounded-2xl font-semibold cursor-pointer">
          Update Password
        </button>
      </div>
    </div>
  );
}
