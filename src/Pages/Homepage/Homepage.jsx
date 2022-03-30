import { Sidebar, NotesList, NoteInput, EditNote } from "../../Components";
import { useNotes } from "../../Context";
export function Homepage() {
    const {
        notesState: { isEditing, currentEditNote },
    } = useNotes();
    return (
        <div className="main-wrapper mt-8">
            <Sidebar />
            <div className="main">
                <NoteInput />
                <NotesList />
            </div>
        </div>
    );
}
