import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/api/profile";

export const getUser = (username) => axios.get(BASE_REST_API_URL + "/" + username);