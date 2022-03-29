import "./Sidebar.css";
import { NavLink } from "react-router-dom";
export function Sidebar() {
    return (
        <div className="sidebar-wrapper">
            <div className="sidebar flex-clmn-start-start">
                <NavLink
                    to="/home"
                    className={`sidebar-btn ${({ isActive }) =>
                        isActive ? "active" : ""} flex-row-start-center px-16 py-12 mb-6`}
                >
                    <span className="material-icons-outlined mx-16">description</span>Notes
                </NavLink>
                <NavLink
                    to="/labels"
                    className={`sidebar-btn ${({ isActive }) =>
                        isActive ? "active" : ""} flex-row-start-center px-16 py-12 mb-6`}
                >
                    <span className="material-icons-outlined mx-16">label</span>Labels
                </NavLink>
                <NavLink to="/archive" className="sidebar-btn flex-row-start-center px-16 py-12 mb-6">
                    <span className="material-icons-outlined mx-16">archive</span>Archive
                </NavLink>
                <NavLink to="/trash" className="sidebar-btn flex-row-start-center px-16 py-12 mb-6">
                    <span className="material-icons-outlined mx-16">delete_outline</span>Trash
                </NavLink>
            </div>
        </div>
    );
}
