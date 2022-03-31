import "./ArchivedList.css";
import { useNotes } from "../../Context";
import { NoteCard } from "../NoteCard/NoteCard";
export function ArchivedList() {
    const {
        notesState: { archivedList },
    } = useNotes();
    console.log(archivedList);
    return (
        <div className="archived-list-wrapper">
            {archivedList.map((each) => {
                return <NoteCard key={each._id} currentNote={each} />;
            })}
        </div>
    );
}
