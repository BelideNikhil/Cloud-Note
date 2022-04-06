import "./NoteInput.css";
import { useState, useEffect, useRef } from "react";
import { useNotes, useTags } from "../../Context";
import { RichTextEditor, NoteColorPalette, Tags, PriorityField } from "../index";
import dayjs from "dayjs";
const formatDate = () => dayjs().format("DD/MM/YY hh:mm:ss a");

const initialData = {
    title: "",
    note: "<p><br></p>",
    bgColor: "#f5f5f5",
    selectedPriority: { Low: "1" },
    isPinned: false,
};

export function NoteInput() {
    const [inputData, setInputData] = useState(initialData);
    const [toggleColorPallete, setToggleClrPallette] = useState(false);
    const [toggleTagModal, setToggleTagModal] = useState(false);
    const [togglePriority, setTogglePriority] = useState(false);

    const noteInputRef = useRef(null);
    const {
        tagsState: { globalTagsList },
        tagsDispatchFunction,
    } = useTags();
    const { addNewNoteHandler } = useNotes();
    function changeCurrentColorState(e, color) {
        e.stopPropagation();
        setInputData((prev) => ({ ...prev, bgColor: color }));
    }
    function changeSelectedPriorityHandler(value) {
        setInputData((prev) => ({ ...prev, selectedPriority: value }));
    }
    function falseStatesSetter() {
        setToggleClrPallette(false);
        setToggleTagModal(false);
        setTogglePriority(false);
    }
    function resetFunction() {
        setInputData(initialData);
        falseStatesSetter();
        tagsDispatchFunction({ type: "RESET_GLOBAL_TAG_STATES" });
    }
    function formSubmitHandler(e) {
        e.preventDefault();
        if (inputData.title.trim() || inputData.note !== "<p><br></p>") {
            const selectedTags = globalTagsList.filter((tag) => tag.tagState).map((x) => x.tagName);
            addNewNoteHandler({ ...inputData, tags: selectedTags, createdAt: formatDate() });
            resetFunction();
        }
    }
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                (toggleColorPallete || toggleTagModal || togglePriority) &&
                noteInputRef.current &&
                !noteInputRef.current.contains(e.target)
            ) {
                falseStatesSetter();
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [toggleColorPallete, toggleTagModal, togglePriority]);

    return (
        <div className="flex-row-center-center ma-16">
            <div className="note-input-wrapper" ref={noteInputRef}>
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
                                    setToggleTagModal(false);
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
                                    setToggleTagModal((prev) => !prev);
                                    setTogglePriority(false);
                                }}
                            >
                                <span className="material-icons-outlined">label</span>
                            </button>
                            <button
                                className="pointer mx-4"
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setToggleClrPallette(false);
                                    setToggleTagModal(false);
                                    setTogglePriority((prev) => !prev);
                                }}
                            >
                                <span className="material-icons-outlined">signal_cellular_alt</span>
                            </button>
                        </div>
                        {toggleColorPallete ? (
                            <NoteColorPalette changeCurrentColorState={changeCurrentColorState} />
                        ) : null}
                        {togglePriority ? (
                            <PriorityField
                                selectedPriority={inputData.selectedPriority}
                                changeSelectedPriorityHandler={changeSelectedPriorityHandler}
                            />
                        ) : null}
                        <button
                            className="form-submit-btn primary-accent pointer"
                            type="submit"
                            disabled={!inputData.title && inputData.note === "<p><br></p>"}
                        >
                            Add Note
                        </button>
                    </div>
                </form>
                {toggleTagModal ? <Tags /> : null}
            </div>
        </div>
    );
}
