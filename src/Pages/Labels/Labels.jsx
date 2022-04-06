import { useParams } from "react-router-dom";
import { useNotes } from "../../Context";
import { Sidebar, NoteCard } from "../../Components";

export function Labels() {
    const {
        notesState: { notesList },
    } = useNotes();
    const { label } = useParams();
    const filteredByLabelList = notesList?.filter((each) => each.tags.includes(label.split("-").join(" ")));
    return (
        <div className="main-wrapper mt-8">
            <Sidebar />
            <div className="main">
                {filteredByLabelList.length ? null : <h3 className="w-100 txt-center">No Notes to show.</h3>}
                <ul className="notes-list-wrapper">
                    {filteredByLabelList?.map((currentNote) => {
                        return <NoteCard key={currentNote._id} currentNote={currentNote} />;
                    })}
                </ul>
            </div>
        </div>
    );
}
