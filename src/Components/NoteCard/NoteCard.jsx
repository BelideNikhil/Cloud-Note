import { useState, useRef, useEffect } from "react";
import { useNotes } from "../../Context";
import "./NoteCard.css";
import { noteActionTypes } from "../../Context/actionTypes";
import { NoteColorPalette } from "../NoteColorPalette/NoteColorPalette";
const { SET_EDIT_NOTE } = noteActionTypes;

export function NoteCard({ currentNote }) {
    const { title, note, createdAt, bgColor } = currentNote;
    const [toggleColorPallete, setToggleClrPallette] = useState(false);
    const noteCardRef = useRef(null);
    const {
        notesDispatchFuntion,
        moveToArchiveHandler,
        restoreArchivedToNotes,
        moveNoteToTrashHandler,
        togglePinHandler,
        togglePinInArchive,
        editNoteHandler,
        notesState: { archivedList },
    } = useNotes();
    const foundInArchives = archivedList?.find((each) => each._id === currentNote._id);
    function changeCurrentColorState(e, color) {
        e.stopPropagation();
        editNoteHandler({ ...currentNote, bgColor: color });
    }

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (toggleColorPallete && noteCardRef.current && !noteCardRef.current.contains(e.target)) {
                setToggleClrPallette(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [toggleColorPallete]);
    return (
        <div
            ref={noteCardRef}
            className="note pointer pa-12"
            style={{ backgroundColor: bgColor, position: "relative" }}
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
                    <div className="note-text mb-6" dangerouslySetInnerHTML={{ __html: note }}></div>
                </div>
                <button
                    className="pointer note-pin"
                    onClick={(e) =>
                        foundInArchives ? togglePinInArchive(e, currentNote) : togglePinHandler(e, currentNote)
                    }
                >
                    <span className={currentNote.isPinned ? "material-icons" : "material-icons-outlined"}>
                        push_pin
                    </span>
                </button>
            </div>
            <div className="flex-row-spc-btw mt-16">
                <div>{createdAt}</div>
                {toggleColorPallete ? <NoteColorPalette changeCurrentColorState={changeCurrentColorState} /> : null}
                <div className="note-actions flex-row-spc-btw">
                    <button
                        className="pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setToggleClrPallette((prev) => !prev);
                        }}
                    >
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
                    <button className="pointer" onClick={(e) => moveNoteToTrashHandler(e, currentNote)}>
                        <span className="material-icons-outlined">delete_outline</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
