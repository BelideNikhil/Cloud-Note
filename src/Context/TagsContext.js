import { createContext, useContext, useReducer } from "react";
import { useNotes, useAuth } from "./index";
import { noteActionTypes, tagsActionTypes } from "./actionTypes";
import { filterDeletedLabelService } from "../Services";
import { tagsReducerFunction } from "../Reducers";
const TagsContext = createContext();

const { REMOVE_TAG } = tagsActionTypes;
const { SET_NOTES_TRASH_ARCHIVE } = noteActionTypes;

export function TagsProvider({ children }) {
    const [tagsState, tagsDispatchFunction] = useReducer(tagsReducerFunction, {
        newTagText: "",
        globalTagsList: [
            { tagName: "Shopping", tagState: false },
            { tagName: "Tasks", tagState: false },
            { tagName: "Work", tagState: false },
            { tagName: "Chores", tagState: false },
        ],
    });
    const { editNoteHandler, notesDispatchFuntion } = useNotes();
    const {
        authState: { token },
    } = useAuth();

    function deleteChipHandler({ e, tag, currentNote }) {
        e.stopPropagation();
        currentNote.tags = currentNote.tags.filter((eachTag) => eachTag.toUpperCase() !== tag.toUpperCase());
        editNoteHandler(currentNote);
    }
    async function deleteFormLabelhandler({ tag }) {
        try {
            const { status, data } = await filterDeletedLabelService({ tag, token });
            if (status === 201) {
                tagsDispatchFunction({ type: REMOVE_TAG, payload: { tagName: tag.tagName } });
                notesDispatchFuntion({
                    type: SET_NOTES_TRASH_ARCHIVE,
                    payload: { notesList: data.notes, trashList: data.trash, archivedList: data.archives },
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <TagsContext.Provider value={{ tagsState, tagsDispatchFunction, deleteChipHandler, deleteFormLabelhandler }}>
            {children}
        </TagsContext.Provider>
    );
}

export function useTags() {
    return useContext(TagsContext);
}
