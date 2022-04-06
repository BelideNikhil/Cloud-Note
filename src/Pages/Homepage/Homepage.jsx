import { Sidebar, NotesList, NoteInput } from "../../Components";
export function Homepage() {
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
