import axios from "axios";

export function postNewNoteFunction({ newNote, token }) {
    return axios.post("/api/notes", { note: newNote }, { headers: { authorization: token } });
}
