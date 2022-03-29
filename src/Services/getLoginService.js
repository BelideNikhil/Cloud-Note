import axios from "axios";

export function getLoginDetails(userData) {
    return axios.post(`/api/auth/login`, userData);
}
