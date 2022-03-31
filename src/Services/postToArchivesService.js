import axios from "axios";

export function postToArchives({ token, currentNote }) {
    return axios.post(
        `/api/notes/archives/${currentNote._id}`,
        {
            note: currentNote,
        },
        { headers: { authorization: token } }
    );
}
