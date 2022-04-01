import axios from "axios";

export function restoreFromTrashService({ currentNote, token }) {
    return axios.post(
        `/api/trash/restore/${currentNote._id}`,
        {
            note: currentNote,
        },
        { headers: { authorization: token } }
    );
}
