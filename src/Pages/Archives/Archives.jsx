import "./Archives.css";
import { Sidebar, ArchivedList } from "../../Components";

export function Archives() {
    return (
        <div className="main-wrapper mt-8">
            <Sidebar />
            <div className="main">
                <ArchivedList />
            </div>
        </div>
    );
}
