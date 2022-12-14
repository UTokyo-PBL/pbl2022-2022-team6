import axios from "axios";

const instance = axios.create({
    baseURL: "https://translango.y-nakai.com",
    withCredentials: true,
    headers: {
        withCredentials: true,
    },
})

export default instance;
