import "./Navbar.css";
import { NavSearch } from "./NavSearch";
import { useTheme, useAuth, useNavAside } from "../../Context";
import { useState, useRef, useEffect } from "react";
import { Filter } from "../Filter/Filter";
import { useLocation, useNavigate } from "react-router-dom";
export function Navbar() {
    const [profileToggle, setProfileToggle] = useState(false);
    const [filterToggle, setFilterToggle] = useState(false);
    const { themeToggle, toggleThemeFunction } = useTheme();
    const filterSectionRef = useRef(null);
    const currentLocation = useLocation().pathname;
    const { asideToggleSetterFunction } = useNavAside();

    const navigate = useNavigate();
    const {
        logoutHandler,
        authState: { userName, token },
    } = useAuth();
    function logoutFunction() {
        logoutHandler();
        setProfileToggle(false);
    }
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (filterSectionRef && filterSectionRef.current && !filterSectionRef.current.contains(e.target)) {
                setFilterToggle(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [filterSectionRef]);
    return (
        <div className="navbar-wrapper">
            <div className="navbar flex-row-spc-btw">
                <div className="flex-row-spc-btw">
                    {token ? (
                        <button
                            className="mr-8 pointer nav-toggle-btn pointer "
                            onClick={() => asideToggleSetterFunction(true)}
                        >
                            <span className="material-icons-outlined">menu</span>
                        </button>
                    ) : null}
                    <div className="logo flex-row-center-center" role="button" onClick={() => navigate("/home")}>
                        Cloud Note
                    </div>
                </div>
                {token ? (
                    <div className="flex-row-spc-btw header-search-web">
                        <NavSearch />
                    </div>
                ) : null}
                <div className="flex-row-center-center">
                    <div className="nav-filter-wrapper " ref={filterSectionRef}>
                        {token ? (
                            <button
                                className="flex-clmn-center-center nav-filter-btn pointer"
                                onClick={() =>
                                    currentLocation === "/home"
                                        ? setFilterToggle((prev) => !prev)
                                        : (navigate("/home"), setFilterToggle((prev) => !prev))
                                }
                            >
                                <span className="material-icons-outlined primary-accent">filter_alt</span>
                            </button>
                        ) : null}
                        {filterToggle ? <Filter /> : null}
                    </div>
                    <button
                        className={`theme-toggle-btn pointer ${themeToggle ? "rotate" : ""}`}
                        onClick={toggleThemeFunction}
                    >
                        <span className="material-icons-outlined primary-accent">
                            {themeToggle ? "light_mode" : "dark_mode"}
                        </span>
                    </button>
                    {token ? (
                        <div className="user-profile-wrapper">
                            <div
                                className="avatar pointer avatar-text avatar-round avatar-small"
                                onClick={() => setProfileToggle((prev) => !prev)}
                            >
                                {userName.substring(0, 1).toUpperCase()}
                            </div>
                            {profileToggle ? (
                                <ul className="user-dropdown arrow-top">
                                    <li>
                                        <button className="dropdown-btn pointer" onClick={logoutFunction}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
            {token ? (
                <div className="header-search-mobile">
                    <NavSearch />
                </div>
            ) : null}
        </div>
    );
}
