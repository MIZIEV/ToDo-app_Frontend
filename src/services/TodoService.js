import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = "http://localhost:8080/api";

axios.interceptors.request.use(function (config) {
    config.headers["Authorization"] = getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
});

export const saveNewTodo = (taskUniqueKey, todo) =>axios.post(BASE_REST_API_URL + "/todo/add/" + taskUniqueKey, todo);

export const getAllTodos = (taskUniqueKey) => axios.get(BASE_REST_API_URL + "/todo/list/" + taskUniqueKey);

export const changeCompleteStatus = (id) => axios.patch(BASE_REST_API_URL + "/todo/change-status/" + id);

export const deleteTodo = (id) => axios.delete(BASE_REST_API_URL + "/todo/remove/" + id);