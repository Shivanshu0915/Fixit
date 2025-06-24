import React, { useEffect, useRef, useState } from 'react';
import { getAccessToken } from '../../components/Authentication/RefreshToken';
import { CustomDropdown, InputField } from '../../components/Admin Components/AddAdminFields';
const API_URL = import.meta.env.VITE_API_URL;

const AddAdminForm = () => {
  const departments = ['Mess', 'Hostel', 'Custom'];
  const positions = ['Mess Manager', 'Store Keeper', 'Caretaker', 'Technician', 'Custom'];

  const initialFormData = {
    fullName: '',
    email: '',
    department: '',
    customDepartment: '',
    position: '',
    customPosition: '',
    mobile: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await getAccessToken();
    if (!result.token) {
      alert("Session expired! Login again to continue");
      window.location.href = "/login";
      return;
    }
    try {
      const res = await fetch(`${API_URL}/auth/get-info/`, {
        headers: { Authorization: `Bearer ${result.token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch admin info');
      }

      const finalData = {
        ...formData,
        department: formData.department === 'Custom' ? formData.customDepartment : formData.department,
        position: formData.position === 'Custom' ? formData.customPosition : formData.position,
        college: data.college,
        hostel: data.hostel
      };

      const response = await fetch(`${API_URL}/admin/add-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${result.token}`,
        },
        body: JSON.stringify(finalData),
      });

      const text = await response.text();
      const val = JSON.parse(text);

      if (response.ok) {
        alert("Admin added successfully!")
      } else {
        throw new Error(val.error || 'Upload failed');
      }

    } catch (err) {
      alert(err.message || "An unexpected error occurred. Please try again.");
    }

  };

  return (
    <div className="bg-stubgdark w-full h-full p-6 flex flex-col gap-y-5 items-center overflow-auto scrollbar-thin scrollbar-webkit">
      <div>
        <h1 className="text-dashtext text-2xl md:text-3xl font-bold text-center">
          Admin Management
        </h1>
        <p className="text-ratedashsecondary text-md md:text-lg text-center">
          Add new administrator to the system
        </p>
      </div>

      <form className="bg-stubgcard p-6 rounded-lg shadow-md w-full max-w-3xl space-y-6 border border-dashborder"
        onSubmit={handleSubmit}>
        {/* Personal Info */}
        <div>
          <h2 className="text-lg font-semibold text-dashtext flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className='fill-dashtext'><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" /></svg>
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InputField label="Full Name *" name="fullName" value={formData.fullName} handleChange={handleChange} placeholder="Enter full name" required />
            <InputField label="Email Address *" name="email" value={formData.email} handleChange={handleChange} placeholder="Enter email address" required type="email" />
          </div>
        </div>

        {/* Professional Info */}
        <div>
          <h2 className="text-lg font-semibold text-dashtext flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className='fill-dashtext'><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm240-600h160v-80H400v80Zm400 360H600v80H360v-80H160v160h640v-160Zm-360 0h80v-80h-80v80Zm-280-80h200v-80h240v80h200v-200H160v200Zm320 40Z" /></svg>
            Professional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col gap-y-1">
              <CustomDropdown label="Department *" options={departments} selected={formData.department}
                onChange={(value) => setFormData({ ...formData, department: value })} />
              {formData.department === 'Custom' && (
                <InputField name="customDepartment" value={formData.customDepartment} handleChange={handleChange} placeholder="Enter custom department" required />
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <CustomDropdown label="Position *" options={positions} selected={formData.position}
                onChange={(value) => setFormData({ ...formData, position: value })} />
              {formData.position === 'Custom' && (
                <InputField name="customPosition" value={formData.customPosition} handleChange={handleChange} placeholder="Enter custom position" required />
              )}
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div>
          <h2 className="text-lg font-semibold text-dashtext flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className='fill-dashtext'><path d="M640-560q-17 0-28.5-11.5T600-600v-120q0-17 11.5-28.5T640-760v-40q0-33 23.5-56.5T720-880q33 0 56.5 23.5T800-800v40q17 0 28.5 11.5T840-720v120q0 17-11.5 28.5T800-560H640Zm40-200h80v-40q0-17-11.5-28.5T720-840q-17 0-28.5 11.5T680-800v40Zm118 640q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
            Security Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InputField label="Mobile Number *" name="mobile" value={formData.mobile} handleChange={handleChange} placeholder="Enter mobile number" required />
            <InputField label="Password *" name="password" value={formData.password} handleChange={handleChange} placeholder="Enter password" required type="password" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" className="px-4 py-2 border border-filebtn text-dashtext rounded-md hover:bg-filebtn/90 hover:text-white cursor-pointer"
            onClick={handleCancel}>
            Clear
          </button>
          <button type="submit" className="px-4 py-2 bg-filebtn text-white rounded-md hover:bg-filebtn/90 cursor-pointer">
            Add Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminForm;