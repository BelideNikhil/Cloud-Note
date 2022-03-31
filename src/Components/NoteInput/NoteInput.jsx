import "./NoteInput.css";
import { useState, useEffect, useRef } from "react";
import { useNotes } from "../../Context";
import dayjs from "dayjs";

const initialData = { title: "", note: "" };
const formatDate = () => dayjs().format("DD/MM/YY hh:mm:ss a");

export function NoteInput() {
    const [inputData, setInputData] = useState(initialData);
    const [txtAreaHeight, setTextAreaHeight] = useState(60);
    const textAreaRef = useRef(null);
    const { addNewNoteHandler } = useNotes();
    function formSubmitHandler(e) {
        e.preventDefault();
        if (inputData.title.trim() || inputData.note.trim()) {
            addNewNoteHandler({ ...inputData, createdAt: formatDate() });
            setInputData(initialData);
            setTextAreaHeight(60);
        }
    }
    useEffect(() => {
        if (textAreaRef.current) {
            setTextAreaHeight(textAreaRef.current.scrollHeight);
        }
    }, [inputData]);
    return (
        <div className="note-input-wrapper flex-row-center-center ma-16">
            <form className="note-input-form flex-clmn-center-center" onSubmit={formSubmitHandler}>
                <input
                    className="pa-8"
                    type="text"
                    placeholder="Title"
                    value={inputData.title}
                    onChange={(e) => setInputData((prev) => ({ ...prev, title: e.target.value }))}
                />
                <textarea
                    ref={textAreaRef}
                    className="pa-8"
                    style={{ height: txtAreaHeight + "px" }}
                    placeholder="Take a note..."
                    value={inputData.note}
                    onChange={(e) => setInputData((prev) => ({ ...prev, note: e.target.value }))}
                />
                <div className="flex-row-spc-btw w-100 pa-8">
                    <div className="note-actions flex-row-spc-btw">
                        <button className="pointer mx-4">
                            <span className="material-icons-outlined">palette</span>
                        </button>
                        <button className="pointer mx-4">
                            <span className="material-icons-outlined">label</span>
                        </button>
                    </div>
                    <button
                        className="form-submit-btn primary-accent pointer"
                        type="submit"
                        disabled={!inputData.title && !inputData.note}
                    >
                        Add Note
                    </button>
                </div>
            </form>
        </div>
    );
}
