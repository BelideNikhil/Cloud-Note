import { Sidebar, NoteCard } from "../../Components";
import { useNotes } from "../../Context";
export function Archives() {
    const {
        notesState: { archivedList },
    } = useNotes();
    return (
        <div className="main-wrapper mt-8">
            <Sidebar />
            <div className="main">
                <div className="notes-list-wrapper">
                    {archivedList?.length > 0 ? null : <h3 className="txt-center">No Archived Notes</h3>}
                    {archivedList.map((each) => {
                        return <NoteCard key={each._id} currentNote={each} />;
                    })}
                </div>
            </div>
        </div>
    );
}
