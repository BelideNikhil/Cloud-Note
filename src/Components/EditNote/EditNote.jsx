import "./EditNote.css";
import { useState, useEffect } from "react";
import { useNotes, useTags } from "../../Context";
import { noteActionTypes, tagsActionTypes } from "../../Context/actionTypes";
import { RichTextEditor, NoteColorPalette, Tags } from "../index";

const { SET_EDIT_NOTE, SET_INPUT_NOTE_VALUES } = noteActionTypes;
const { RESET_GLOBAL_TAG_STATES, SET_GLOBAL_TAGS_LIST } = tagsActionTypes;
export function EditNote({ currentEditNote }) {
    const [toggleColorPallete, setToggleClrPallette] = useState(false);
    const [toggleTagModal, setToggleTagModal] = useState(false);
    const {
        tagsState: { globalTagsList },
        tagsDispatchFunction,
    } = useTags();
    const {
        editNoteHandler,
        notesDispatchFuntion,
        notesState: { currentEditNote: editedNote, isEditing },
    } = useNotes();
    let currentTagsList = globalTagsList?.map((tag) => {
        return currentEditNote.tags.includes(tag.tagName) ? { ...tag, tagState: true } : tag;
    });
    function editFormSubmitHandler(e) {
        e.preventDefault();
        if (editedNote.title.trim() || editedNote.note.trim()) {
            const selectedTags = globalTagsList.filter((tag) => tag.tagState).map((x) => x.tagName);
            editNoteHandler({ ...editedNote, tags: selectedTags });
            notesDispatchFuntion({
                type: SET_EDIT_NOTE,
                payload: { isEditing: false, currentEditNote: { title: "", note: "<p><br></p>" } },
            });
            tagsDispatchFunction({ type: RESET_GLOBAL_TAG_STATES });
        }
    }
    useEffect(() => {
        if (isEditing) {
            tagsDispatchFunction({
                type: SET_GLOBAL_TAGS_LIST,
                payload: { globalTagsList: currentTagsList },
            });
        }
    }, []);
    return (
        <div className=" flex-row-center-center edit-note-modal">
            <div className="edit-note-wrapper">
                <form
                    className="note-input-form flex-clmn-center-center edit-note-form"
                    onSubmit={editFormSubmitHandler}
                    style={{ backgroundColor: currentEditNote.bgColor }}
                >
                    <input
                        className="pa-8"
                        type="text"
                        placeholder="Title"
                        value={currentEditNote.title}
                        onChange={(e) =>
                            notesDispatchFuntion({
                                type: SET_INPUT_NOTE_VALUES,
                                payload: { type: "title", value: e.target.value },
                            })
                        }
                    />
                    <RichTextEditor
                        value={currentEditNote.note}
                        setValue={(e) =>
                            notesDispatchFuntion({
                                type: SET_INPUT_NOTE_VALUES,
                                payload: { type: "note", value: e },
                            })
                        }
                    />
                    <div className="flex-row-spc-btw w-100 pa-8">
                        <div className="note-actions flex-row-spc-btw">
                            <button
                                className="pointer mx-4"
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setToggleTagModal(false);
                                    setToggleClrPallette((prev) => !prev);
                                }}
                            >
                                <span className="material-icons-outlined">palette</span>
                            </button>
                            <button
                                className="pointer mx-8"
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setToggleClrPallette(false);
                                    setToggleTagModal((prev) => !prev);
                                }}
                            >
                                <span className="material-icons-outlined">label</span>
                            </button>
                        </div>
                        {toggleColorPallete ? <NoteColorPalette /> : null}
                        <div>
                            <button
                                className="mx-8 pointer"
                                onClick={() => {
                                    notesDispatchFuntion({
                                        type: SET_EDIT_NOTE,
                                        payload: { isEditing: false, currentEditNote: {} },
                                    });
                                    tagsDispatchFunction({ type: RESET_GLOBAL_TAG_STATES });
                                }}
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className="mx-4 form-submit-btn primary-accent pointer"
                                type="submit"
                                disabled={!currentEditNote.title && !currentEditNote.note}
                            >
                                Save Note
                            </button>
                        </div>
                    </div>
                </form>
                {toggleTagModal ? <Tags /> : null}
            </div>
        </div>
    );
}
