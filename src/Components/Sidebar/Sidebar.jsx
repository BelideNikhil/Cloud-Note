import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useTags } from "../../Context";
export function Sidebar() {
    const {
        tagsState: { globalTagsList },
    } = useTags();
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
                {globalTagsList.length
                    ? globalTagsList.map((eachTag) => {
                          return (
                              <NavLink
                                  to={`/labels/${eachTag.tagName.split(" ").join("-")}`}
                                  key={eachTag.tagName}
                                  className={`sidebar-btn ${({ isActive }) =>
                                      isActive ? "active" : ""} flex-row-start-center px-16 py-12 mb-6`}
                              >
                                  <span className="material-icons-outlined mx-16">label</span>
                                  <span className="sidebar-label">
                                      {eachTag.tagName.length > 14
                                          ? `${eachTag.tagName.split("").splice(1, 10).join("")}...`
                                          : eachTag.tagName}
                                  </span>
                              </NavLink>
                          );
                      })
                    : null}
                <NavLink
                    to="/archives"
                    className={`sidebar-btn ${({ isActive }) =>
                        isActive ? "active" : ""} flex-row-start-center px-16 py-12 mb-6`}
                >
                    <span className="material-icons-outlined mx-16">archive</span>Archive
                </NavLink>
                <NavLink
                    to="/trash"
                    className={`sidebar-btn ${({ isActive }) =>
                        isActive ? "active" : ""} flex-row-start-center px-16 py-12 mb-6`}
                >
                    <span className="material-icons-outlined mx-16">delete_outline</span>Trash
                </NavLink>
            </div>
        </div>
    );
}
