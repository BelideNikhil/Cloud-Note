import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Homepage, Login, Signup } from "../Pages";
import { useAuth } from "../Context";
export default function PageRoutes() {
    const {
        authState: { token },
    } = useAuth();
    return (
        <div className="route-wrapper">
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<Homepage />} />
                </Route>
                {!token && (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </>
                )}
                <Route path="/*" element={<Navigate replace to="/home" />} />
            </Routes>
        </div>
    );
}
