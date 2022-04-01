import axios from "axios";

export function getTrashListService(token) {
    return axios.get("/api/trash", { headers: { authorization: token } });
}
