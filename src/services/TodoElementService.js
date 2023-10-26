import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = "http://localhost:8080/api";

axios.interceptors.request.use(function (config) {
    config.headers["Authorization"] = getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
});

export const saveNewTodoElement = (todoUniqueKey, todoElement) =>
    axios.post(BASE_REST_API_URL + "/element/add/" + todoUniqueKey, todoElement);

export const getAllElements = (todoUniqueKey) => axios.get(BASE_REST_API_URL + "/element/list/" + todoUniqueKey);

export const changeCompleteStatus = (id) => axios.patch(BASE_REST_API_URL + "/element/change-status/" + id);

export const deleteElement = (id) => axios.delete(BASE_REST_API_URL + "/element/remove/" + id);