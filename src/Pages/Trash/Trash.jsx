import { Sidebar, TrashList } from "../../Components";
export function Trash() {
    return (
        <div className="main-wrapper mt-8">
            <Sidebar />
            <div className="main">
                <TrashList />
            </div>
        </div>
    );
}
