import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home.jsx";
import LoginPage from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import OTPPage from "./routes/OTP.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { StudentMain } from "./routes/Students/StudentMain.jsx";
import { StuMidFirst } from "./components/StudentComponents/StuMidMain.jsx";
import { FileComplaint } from "./routes/Students/FileComplaint.jsx";
import UserProfileDashboard from "./routes/Students/Profile.jsx";
import RedirectHandler from "./components/Authentication/RedirectHandler.jsx";

import { AdminMain } from "./routes/Authorities/AdminMain.jsx";
import { AdminMidMain } from "./components/Admin Components/AdminMidMain.jsx";
import AdminProfileDashboard from "./routes/Authorities/AdminProfile.jsx";
import { AdminMessMenu } from "./routes/Authorities/AdminMessMenu.jsx";
import { MessMenu } from "./routes/Students/MessMenu.jsx";
import MealRatingHub from "./routes/Students/MealRating.jsx";
import MealRatingsDashboard from "./routes/Authorities/MealRatingsDashboard.jsx";
import TrackComplaint from "./routes/Students/TrackComplaint.jsx";
import AddAdminForm from "./routes/Authorities/AddAdmin.jsx";


// 🔥 BroadcastChannel logic to listen for logout across tabs:
const logoutChannel = new BroadcastChannel('logout_channel');
logoutChannel.onmessage = (event) => {
    if (event.data === 'logout') {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('role');
        window.location.href = '/'; // redirect user to login if logout is broadcasted
    }
};

const App = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<><RedirectHandler /><Home /></>} />
            <Route path="/login" element={<><RedirectHandler /><LoginPage /></>} />
            <Route path="/signup" element={<><RedirectHandler /><Signup /></>} />
            <Route path="/otpPage" element={<><RedirectHandler /><OTPPage /></>} />

            {/* Group all student routes under a parent route */}
            <Route path="/studentDashboard" element={<ProtectedRoute allowedRole="user"><StudentMain /></ProtectedRoute>}>
                <Route index element={<ProtectedRoute allowedRole="user"> <StuMidFirst /></ProtectedRoute>} />
                <Route path="hostel" element={<ProtectedRoute allowedRole="user"> <StuMidFirst /></ProtectedRoute>} />
                <Route path="file-complaint" element={<ProtectedRoute allowedRole="user"><FileComplaint /></ProtectedRoute>} />
                <Route path="mess-menu" element={<ProtectedRoute allowedRole="user"><MessMenu /></ProtectedRoute>} />
                <Route path="rate-meal" element={<ProtectedRoute allowedRole="user"><MealRatingHub /></ProtectedRoute>} />
                <Route path="track-complaint" element={<ProtectedRoute allowedRole="user"><TrackComplaint /></ProtectedRoute>} />
            </Route>
            <Route path="/studentDashboard/profile" element={<ProtectedRoute allowedRole="user"><UserProfileDashboard /></ProtectedRoute>} />

            {/* Group all admin routes under a parent route */}
            <Route path="/adminDashboard" element={<ProtectedRoute allowedRole="admin"><AdminMain /></ProtectedRoute>}>
                <Route index element={<ProtectedRoute allowedRole="admin"> <AdminMidMain /></ProtectedRoute>} />
                <Route path="hostel" element={<ProtectedRoute allowedRole="admin"> <AdminMidMain /></ProtectedRoute>} />
                <Route path="mess-menu" element={<ProtectedRoute allowedRole="admin"><AdminMessMenu /></ProtectedRoute>} />
                <Route path="meal-ratings-data" element={<ProtectedRoute allowedRole="admin"><MealRatingsDashboard /></ProtectedRoute>} />
                <Route path="add-admin" element={<ProtectedRoute allowedRole="admin"><AddAdminForm /></ProtectedRoute>} />
            </Route>
            <Route path="/adminDashboard/profile" element={<ProtectedRoute allowedRole="admin"><AdminProfileDashboard /></ProtectedRoute>} />
        </>
    )
);

export default App;
