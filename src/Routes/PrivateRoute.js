import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
export default function PrivateRoute() {
    const {
        authState: { isAuth },
    } = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login " />;
}
