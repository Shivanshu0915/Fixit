import { getAccessToken } from '../../components/Authentication/RefreshToken';
import React, { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

export function AdminMessMenu() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) { // 10MB limit
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            alert('File size exceeds 10MB limit.');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.size <= 10 * 1024 * 1024) {
            setFile(droppedFile);
            setPreview(URL.createObjectURL(droppedFile));
        } else {
            alert('File size exceeds 10MB limit.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleUpload = async () => {
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
            if (!file) {
                alert("Please select an image.")
                return;
            }
            const formData = new FormData();
            formData.append('menuImage', file);
            formData.append('college', data.college);
            formData.append('hostel', data.hostel);
            
            setLoading(true);

            const response = await fetch(`${API_URL}/admin/mess/upload-menu?college=${data.college}&hostel=${data.hostel}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${result.token}`,
                },
                body: formData,
            });
            const text = await response.text();
            const val = JSON.parse(text); // parse manually instead of res.json()

            if (response.ok) {
                setFile(null);
                setPreview(null);
                setLoading(true);
                alert("Mess Menu uploaded successfully!")
            } else {
                console.log("mess menu error front aaya");
                throw new Error(val.error || 'Upload failed');
            }
        } catch (err) {
            console.error(err.message);
            alert(err.message || "An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-stubgdark w-full h-full p-6 flex flex-col gap-y-10 items-center overflow-auto scrollbar-thin scrollbar-webkit">
            <div className="bg-stubgdark text-dashtext flex justify-center text-xl md:text-3xl font-bold">
                Mess Menu Management
            </div>

            <div className="w-full max-w-3xl bg-stubgcard border-1 shadow shadow-compcardshadow border-dashborder rounded-lg p-6">
                <h2 className="text-xl text-dashtext font-semibold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-filebtn" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 3a2 2 0 012-2h2a2 2 0 012 2v2H3V3zm4 0v2h2V3H7zM3 7h14v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm5 3v2h4v-2H8z" />
                    </svg>
                    Upload Mess Menu
                </h2>
                {/* Drop file option */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-dashborder rounded-lg p-6 cursor-pointer hover:border-filebtn"
                    onClick={() => document.getElementById('fileInput').click()}
                    onDrop={handleDrop} onDragOver={handleDragOver}>
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-fit object-contain" />
                    ) : (
                        <>
                            <svg className="w-12 h-12 text-admenuicon m-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                            </svg>
                            <p className="text-admenutextprimary font-medium">Drop your menu image here</p>
                            <p className="text-sm text-admenutextsecondary">or click to browse files</p>
                            <p className="text-xs text-admenutextsecondary mt-1 mb-3">PNG, JPG, GIF up to 10MB</p>
                        </>
                    )}
                </div>
                <input id="fileInput" type="file" accept="image/png, image/jpeg, image/gif"
                onChange={handleFileChange} className="hidden"/>
                <button className={`w-full mt-4 py-2 font-semibold text-lg rounded-lg ${file ? 'bg-filebtn hover:bg-filebtn/90 text-white cursor-pointer': 'bg-admenubtnbg text-admenubtntext cursor-not-allowed'}`}
                onClick={handleUpload} disabled={!file}>
                    {loading ? 'Uploading...' : 'Upload Mess Menu'}
                </button>
            </div>
        </div>
    );
}
