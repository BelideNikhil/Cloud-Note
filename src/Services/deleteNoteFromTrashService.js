import axios from "axios";

export function deleteNoteFromTrashService({ currentNote, token }) {
    return axios.delete(`/api/trash/delete/${currentNote._id}`, { headers: { authorization: token } });
}
