import { useNotes } from "../../Context";
import "./NoteCard.css";
import { noteActionTypes } from "../../Context/actionTypes";
export function NoteCard({ currentNote }) {
    const { title, note, createdAt } = currentNote;
    const {
        notesDispatchFuntion,
        moveToArchiveHandler,
        restoreArchivedToNotes,
        notesState: { archivedList },
    } = useNotes();
    const { SET_EDIT_NOTE } = noteActionTypes;
    const foundInArchives = archivedList.find((each) => each._id === currentNote._id);
    return (
        <div
            className="note pointer pa-12"
            onClick={() =>
                notesDispatchFuntion({
                    type: SET_EDIT_NOTE,
                    payload: { isEditing: true, currentEditNote: currentNote },
                })
            }
        >
            <div className="content-wrapper">
                <div>
                    <div className="note-title mb-6">{title}</div>
                    <div className="note-text mb-6">{note}</div>
                </div>
                <button className="pointer note-pin">
                    <span className="material-icons-outlined">push_pin</span>
                </button>
            </div>
            <div className="flex-row-spc-btw mt-16">
                <div>{createdAt}</div>
                <div className="note-actions flex-row-spc-btw">
                    <button className="pointer">
                        <span className="material-icons-outlined">palette</span>
                    </button>
                    <button className="pointer">
                        <span className="material-icons-outlined">label</span>
                    </button>
                    <button
                        className="pointer"
                        onClick={(e) =>
                            foundInArchives
                                ? restoreArchivedToNotes(e, currentNote)
                                : moveToArchiveHandler(e, currentNote)
                        }
                    >
                        <span className="material-icons-outlined">{foundInArchives ? "unarchive" : "archive"}</span>
                    </button>
                    <button className="pointer">
                        <span className="material-icons-outlined">delete_outline</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
