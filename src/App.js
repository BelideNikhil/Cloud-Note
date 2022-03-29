import "./App.css";
import { Navbar, Sidebar } from "./Components";
function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="main-wrapper mt-8">
                <Sidebar />
            </div>
        </div>
    );
}

export default App;
