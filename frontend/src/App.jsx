import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home.jsx";
import LoginPage from "./routes/Login.jsx";

const App = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<><Home/></>} />
            <Route path="/login" element={<LoginPage />} />
        </>
    )
);

export default App;
