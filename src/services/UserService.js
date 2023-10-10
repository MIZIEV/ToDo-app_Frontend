import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/api/profile";

export const getUser = (username) => axios.get(BASE_REST_API_URL + "/" + username);

export const deleteUser = (username) => axios.delete(BASE_REST_API_URL + "/delete/" + username);

export const updateUser = (username, user) => axios.put(BASE_REST_API_URL + "/update/" + username, user);