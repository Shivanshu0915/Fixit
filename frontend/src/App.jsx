import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home.jsx";
import LoginPage from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import OTPPage from "./routes/OTP.jsx";

const App = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<><Home/></>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otpPage" element={<OTPPage />} />
        </>
    )
);

export default App;
