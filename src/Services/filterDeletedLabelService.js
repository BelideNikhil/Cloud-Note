import axios from "axios";

export function filterDeletedLabelService({ tag, token }) {
    return axios.post("/api/notes/updatetags", { deletedLabel: tag.tagName }, { headers: { authorization: token } });
}
