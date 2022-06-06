import "./NotesList.css";
import { useNotes } from "../../Context";
import { NoteCard } from "../";
import { sortAndFilterFunction } from "../../Helpers";
export function NotesList() {
    const {
        notesState: { notesList, filters },
    } = useNotes();
    const finalList = sortAndFilterFunction(notesList, filters);
    const pinnedList = finalList.filter((eachNote) => eachNote.isPinned);
    const unPinned = finalList.filter((eachNote) => !eachNote.isPinned);

    return (
        <>
            <ul className="notes-list-wrapper">
                {pinnedList.length ? <h3 className="title-text">Pinned</h3> : null}
                {pinnedList?.map((currentNote) => {
                    return <NoteCard key={currentNote._id} currentNote={currentNote} />;
                })}
            </ul>
            <ul className="notes-list-wrapper">
                {pinnedList.length && unPinned.length ? <h3 className="title-text">Others</h3> : null}
                {unPinned?.map((currentNote) => {
                    return <NoteCard key={currentNote._id} currentNote={currentNote} />;
                })}
            </ul>
            {!finalList?.length ? <h3 className="flex-row-center-center">No Notes Found</h3> : null}
        </>
    );
}
