import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, NotesProvider, TagsProvider, NavAsideProvider } from "./Context";

// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <NotesProvider>
                    <TagsProvider>
                        <NavAsideProvider>
                            <App />
                        </NavAsideProvider>
                    </TagsProvider>
                </NotesProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
