
export default function ProfileHeader({ profileImage, handleImageChange, userData, isEditing, handleEdit, handleSave, handleCancel }){
    return(
        <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-profileheadbg1 to-profileheadbg2 p-6 relative mb-6">
            <div className="flex flex-col items-center space-y-4 md:flex-row md:items-center md:space-x-10">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-gray-500 bg-gray-200 overflow-hidden">
                        {profileImage ? (
                            <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-3xl">
                            👤
                            </div>
                        )}
                    </div>

                    <label htmlFor="imageUpload">
                        <div className="absolute bottom-[-2%] right-[-10%] bg-gradient-to-r from-profilecam1 to-profilecam2 p-3 rounded-full cursor-pointer shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="white">
                                <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"/>
                            </svg>
                        </div>
                    </label>
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}/>
                </div>

                <div>
                    <h1 className="text-2xl text-white font-bold">{userData.name}</h1>
                    <p className="text-sm text-gray-100">{userData.regNo}</p>
                    
                    {/* Buttons */}
                    <div className="mt-4 flex gap-3">
                        {!isEditing ? (
                            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-3 py-2 flex items-center gap-x-2 rounded-lg text-sm cursor-pointer "
                            onClick={handleEdit}> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                                Edit Profile
                            </button>
                        ) : (
                            <>
                            <button className="bg-gradient-to-r from-[#17b952] to-[#087d5a] hover:opacity-90 text-white font-semibold px-3 py-2 flex items-center gap-x-2 rounded-lg text-sm cursor-pointer"
                            onClick={handleSave}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="white">
                                    <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
                                </svg>
                                Save Changes
                            </button>
                            <button className="bg-[#0f172a] border border-gray-400 text-white hover:bg-gray-800 font-semibold px-3 py-2 flex items-center gap-x-2 rounded-lg text-sm cursor-pointer"
                            onClick={handleCancel}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="white"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                Cancel
                            </button>
                            </>
                        )}
                    </div>
                </div>
            </div>        
        </div>
    )
}