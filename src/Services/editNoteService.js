import axios from "axios";

export function editNoteService({ currentNote, token }) {
    return axios.post(`/api/notes/${currentNote._id}`, { note: currentNote }, { headers: { authorization: token } });
}
