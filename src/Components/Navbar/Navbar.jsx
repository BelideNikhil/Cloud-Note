import "./Navbar.css";
import { NavSearch } from "./NavSearch";
import { useTheme } from "../../Context/ThemeContext";
export default function Navbar() {
    const { themeToggle, toggleThemeFunction } = useTheme();
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
                    <button className="btn btn-outline-primary">Login</button>
                    <div className="avatar  avatar-text avatar-round avatar-small">JJ</div>
                </div>
            </div>
        </div>
    );
}
