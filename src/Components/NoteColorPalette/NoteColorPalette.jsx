import "./NoteColorPalette.css";
import { useNotes } from "../../Context/NotesContext";
import { noteActionTypes } from "../../Context/actionTypes";

const bgColorList = ["#f5f5f5", "#FBB3BD", "#fbccc4", "#c7b6e5", "#add6ea", "#baf0bf"];

export function NoteColorPalette({ changeCurrentColorState }) {
    const {
        notesDispatchFunction,
        notesState: { isEditing },
    } = useNotes();
    const { SET_INPUT_NOTE_VALUES } = noteActionTypes;

    return (
        <div className="color-palette-wrapper pa-8" onClick={(e) => e.stopPropagation()}>
            {bgColorList.map((currentColor) => {
                return (
                    <button
                        className="color-palette-btn pointer mr-4 "
                        key={currentColor}
                        style={{
                            backgroundColor: currentColor,
                        }}
                        type="button"
                        onClick={(e) => {
                            if (isEditing) {
                                notesDispatchFunction({
                                    type: SET_INPUT_NOTE_VALUES,
                                    payload: { type: "bgColor", value: currentColor },
                                });
                            } else {
                                changeCurrentColorState(e, currentColor);
                            }
                        }}
                    ></button>
                );
            })}
        </div>
    );
}
