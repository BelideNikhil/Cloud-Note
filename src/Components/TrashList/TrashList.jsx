import "./TrashList.css";
import { useNotes } from "../../Context";
import { TrashCard } from "./TrashCard";
export function TrashList() {
    const {
        notesState: { trashList },
    } = useNotes();
    return (
        <div className="trashlist-wrapper">
            {trashList?.length > 0 ? null : <h3 className="txt-center">Trash is empty</h3>}
            {trashList?.map((each) => {
                return <TrashCard key={each._id} currentNote={each} />;
            })}
        </div>
    );
}
