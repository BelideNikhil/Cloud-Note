import { useNotes, useTags } from "../../Context";
import "./Filter.css";
import { noteActionTypes } from "../../Context/actionTypes";
const { RESET_FILTERS, SORT_BY_DATE, FILTER_BY_TAGS, FILTER_BY_PRIORITY, SORT_BY_PRIORITY } = noteActionTypes;

const prioritiesArray = ["Low", "Medium", "High"];

export function Filter() {
    const {
        notesState: { filters },
        notesDispatchFunction,
    } = useNotes();
    const {
        tagsState: { globalTagsList },
    } = useTags();

    return (
        <div className="filter-section-wrapper">
            <button className="clear-filter-btn pointer" onClick={() => notesDispatchFunction({ type: RESET_FILTERS })}>
                Clear
            </button>
            <div>
                <ul className="filter-content flex-clmn-start-start">
                    <h4>Sort By</h4>
                    <hr />
                    <li>
                        <label className="flex-row-start-center pointer">
                            <input
                                type="radio"
                                name="sort-by-date"
                                value="oldestFirst"
                                checked={filters.sortByDate === "oldestFirst"}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    notesDispatchFunction({ type: SORT_BY_DATE, payload: { value: e.target.value } });
                                }}
                            />
                            Oldest First
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="radio"
                                name="sort-by-date"
                                value="newestFirst"
                                checked={filters.sortByDate === "newestFirst"}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    notesDispatchFunction({ type: SORT_BY_DATE, payload: { value: e.target.value } });
                                }}
                            />
                            Newest First
                        </label>
                    </li>
                </ul>
                <ul className="filter-content">
                    <h4>Filter By Priority</h4>
                    <hr />
                    {prioritiesArray?.map((eachPriority) => {
                        return (
                            <li key={eachPriority}>
                                <label className="flex-row-start-center pointer">
                                    <input
                                        type="checkbox"
                                        value={eachPriority}
                                        checked={filters.filterPriority.includes(eachPriority)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            notesDispatchFunction({
                                                type: FILTER_BY_PRIORITY,
                                                payload: { value: e.target.value },
                                            });
                                        }}
                                    />
                                    {eachPriority}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <ul className="filter-content">
                    <h4>Filter By Tags</h4>
                    <hr />
                    {globalTagsList.map((eachTag) => {
                        return (
                            <li key={eachTag.tagName}>
                                <label className="flex-row-start-center pointer">
                                    <input
                                        type="checkbox"
                                        value={eachTag.tagName}
                                        checked={filters.filterTags.includes(eachTag.tagName)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            notesDispatchFunction({
                                                type: FILTER_BY_TAGS,
                                                payload: { value: e.target.value },
                                            });
                                        }}
                                    />
                                    {eachTag.tagName.length > 12
                                        ? `${eachTag.tagName.split("").splice(1, 10).join("")}...`
                                        : eachTag.tagName}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
