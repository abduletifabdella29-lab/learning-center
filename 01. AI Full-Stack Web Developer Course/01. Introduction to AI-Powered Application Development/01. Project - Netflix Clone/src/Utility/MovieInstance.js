import axios from "axios";

export const movieInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});