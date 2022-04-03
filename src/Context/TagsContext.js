import { createContext, useContext, useReducer } from "react";
import { useNotes, useAuth } from "./index";
import axios from "axios";
const TagsContext = createContext();
function tagsReducerFunction(tagsState, { type, payload }) {
    switch (type) {
        case "TAG_INPUT":
            return { ...tagsState, newTagText: payload.newTagText };
        case "CREATE_TAG":
            return {
                ...tagsState,
                globalTagsList: [...tagsState.globalTagsList, { tagName: payload.tagName, tagState: false }],
            };
        case "REMOVE_TAG":
            return {
                ...tagsState,
                globalTagsList: tagsState.globalTagsList.filter((eachTag) => eachTag.tagName !== payload.tagName),
            };
        case "UPDATE_TAG_STATE":
            return {
                ...tagsState,
                globalTagsList: tagsState.globalTagsList.map((eachTag) =>
                    eachTag.tagName === payload.tagName ? { ...eachTag, tagState: payload.tagState } : eachTag
                ),
            };
        case "RESET_GLOBAL_TAG_STATES":
            return {
                ...tagsState,
                newTagText: "",
                globalTagsList: tagsState.globalTagsList.map((eachTag) => ({ ...eachTag, tagState: false })),
            };
        case "SET_GLOBAL_TAGS_LIST":
            return {
                ...tagsState,
                globalTagsList: payload.globalTagsList,
            };
        default:
            return tagsState;
    }
}
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
    const {
        editNoteHandler,
        notesDispatchFuntion,
        notesState: { archivedList },
    } = useNotes();
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
            const { status, data } = await axios.post(
                "/api/notes/updatetags",
                { deletedLabel: tag.tagName },
                { headers: { authorization: token } }
            );
            if (status === 201) {
                console.log(data);
                tagsDispatchFunction({ type: "REMOVE_TAG", payload: { tagName: tag.tagName } });
                notesDispatchFuntion({
                    type: "SET_NOTES_TRASH_ARCHIVE",
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
