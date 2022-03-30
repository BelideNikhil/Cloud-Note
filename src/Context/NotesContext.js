import { createContext, useContext, useReducer, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "./";
import { getNoteslist, postNewNoteFunction, editNoteService } from "../Services";
import { noteActionTypes } from "./actionTypes";
const NotesContext = createContext();
const { NOTES_INITIAL_RENDER, ADD_NEW_NOTE, SET_EDIT_NOTE, SET_NOTES, SET_INPUT_NOTE_VALUES } = noteActionTypes;
function notesReducerFunction(notesState, { type, payload }) {
    switch (type) {
        case ADD_NEW_NOTE:
            return { ...notesState, notesList: payload.notesList };
        case SET_NOTES:
            return { ...notesState, notesList: payload.notesList };
        case NOTES_INITIAL_RENDER:
            return { ...notesState, notesList: payload.notesList };
        case SET_EDIT_NOTE:
            return { ...notesState, isEditing: payload.isEditing, currentEditNote: payload.currentEditNote };
        case SET_INPUT_NOTE_VALUES:
            return { ...notesState, currentEditNote: { ...notesState.currentEditNote, [payload.type]: payload.value } };
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
                    toast.error("Error Occured", { id: toastId });
                }
            })();
        }
    }
    function editNoteHandler(currentNote) {
        if (token) {
            (async function () {
                try {
                    const { status, data } = await editNoteService({ currentNote, token });

                    if (status === 201) {
                        notesDispatchFuntion({ type: SET_NOTES, payload: { notesList: data.notes } });
                    }
                } catch (err) {
                    console.log(err);
                }
            })();
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
    return (
        <NotesContext.Provider
            value={{
                notesState,
                notesDispatchFuntion,
                addNewNoteHandler,
                editNoteHandler,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
}
export function useNotes() {
    return useContext(NotesContext);
}
