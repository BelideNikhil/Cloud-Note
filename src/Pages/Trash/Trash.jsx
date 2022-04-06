import { Sidebar } from "../../Components";
import { TrashCard } from "./TrashCard";
import { useNotes } from "../../Context";
export function Trash() {
    const {
        notesState: { trashList },
    } = useNotes();
    return (
        <div className="main-wrapper mt-8">
            <Sidebar />
            <div className="main">
                <div className="notes-list-wrapper">
                    {trashList?.length > 0 ? null : <h3 className="txt-center">Trash is empty</h3>}
                    {trashList?.map((each) => {
                        return <TrashCard key={each._id} currentNote={each} />;
                    })}
                </div>
            </div>
        </div>
    );
}
