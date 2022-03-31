import axios from "axios";

export function editNoteinArchives({ currentNote, token }) {
    return axios.post(`/api/archives/${currentNote._id}`, { note: currentNote }, { headers: { authorization: token } });
}
