import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context";

const guestUser = { email: "nikhil@gmail.com", password: "Password@123" };
const initialUser = { email: "", password: "" };

export function Login() {
    const [userData, setUserData] = useState(initialUser);
    const { userLoginHandler, authState } = useAuth();
    const [togglePassword, setTogglePassword] = useState(false);
    function loginFormHandler(e) {
        e.preventDefault();
        if (userData.email && userData.password) {
            userLoginHandler(userData);
        }
    }
    return (
        <div className="user-form-wrapper">
            <h2 style={{ textAlign: "center" }}>LOGIN</h2>
            <form className="user-form pa-24" onSubmit={loginFormHandler}>
                <div className="form-control">
                    <label className="form-label" htmlFor="input">
                        Email Address
                    </label>
                    <input
                        className="form-input pa-8"
                        type="email"
                        required
                        name="input"
                        placeholder="enter Email"
                        value={userData.email}
                        onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                </div>
                <div className="form-control">
                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                    <div className="input-toggle-wrapper">
                        <input
                            className="form-input pa-8"
                            type={togglePassword ? "text" : "password"}
                            name="input"
                            required
                            placeholder="enter Password"
                            value={userData.password}
                            onChange={(e) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
                        />
                        <button
                            className="btn-icon btn-icon-sm input-toggle-btn"
                            type="button"
                            onClick={() => setTogglePassword((prev) => !prev)}
                        >
                            <i className={togglePassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                        </button>
                    </div>
                </div>
                <div className="form-actions mt-24">
                    <button className="btn btn-solid-primary" type="submit">
                        Login
                    </button>
                    <button className="btn btn-outline-primary" type="submit" onClick={() => setUserData(guestUser)}>
                        Login as Guest
                    </button>
                    {authState.loginError ? (
                        <div className="form-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {authState.loginError}
                        </div>
                    ) : null}
                    <div>
                        <Link to="/signup">
                            <button className="primary-accent" style={{ fontWeight: "600", cursor: "pointer" }}>
                                <span>Create an account Instead? </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
