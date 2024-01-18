import axios from "axios";

export const BASE_URL = "http://103.120.178.16:8080/milestone";

export const myAxios = axios.create({
    baseURL: BASE_URL,
});