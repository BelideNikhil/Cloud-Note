import axios from "axios";

export function restoreFromArchives({ token, currentNote }) {
    return axios.post(`/api/archives/restore/${currentNote._id}`, {}, { headers: { authorization: token } });
}
