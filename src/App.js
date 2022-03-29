import "./App.css";
import { Navbar, ToastWrapper } from "./Components";
import PageRoutes from "./Routes/PageRoutes";

function App() {
    return (
        <div className="App">
            <ToastWrapper />
            <Navbar />
            <PageRoutes />
        </div>
    );
}

export default App;
