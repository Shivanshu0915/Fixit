import ThemeSwitcher from "../../ThemeSwitcher";

export default function ProfileSettings({setShowModal, logoutHandler}) {
    return (
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 md:gap-4">
            {/* Security */}
            <div className="bg-profileboxbg rounded-lg shadow-md border-1 border-profileborder">
                <h3 className="text-lg text-dashtext flex items-center font-semibold gap-x-2 border-b-2 border-profileborder py-5 px-6">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-dashtext"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                    Security & Privacy
                </h3>
                <div className="px-6 py-8">
                    <button className="w-full bg-black flex justify-start gap-x-3 items-center text-white py-3 px-4 rounded-lg mb-6 hover:bg-gray-700 cursor-pointer border-2 border-gray-700"
                        onClick={() => setShowModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                        Change Password
                    </button>
                    <button className="w-full bg-rose-600 flex justify-start gap-x-3 items-center text-white py-3 px-4 rounded-lg hover:bg-rose-700 cursor-pointer"
                        onClick={logoutHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                        Sign Out
                    </button>
                </div>

            </div>

            {/* Preferences */}
            <div className="bg-profileboxbg rounded-lg shadow-md border-1 border-profileborder overflow-auto scrollbar-thin scrollbar-webkit">
                <h3 className="text-lg text-dashtext flex items-center font-semibold gap-x-2 border-b-2 border-profileborder py-5 px-6">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-dashtext"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" /></svg>
                    Preferences
                </h3>
                <div className="py-8 px-6 relative">
                    <ThemeSwitcher/>
                </div>

            </div>
        </div>
    )
}