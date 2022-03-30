import "./App.css";
import { Navbar, ToastWrapper } from "./Components";
import PageRoutes from "./Routes/PageRoutes";
import { EditNote } from "./Components";
import { useNotes } from "./Context";
function App() {
    const {
        notesState: { isEditing, currentEditNote },
    } = useNotes();
    return (
        <div className="App">
            <ToastWrapper />
            {isEditing ? <EditNote currentEditNote={currentEditNote} /> : null}
            <Navbar />
            <PageRoutes />
        </div>
    );
}

export default App;
