import { useNavigate, useLocation } from "react-router-dom";
import { useNotes } from "../../Context/NotesContext";
import "./NavSearch.css";
import { noteActionTypes } from "../../Context/actionTypes";
const { RESET_FILTERS, SET_SEARCH_TEXT } = noteActionTypes;
export function NavSearch() {
    const {
        notesDispatchFunction,
        notesState: { filters },
    } = useNotes();
    const { pathname: currentPath } = useLocation();
    const navigate = useNavigate();
    function searchHandler(e) {
        notesDispatchFunction({ type: RESET_FILTERS });
        notesDispatchFunction({ type: SET_SEARCH_TEXT, payload: { value: e.target.value } });
        if (currentPath !== "/home") {
            navigate("/home");
        }
    }
    return (
        <form className={`header-search-form flex-row-start-center`} onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                className="search-input pa-8"
                placeholder="Search..."
                onChange={searchHandler}
                value={filters.filterBySearchText}
            />
            {filters.filterBySearchText.length ? (
                <button
                    className="btn-icon btn-icon-sm clear-search-btn"
                    type="button"
                    onClick={() => notesDispatchFunction({ type: SET_SEARCH_TEXT, payload: { value: "" } })}
                >
                    <i className="fas fa-times"></i>
                </button>
            ) : null}
        </form>
    );
}
