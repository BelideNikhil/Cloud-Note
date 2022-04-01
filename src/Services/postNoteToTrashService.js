import axios from "axios";

export function postNoteToTrashService({ token, currentNote }) {
    return axios.post(
        `/api/notes/trash/${currentNote._id}`,
        {
            note: currentNote,
        },
        { headers: { authorization: token } }
    );
}
