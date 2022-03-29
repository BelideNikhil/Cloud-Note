import "./Navbar.css";
import { NavSearch } from "./NavSearch";
import { useTheme, useAuth } from "../../Context";
import { useState } from "react";
export function Navbar() {
    const [profileToggle, setProfileToggle] = useState(false);
    const { themeToggle, toggleThemeFunction } = useTheme();
    const {
        logoutHandler,
        authState: { userName, token },
    } = useAuth();
    function logoutFunction() {
        logoutHandler();
        setProfileToggle(false);
    }
    return (
        <div className="navbar-wrapper">
            <div className="navbar flex-row-spc-btw">
                <div className="logo flex-row-center-center ">Cloud Note</div>
                <NavSearch />
                <div className="flex-row-center-center">
                    <button className={`theme-toggle-btn ${themeToggle ? "rotate" : ""}`} onClick={toggleThemeFunction}>
                        <span className="material-icons-outlined primary-accent">
                            {themeToggle ? "light_mode" : "dark_mode"}
                        </span>
                    </button>
                    {token ? (
                        <div className="user-profile-wrapper">
                            <div
                                className="avatar avatar-text avatar-round avatar-small"
                                onClick={() => setProfileToggle((prev) => !prev)}
                            >
                                {userName.substring(0, 1).toUpperCase()}
                            </div>
                            {profileToggle ? (
                                <ul className="user-dropdown arrow-top">
                                    <li>
                                        <button className="dropdown-btn" onClick={logoutFunction}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
