import { Navigate, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Homepage, Login, Signup, Archives, Trash, Labels, NotFound } from "../Pages";
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
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/archives" element={<Archives />} />
                    <Route path="/trash" element={<Trash />} />
                    <Route path="/labels/:label" element={<Labels />} />
                </Route>
                {!token ? (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Navigate to="/home" />} />
                        <Route path="/signup" element={<Navigate to="/home" />} />
                    </>
                )}
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
