import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = "http://localhost:8080/api";
const username = sessionStorage.getItem("authenticatedUser");

axios.interceptors.request.use(function (config) {
    config.headers["Authorization"] = getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
});


export const getAllTasks = () => axios.get(BASE_REST_API_URL + "/tasks/" + username);

export const getAllCompletedTask = () => axios.get(BASE_REST_API_URL + "/tasks-completed/" + username);

export const getTaskByKey = (taskUniqueKey) => axios.get(BASE_REST_API_URL + "/task/" + taskUniqueKey);

export const saveTask = (task) => axios.post(BASE_REST_API_URL + "/add", task);

export const updateTaskd = (taskUniqueKey, task) => axios.put(BASE_REST_API_URL + "/task/" + taskUniqueKey, task);

export const deleteTask = (taskUniqueKey) => axios.delete(BASE_REST_API_URL + "/task/" + taskUniqueKey);

export const changeTaskCompleteStatus = (taskUniqueKey) => axios.patch(BASE_REST_API_URL + "/task/complete/" + taskUniqueKey);