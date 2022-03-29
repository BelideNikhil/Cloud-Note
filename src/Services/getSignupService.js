import axios from "axios";

export function getSignupDetails(newUser) {
    return axios.post(`/api/auth/signup`, newUser);
}
