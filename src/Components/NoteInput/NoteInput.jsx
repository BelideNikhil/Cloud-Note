import "./NoteInput.css";
import { useState } from "react";
import { useNotes } from "../../Context";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";
import dayjs from "dayjs";

const initialData = { title: "", note: null };
const formatDate = () => dayjs().format("DD/MM/YY hh:mm:ss a");

export function NoteInput() {
    const [inputData, setInputData] = useState(initialData);
    const { addNewNoteHandler } = useNotes();
    function formSubmitHandler(e) {
        e.preventDefault();
        if (inputData.title.trim() || inputData.note.trim()) {
            addNewNoteHandler({ ...inputData, createdAt: formatDate() });
            setInputData(initialData);
        }
    }
    console.log(inputData);
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
                <RichTextEditor
                    value={inputData.note}
                    setValue={(e) => setInputData((prev) => ({ ...prev, note: e }))}
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
