import axios from "axios";

export function getNoteslist(token) {
    return axios.get("/api/notes", { headers: { authorization: token } });
}
