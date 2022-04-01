import axios from "axios";

export function deleteNoteFromTrashService({ currentNote, token }) {
    return axios.post(`/api/trash/delete/${currentNote._id}`, {}, { headers: { authorization: token } });
}
