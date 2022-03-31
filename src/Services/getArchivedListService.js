import axios from "axios";

export function getArchivedList(token) {
    return axios.get("/api/archives", { headers: { authorization: token } });
}
