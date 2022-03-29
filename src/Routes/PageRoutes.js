import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Mockman from "mockman-js";

export default function PageRoutes() {
    return (
        <div className="main">
            <Routes>
                <Route element={<PrivateRoute />}></Route>
                {/* {!isAuth && (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )} */}
                <Route path="/*" element={<Navigate replace to="/" />} />
                <Route path="/mock" element={<Mockman />} />
            </Routes>
        </div>
    );
}
