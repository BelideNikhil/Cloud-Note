import "./NotesList.css";
import { useNotes } from "../../Context";
import { NoteCard } from "../";
export function NotesList() {
    const {
        notesState: { notesList },
    } = useNotes();
    const pinnedList = notesList.filter((eachNote) => eachNote.isPinned);
    const unPinned = notesList.filter((eachNote) => !eachNote.isPinned);
    return (
        <>
            {pinnedList.length ? <h4 className="w-100">Pinned</h4> : null}
            <ul className="notes-list-wrapper">
                {pinnedList?.map((currentNote) => {
                    return <NoteCard key={currentNote._id} currentNote={currentNote} />;
                })}
            </ul>
            {pinnedList.length && unPinned.length ? <h4 className="w-100">Others</h4> : null}
            <ul className="notes-list-wrapper">
                {unPinned?.map((currentNote) => {
                    return <NoteCard key={currentNote._id} currentNote={currentNote} />;
                })}
            </ul>
        </>
    );
}
