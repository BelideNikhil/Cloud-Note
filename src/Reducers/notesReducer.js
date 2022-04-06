import { noteActionTypes } from "../Context/actionTypes";

const {
    SET_EDIT_NOTE,
    SET_NOTES,
    SET_INPUT_NOTE_VALUES,
    UPDATED_NOTES_ARCHIVES,
    SET_ARCHIVES,
    SET_TRASH,
    UPDATED_NOTES_TRASH,
    UPDATED_ARCHIVES_TRASH,
    SET_NOTES_TRASH_ARCHIVE,
    SORT_BY_DATE,
    SORT_BY_PRIORITY,
    FILTER_BY_PRIORITY,
    FILTER_BY_TAGS,
    RESET_FILTERS,
} = noteActionTypes;
const filters = {
    filterPriority: [],
    filterTags: [],
    sortByDate: "",
    sortByPriority: "",
};
export function notesReducerFunction(notesState, { type, payload }) {
    switch (type) {
        case SET_NOTES:
            return { ...notesState, notesList: payload.notesList };
        case SET_ARCHIVES:
            return { ...notesState, archivedList: payload.archivedList };
        case SET_TRASH:
            return { ...notesState, trashList: payload.trashList };
        case SET_EDIT_NOTE:
            return { ...notesState, isEditing: payload.isEditing, currentEditNote: payload.currentEditNote };
        case SET_INPUT_NOTE_VALUES:
            return { ...notesState, currentEditNote: { ...notesState.currentEditNote, [payload.type]: payload.value } };
        case UPDATED_NOTES_ARCHIVES:
            return { ...notesState, notesList: payload.notesList, archivedList: payload.archivedList };
        case UPDATED_NOTES_TRASH:
            return { ...notesState, notesList: payload.notesList, trashList: payload.trashList };
        case UPDATED_ARCHIVES_TRASH:
            return { ...notesState, archivedList: payload.archivedList, trashList: payload.trashList };
        case SET_NOTES_TRASH_ARCHIVE:
            return {
                ...notesState,
                notesList: payload.notesList,
                archivedList: payload.archivedList,
                trashList: payload.trashList,
            };
        case SORT_BY_DATE:
            return { ...notesState, filters: { ...notesState.filters, sortByDate: payload.value } };
        case SORT_BY_PRIORITY:
            return { ...notesState, filters: { ...notesState.filters, sortByPriority: payload.value } };
        case FILTER_BY_PRIORITY:
            const currentPriority = notesState.filters.filterPriority.includes(payload.value)
                ? notesState.filters.filterPriority.filter((each) => each !== payload.value)
                : [...notesState.filters.filterPriority, payload.value];
            return {
                ...notesState,
                filters: { ...notesState.filters, filterPriority: [...currentPriority] },
            };
        case FILTER_BY_TAGS:
            const currentTags = notesState.filters.filterTags.includes(payload.value)
                ? notesState.filters.filterTags.filter((each) => each !== payload.value)
                : [...notesState.filters.filterTags, payload.value];
            return {
                ...notesState,
                filters: { ...notesState.filters, filterTags: [...currentTags] },
            };
        case RESET_FILTERS: {
            return {
                ...notesState,
                filters: filters,
            };
        }
        default:
            return notesState;
    }
}
