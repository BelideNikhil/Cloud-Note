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
} = noteActionTypes;

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
        default:
            return notesState;
    }
}
