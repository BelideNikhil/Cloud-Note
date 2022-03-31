import { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "./";
import {
    getNoteslist,
    postNewNoteFunction,
    editNoteService,
    getArchivedList,
    postToArchives,
    restoreFromArchives,
    editNoteinArchives,
} from "../Services";
import { noteActionTypes } from "./actionTypes";
const NotesContext = createContext();
const {
    NOTES_INITIAL_RENDER,
    ADD_NEW_NOTE,
    SET_EDIT_NOTE,
    SET_NOTES,
    SET_INPUT_NOTE_VALUES,
    ARCHIVES_INITIAL_RENDER,
    UPDATED_NOTES_ARCHIVES,
    SET_ARCHIVES,
} = noteActionTypes;
function notesReducerFunction(notesState, { type, payload }) {
    switch (type) {
        case ADD_NEW_NOTE:
            return { ...notesState, notesList: payload.notesList };
        case SET_NOTES:
            return { ...notesState, notesList: payload.notesList };
        case SET_ARCHIVES:
            return { ...notesState, archivedList: payload.archivedList };
        case SET_EDIT_NOTE:
            return { ...notesState, isEditing: payload.isEditing, currentEditNote: payload.currentEditNote };
        case SET_INPUT_NOTE_VALUES:
            return { ...notesState, currentEditNote: { ...notesState.currentEditNote, [payload.type]: payload.value } };
        case UPDATED_NOTES_ARCHIVES:
            return { ...notesState, notesList: payload.notesList, archivedList: payload.archivedList };
        case NOTES_INITIAL_RENDER:
            return { ...notesState, notesList: payload.notesList };
        case ARCHIVES_INITIAL_RENDER:
            return { ...notesState, archivedList: payload.archivedList };
        default:
            return notesState;
    }
}

export function NotesProvider({ children }) {
    const [notesState, notesDispatchFuntion] = useReducer(notesReducerFunction, {
        notesList: [],
        archivedList: [],
        isEditing: false,
        currentEditNote: { title: "", note: "" },
    });
    const {
        authState: { token },
    } = useAuth();
    function addNewNoteHandler(newNote) {
        const toastId = toast.loading("creating...");
        if (token) {
            (async function () {
                try {
                    const { status, data } = await postNewNoteFunction({ newNote, token });
                    if (status === 201) {
                        notesDispatchFuntion({ type: ADD_NEW_NOTE, payload: { notesList: data.notes } });
                        toast.success("New Note created.", { id: toastId });
                    }
                } catch (err) {
                    console.log(err);
                    toast.error("Error Occured, Try Again.", { id: toastId });
                }
            })();
        }
    }
    async function editNoteHandler(currentNote) {
        const foundInArchives = notesState.archivedList.find((each) => each._id === currentNote._id);
        if (token) {
            try {
                const { status, data } = foundInArchives
                    ? await editNoteinArchives({ currentNote, token })
                    : await editNoteService({ currentNote, token });
                if (status === 201) {
                    foundInArchives
                        ? notesDispatchFuntion({ type: SET_ARCHIVES, payload: { archivedList: data.archives } })
                        : notesDispatchFuntion({ type: SET_NOTES, payload: { notesList: data.notes } });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    async function moveToArchiveHandler(e, currentNote) {
        e.stopPropagation();
        const toastId = toast.loading("Archiving...");
        if (token) {
            try {
                const { status, data } = await postToArchives({ currentNote, token });
                console.log(status, data);
                if (status === 201) {
                    toast.success("Note Archived", { id: toastId });
                    notesDispatchFuntion({
                        type: UPDATED_NOTES_ARCHIVES,
                        payload: { notesList: data.notes, archivedList: data.archives },
                    });
                }
            } catch (err) {
                console.log(err);
                toast.error("Error Occured, Try Again.", { id: toastId });
            }
        }
    }
    async function restoreArchivedToNotes(e, currentNote) {
        e.stopPropagation();
        const toastId = toast.loading("Restoring...");
        if (token) {
            try {
                const { status, data } = await restoreFromArchives({ currentNote, token });
                toast.success("Note Unarchived", { id: toastId });
                if (status === 200) {
                    notesDispatchFuntion({
                        type: UPDATED_NOTES_ARCHIVES,
                        payload: { notesList: data.notes, archivedList: data.archives },
                    });
                }
            } catch (err) {
                console.log(err);
                toast.error("Error Occured, Try Again.", { id: toastId });
            }
        }
    }
    useEffect(() => {
        if (token) {
            (async function () {
                try {
                    const { status, data } = await getNoteslist(token);
                    if (status === 200) {
                        notesDispatchFuntion({ type: NOTES_INITIAL_RENDER, payload: { notesList: data.notes } });
                    }
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, []);
    useEffect(() => {
        if (token) {
            (async function () {
                try {
                    const { status, data } = await getArchivedList(token);
                    if (status === 200) {
                        notesDispatchFuntion({
                            type: ARCHIVES_INITIAL_RENDER,
                            payload: { archivedList: data.archives },
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, []);
    return (
        <NotesContext.Provider
            value={{
                notesState,
                notesDispatchFuntion,
                addNewNoteHandler,
                editNoteHandler,
                moveToArchiveHandler,
                restoreArchivedToNotes,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
}
export function useNotes() {
    return useContext(NotesContext);
}
