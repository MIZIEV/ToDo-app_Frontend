import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = "http://localhost:8080/api";

axios.interceptors.request.use(function (config) {
    config.headers["Authorization"] = getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
});


export const getAllTodos = () => axios.get(BASE_REST_API_URL + "/todos");

export const getTodoByKey = (todoUniqueKey) => axios.get(BASE_REST_API_URL + "/todo/" + todoUniqueKey);

export const saveTodo = (todo) => axios.post(BASE_REST_API_URL + "/add", todo);

export const updateTodod = (todoUniqueKey, todo) => axios.put(BASE_REST_API_URL + "/todo/" + todoUniqueKey, todo);

export const deleteTodo = (todoUniqueKey) => axios.delete(BASE_REST_API_URL + "/todo/" + todoUniqueKey);