import { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { notesReducerFunction } from "../Reducers/notesReducer";
import {
    getNoteslist,
    postNewNoteFunction,
    editNoteService,
    getArchivedList,
    postToArchives,
    restoreFromArchives,
    editNoteinArchives,
    postNoteToTrashService,
    postArchiveToTrashService,
    getTrashListService,
    restoreFromTrashService,
    deleteNoteFromTrashService,
    postNotePinService,
} from "../Services";
import { noteActionTypes } from "./actionTypes";
const { SET_NOTES, UPDATED_NOTES_ARCHIVES, SET_ARCHIVES, SET_TRASH, UPDATED_NOTES_TRASH, UPDATED_ARCHIVES_TRASH } =
    noteActionTypes;
const NotesContext = createContext();

export function NotesProvider({ children }) {
    const [notesState, notesDispatchFuntion] = useReducer(notesReducerFunction, {
        notesList: [],
        archivedList: [],
        trashList: [],
        isEditing: false,
        currentEditNote: { title: "", note: "" },
    });
    const {
        authState: { token },
    } = useAuth();
    async function addNewNoteHandler(newNote) {
        const toastId = toast.loading("creating...");
        if (token) {
            try {
                const { status, data } = await postNewNoteFunction({ newNote, token });
                if (status === 201) {
                    notesDispatchFuntion({ type: SET_NOTES, payload: { notesList: data.notes } });
                    toast.success("New Note created.", { id: toastId });
                }
            } catch (err) {
                toast.error("Error Occured, Try Again.", { id: toastId });
                console.log(err);
            }
        }
    }
    async function editNoteHandler(currentNote) {
        console.log("calling backedn");
        const foundInArchives = notesState.archivedList.find((each) => each._id === currentNote._id);
        if (token) {
            try {
                const { status, data } = foundInArchives
                    ? await editNoteinArchives({ currentNote, token })
                    : await editNoteService({ currentNote, token });
                if (status === 201) {
                    console.log("data from backend", data);
                    foundInArchives
                        ? notesDispatchFuntion({ type: SET_ARCHIVES, payload: { archivedList: data.archives } })
                        : notesDispatchFuntion({ type: SET_NOTES, payload: { notesList: data.notes } });
                    toast.success("Edit Success");
                }
            } catch (err) {
                toast.error("Error Occured, Try Again.");
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
                if (status === 201) {
                    toast.success("Note Archived", { id: toastId });
                    notesDispatchFuntion({
                        type: UPDATED_NOTES_ARCHIVES,
                        payload: { notesList: data.notes, archivedList: data.archives },
                    });
                }
            } catch (err) {
                toast.error("Error Occured, Try Again.", { id: toastId });
                console.log(err);
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
    // delete note from trash
    async function moveNoteToTrashHandler(e, currentNote) {
        e.stopPropagation();
        const foundInArchives = notesState.archivedList.find((each) => each._id === currentNote._id);
        const toastId = toast.loading("Moving To Trash...");
        if (token) {
            try {
                const { status, data } = foundInArchives
                    ? await postArchiveToTrashService({ token, currentNote })
                    : await postNoteToTrashService({ token, currentNote });
                if (status === 201) {
                    toast.success("Moved To Trash.", { id: toastId });
                    foundInArchives
                        ? notesDispatchFuntion({
                              type: UPDATED_ARCHIVES_TRASH,
                              payload: { archivedList: data.archives, trashList: data.trash },
                          })
                        : notesDispatchFuntion({
                              type: UPDATED_NOTES_TRASH,
                              payload: { notesList: data.notes, trashList: data.trash },
                          });
                }
            } catch (err) {
                toast.error("Error Occured, Try Again.", { id: toastId });
                console.log(err);
            }
        }
    }
    // restore note from trash
    async function restoreFromTrash(e, currentNote) {
        e.stopPropagation();
        const toastId = toast.loading("Restoring...");
        if (token) {
            try {
                const { status, data } = await restoreFromTrashService({ currentNote, token });
                if (status === 200) {
                    toast.success("Note Restored.", { id: toastId });
                    notesDispatchFuntion({
                        type: UPDATED_NOTES_TRASH,
                        payload: { notesList: data.notes, trashList: data.trash },
                    });
                }
            } catch (err) {
                toast.error("Error Occured, Try Again.", { id: toastId });
                console.log(err);
            }
        }
    }
    // permanent delete from trash
    async function deleteNoteFromTrash(e, currentNote) {
        e.stopPropagation();
        const toastId = toast.loading("Deleting...");
        if (token) {
            try {
                const { status, data } = await deleteNoteFromTrashService({ currentNote, token });
                if (status === 200) {
                    toast.success("Note Deleted.", { id: toastId });
                    notesDispatchFuntion({
                        type: SET_TRASH,
                        payload: { trashList: data.trash },
                    });
                }
            } catch (err) {
                toast.error("Error Occured, Try Again.", { id: toastId });
                console.log(err);
            }
        }
    }
    //
    async function togglePinHandler(e, currentNote) {
        e.stopPropagation();
        if (token) {
            try {
                const { status, data } = await postNotePinService({ currentNote, token });
                if (status === 200) {
                    notesDispatchFuntion({ type: SET_NOTES, payload: { notesList: data.notes } });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    async function togglePinInArchive(e, currentNote) {
        e.stopPropagation();
        await restoreArchivedToNotes(e, currentNote);
        await togglePinHandler(e, currentNote);
    }
    // notes
    useEffect(() => {
        if (token) {
            (async function () {
                try {
                    const { status, data } = await getNoteslist(token);
                    if (status === 200) {
                        notesDispatchFuntion({ type: SET_NOTES, payload: { notesList: data.notes } });
                    }
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, []);
    // archives
    useEffect(() => {
        if (token) {
            (async function () {
                try {
                    const { status, data } = await getArchivedList(token);
                    if (status === 200) {
                        notesDispatchFuntion({
                            type: SET_ARCHIVES,
                            payload: { archivedList: data.archives },
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, []);
    // trash
    useEffect(() => {
        if (token) {
            (async function () {
                try {
                    const { status, data } = await getTrashListService(token);
                    if (status === 200) {
                        notesDispatchFuntion({
                            type: SET_TRASH,
                            payload: { trashList: data.trash },
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
                moveNoteToTrashHandler,
                restoreFromTrash,
                deleteNoteFromTrash,
                togglePinHandler,
                togglePinInArchive,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
}
export function useNotes() {
    return useContext(NotesContext);
}
