import "./NotesList.css";
import { useNotes } from "../../Context";
import { NoteCard } from "../";
export function NotesList() {
    const {
        notesState: { notesList },
    } = useNotes();
    return (
        <div>
            <ul className="notes-list-wrapper">
                {notesList?.map((currentNote) => {
                    return <NoteCard key={currentNote._id} currentNote={currentNote} />;
                })}
            </ul>
        </div>
    );
}
