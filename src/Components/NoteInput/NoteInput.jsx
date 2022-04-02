import "./NoteInput.css";
import { useState, useEffect, useRef } from "react";
import { useNotes } from "../../Context";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";
import { NoteColorPalette } from "../NoteColorPalette/NoteColorPalette";
import dayjs from "dayjs";

const initialData = { title: "", note: "<p><br></p>", bgColor: "#f5f5f5" };
const formatDate = () => dayjs().format("DD/MM/YY hh:mm:ss a");

export function NoteInput() {
    const [inputData, setInputData] = useState(initialData);
    const [toggleColorPallete, setToggleClrPallette] = useState(false);
    const noteInputRef = useRef(null);

    const { addNewNoteHandler } = useNotes();
    function changeCurrentColorState(e, color) {
        e.stopPropagation();
        setInputData((prev) => ({ ...prev, bgColor: color }));
    }
    function formSubmitHandler(e) {
        e.preventDefault();
        if (inputData.title.trim() || inputData.note !== "<p><br></p>") {
            addNewNoteHandler({ ...inputData, createdAt: formatDate(), isPinned: false });
            setInputData(initialData);
            setToggleClrPallette(false);
        }
    }

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (toggleColorPallete && noteInputRef.current && !noteInputRef.current.contains(e.target)) {
                setToggleClrPallette(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [toggleColorPallete]);
    return (
        <div className="note-input-wrapper flex-row-center-center ma-16">
            <form
                ref={noteInputRef}
                className="note-input-form flex-clmn-center-center"
                style={{ backgroundColor: inputData.bgColor }}
                onSubmit={formSubmitHandler}
            >
                <input
                    className="pa-8"
                    type="text"
                    placeholder="Title"
                    value={inputData.title}
                    onChange={(e) => setInputData((prev) => ({ ...prev, title: e.target.value }))}
                />
                <RichTextEditor
                    value={inputData.note}
                    setValue={(e) => setInputData((prev) => ({ ...prev, note: e }))}
                />
                <div className="flex-row-spc-btw w-100 pa-8 note-actions-wrapper">
                    <div className="note-actions flex-row-spc-btw">
                        <button
                            className="pointer mx-4"
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setToggleClrPallette((prev) => !prev);
                            }}
                        >
                            <span className="material-icons-outlined">palette</span>
                        </button>
                        <button className="pointer mx-4" type="button">
                            <span className="material-icons-outlined">label</span>
                        </button>
                    </div>
                    {toggleColorPallete ? <NoteColorPalette changeCurrentColorState={changeCurrentColorState} /> : null}
                    <button
                        className="form-submit-btn primary-accent pointer"
                        type="submit"
                        disabled={!inputData.title && inputData.note === "<p><br></p>"}
                    >
                        Add Note
                    </button>
                </div>
            </form>
        </div>
    );
}
