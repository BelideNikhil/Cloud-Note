import { useState, useRef, useEffect } from "react";
import { useNotes, useTags } from "../../Context";
import "./NoteCard.css";
import { noteActionTypes } from "../../Context/actionTypes";
import { NoteColorPalette, PriorityField } from "../index";
const { SET_EDIT_NOTE } = noteActionTypes;
export function NoteCard({ currentNote }) {
    const { title, note, createdAt, bgColor, selectedPriority } = currentNote;
    const [toggleColorPallete, setToggleClrPallette] = useState(false);
    const [togglePriority, setTogglePriority] = useState(false);
    const noteCardRef = useRef(null);
    const {
        notesDispatchFunction,
        moveToArchiveHandler,
        restoreArchivedToNotes,
        moveNoteToTrashHandler,
        togglePinHandler,
        togglePinInArchive,
        editNoteHandler,
        notesState: { archivedList },
    } = useNotes();
    const { deleteChipHandler } = useTags();
    const foundInArchives = archivedList?.find((each) => each._id === currentNote._id);
    function changeCurrentColorState(e, color) {
        e.stopPropagation();
        editNoteHandler({ ...currentNote, bgColor: color });
    }
    function changeSelectedPriorityHandler(value) {
        editNoteHandler({ ...currentNote, selectedPriority: value });
    }
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                (toggleColorPallete || togglePriority) &&
                noteCardRef.current &&
                !noteCardRef.current.contains(e.target)
            ) {
                setToggleClrPallette(false);
                setTogglePriority(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [toggleColorPallete, togglePriority]);
    return (
        <div
            ref={noteCardRef}
            className="note pointer pa-12 flex-clmn-start-start"
            style={{ backgroundColor: bgColor }}
            onClick={() =>
                notesDispatchFunction({
                    type: SET_EDIT_NOTE,
                    payload: { isEditing: true, currentEditNote: currentNote },
                })
            }
        >
            <div>
                <div className="flex-row-spc-btw">
                    <div className={`${selectedPriority ? "priority-tag" : ""}`}>
                        {Object.keys(selectedPriority)[0]}
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
                <div className="note-title mb-6">{title}</div>
                <div className="note-text mb-6" dangerouslySetInnerHTML={{ __html: note }}></div>
                {currentNote.tags.length ? (
                    <div className="tag-chip-wrapper">
                        {currentNote.tags.map((tag) => (
                            <div className="tag-chip flex-row-start-center" key={tag}>
                                <span>{tag.length > 10 ? `${tag.split("").splice(1, 10).join("")}...` : tag}</span>
                                <button className="pointer" onClick={(e) => deleteChipHandler({ e, tag, currentNote })}>
                                    <i className="delete-icon  far fa-times-circle"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>

            <div className="flex-row-spc-btw mt-16">
                <div>{createdAt}</div>
                {toggleColorPallete ? <NoteColorPalette changeCurrentColorState={changeCurrentColorState} /> : null}
                {togglePriority ? (
                    <PriorityField
                        selectedPriority={selectedPriority}
                        changeSelectedPriorityHandler={changeSelectedPriorityHandler}
                    />
                ) : null}
                <div className="note-actions flex-row-spc-btw">
                    <button
                        className="pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setToggleClrPallette((prev) => !prev);
                            setTogglePriority(false);
                        }}
                    >
                        <span className="material-icons-outlined">palette</span>
                    </button>
                    <button
                        className="pointer mx-4"
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setToggleClrPallette(false);
                            setTogglePriority((prev) => !prev);
                        }}
                    >
                        <span className="material-icons-outlined">signal_cellular_alt</span>
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
