import "./ArchivedList.css";
import { useNotes } from "../../Context";
import { NoteCard } from "../NoteCard/NoteCard";
export function ArchivedList() {
    const {
        notesState: { archivedList },
    } = useNotes();
    return (
        <div className="archived-list-wrapper">
            {archivedList?.length > 0 ? null : <h3 className="txt-center">No Archived Notes</h3>}
            {archivedList.map((each) => {
                return <NoteCard key={each._id} currentNote={each} />;
            })}
        </div>
    );
}
