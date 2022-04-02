import "./EditNote.css";
import { useState } from "react";
import { useNotes } from "../../Context";
import { noteActionTypes } from "../../Context/actionTypes";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";
import { NoteColorPalette } from "../NoteColorPalette/NoteColorPalette";

export function EditNote({ currentEditNote }) {
    const [toggleColorPallete, setToggleClrPallette] = useState(false);
    const {
        editNoteHandler,
        notesDispatchFuntion,
        notesState: { currentEditNote: editedNote },
    } = useNotes();
    const { SET_EDIT_NOTE, SET_INPUT_NOTE_VALUES } = noteActionTypes;
    function editFormSubmitHandler(e) {
        e.preventDefault();
        if (editedNote.title.trim() || editedNote.note.trim()) {
            editNoteHandler(editedNote);
            notesDispatchFuntion({
                type: SET_EDIT_NOTE,
                payload: { isEditing: false, currentEditNote: { title: "", note: "<p><br></p>" } },
            });
        }
    }
    return (
        <div className="edit-note-wrapper flex-row-center-center">
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
                            onClick={() => setToggleClrPallette((prev) => !prev)}
                        >
                            <span className="material-icons-outlined">palette</span>
                        </button>
                        <button className="pointer mx-8" type="button">
                            <span className="material-icons-outlined">label</span>
                        </button>
                    </div>
                    {toggleColorPallete ? <NoteColorPalette /> : null}
                    <div>
                        <button
                            className="mx-8 pointer"
                            onClick={() =>
                                notesDispatchFuntion({
                                    type: SET_EDIT_NOTE,
                                    payload: { isEditing: false, currentEditNote: {} },
                                })
                            }
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
        </div>
    );
}
