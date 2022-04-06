import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, AuthProvider, NotesProvider, TagsProvider, NavAsideProvider } from "./Context/";

// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <NotesProvider>
                        <TagsProvider>
                            <NavAsideProvider>
                                <App />
                            </NavAsideProvider>
                        </TagsProvider>
                    </NotesProvider>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
