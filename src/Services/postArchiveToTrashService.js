import axios from "axios";

export function postArchiveToTrashService({ token, currentNote }) {
    return axios.post(
        `/api/archives/trash/${currentNote._id}`,
        {
            note: currentNote,
        },
        { headers: { authorization: token } }
    );
}
