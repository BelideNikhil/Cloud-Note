import { createContext, useContext, useReducer } from "react";
import { getLoginDetails, getSignupDetails } from "../Services/";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authActionTypes } from "./actionTypes";
const AuthContext = createContext();

const { SET_LOGIN_ERROR, SET_SIGNUP_ERROR, SET_AUTH, SET_AUTH_LOGOUT } = authActionTypes;
const local_data = JSON.parse(localStorage.getItem("cloud_note_jwt"));
const initialAuthState = {
    userName: (local_data && local_data.userName) || "",
    token: (local_data && local_data.token) || "",
    loginError: "",
    signupError: "",
};
function authReducerFunction(authState, { type, payload }) {
    switch (type) {
        case SET_AUTH:
            return { userName: payload.userName, token: payload.token, loginError: "", signupError: "" };
        case SET_LOGIN_ERROR:
            return { userName: "", token: "", loginError: payload.error, signupError: "" };
        case SET_SIGNUP_ERROR:
            return { userName: "", token: "", loginError: "", signupError: payload.error };
        case SET_AUTH_LOGOUT:
            return { userName: "", token: "", loginError: "", signupError: "" };
        default:
            return authState;
    }
}
export function AuthProvider({ children }) {
    const [authState, authDispatchFuntion] = useReducer(authReducerFunction, initialAuthState);
    const navigate = useNavigate();
    const userLoginHandler = async (userData) => {
        const toastId = toast.loading("Logging In...");
        try {
            const { status, data } = await getLoginDetails(userData);
            if (status === 200) {
                toast.success(`Welcome back, ${data.foundUser.firstName} `, { id: toastId });
                authDispatchFuntion({
                    type: "SET_AUTH",
                    payload: { userName: data.foundUser.firstName, token: data.encodedToken },
                });
                localStorage.setItem(
                    "cloud_note_jwt",
                    JSON.stringify({ userName: data.foundUser.firstName, token: data.encodedToken })
                );
                navigate("/home");
            }
        } catch (err) {
            toast.error("Login Error", { id: toastId });
            authDispatchFuntion({ type: "SET_LOGIN_ERROR", payload: { error: err.response.data.errors[0] } });
        }
    };
    const signupHandler = async (newUserData) => {
        const toastId = toast.loading("Signing Up...");
        try {
            const { status, data } = await getSignupDetails(newUserData);
            if (status === 201) {
                toast.success(`Hello, ${data.createdUser.firstName} `, { id: toastId });
                authDispatchFuntion({
                    type: "SET_AUTH",
                    payload: { userName: data.createdUser.firstName, token: data.encodedToken },
                });
                localStorage.setItem(
                    "cloud_note_jwt",
                    JSON.stringify({ userName: data.createdUser.firstName, token: data.encodedToken })
                );
                navigate("/home");
            }
        } catch (err) {
            toast.error("Sign Up Error", { id: toastId });
            authDispatchFuntion({ type: "SET_SIGNUP_ERROR", payload: { error: err.response.data.errors[0] } });
        }
    };
    const logoutHandler = () => {
        toast.success(`Logged out`);
        authDispatchFuntion({ type: "SET_AUTH_LOGOUT" });
        localStorage.removeItem("cloud_note_jwt");
        navigate("/home");
    };
    return (
        <AuthContext.Provider
            value={{ authState, authDispatchFuntion, userLoginHandler, navigate, signupHandler, logoutHandler }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
}
