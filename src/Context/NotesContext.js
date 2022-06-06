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
const filters = {
    filterPriority: [],
    filterTags: [],
    sortByDate: "",
    sortByPriority: "",
    filterBySearchText: "",
};
const NotesContext = createContext();

export function NotesProvider({ children }) {
    const [notesState, notesDispatchFunction] = useReducer(notesReducerFunction, {
        notesList: [],
        archivedList: [],
        trashList: [],
        isEditing: false,
        currentEditNote: { title: "", note: "", bgColor: "#f5f5f5", selectedPriority: {} },
        filters,
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
                    notesDispatchFunction({ type: SET_NOTES, payload: { notesList: data.notes } });
                    toast.success("New Note created.", { id: toastId });
                }
            } catch (err) {
                toast.error("Error Occured, Try Again.", { id: toastId });
            }
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
                        ? notesDispatchFunction({ type: SET_ARCHIVES, payload: { archivedList: data.archives } })
                        : notesDispatchFunction({ type: SET_NOTES, payload: { notesList: data.notes } });
                    toast.success("Edit Success");
                }
            } catch (err) {
                toast.error("Error Occured, Try Again.");
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
                    notesDispatchFunction({
                        type: UPDATED_NOTES_ARCHIVES,
                        payload: { notesList: data.notes, archivedList: data.archives },
                    });
                }
            } catch (err) {
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
                    notesDispatchFunction({
                        type: UPDATED_NOTES_ARCHIVES,
                        payload: { notesList: data.notes, archivedList: data.archives },
                    });
                }
            } catch (err) {
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
                        ? notesDispatchFunction({
                              type: UPDATED_ARCHIVES_TRASH,
                              payload: { archivedList: data.archives, trashList: data.trash },
                          })
                        : notesDispatchFunction({
                              type: UPDATED_NOTES_TRASH,
                              payload: { notesList: data.notes, trashList: data.trash },
                          });
                }
            } catch (err) {
                toast.error("Error Occured, Try Again.", { id: toastId });
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
                    notesDispatchFunction({
                        type: UPDATED_NOTES_TRASH,
                        payload: { notesList: data.notes, trashList: data.trash },
                    });
                }
            } catch (err) {
                toast.error("Error Occured, Try Again.", { id: toastId });
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
                    notesDispatchFunction({
                        type: SET_TRASH,
                        payload: { trashList: data.trash },
                    });
                }
            } catch (err) {
                toast.error("Error Occured, Try Again.", { id: toastId });
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
                    notesDispatchFunction({ type: SET_NOTES, payload: { notesList: data.notes } });
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
                        notesDispatchFunction({ type: SET_NOTES, payload: { notesList: data.notes } });
                    }
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [token]);
    // archives
    useEffect(() => {
        if (token) {
            (async function () {
                try {
                    const { status, data } = await getArchivedList(token);
                    if (status === 200) {
                        notesDispatchFunction({
                            type: SET_ARCHIVES,
                            payload: { archivedList: data.archives },
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [token]);
    // trash
    useEffect(() => {
        if (token) {
            (async function () {
                try {
                    const { status, data } = await getTrashListService(token);
                    if (status === 200) {
                        notesDispatchFunction({
                            type: SET_TRASH,
                            payload: { trashList: data.trash },
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [token]);
    return (
        <NotesContext.Provider
            value={{
                notesState,
                notesDispatchFunction,
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
