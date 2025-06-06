import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home.jsx";

const App = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<><Home/></>} />
        </>
    )
);

export default App;
