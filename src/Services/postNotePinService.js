import axios from "axios";

export function postNotePinService({ currentNote, token }) {
    return axios.post(
        `/api/notes/pin/${currentNote._id}`,
        { note: currentNote },
        { headers: { authorization: token } }
    );
}
