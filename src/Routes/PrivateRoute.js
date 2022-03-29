import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
export default function PrivateRoute() {
    const {
        authState: { token },
    } = useAuth();
    return token ? <Outlet /> : <Navigate to="/login " />;
}
