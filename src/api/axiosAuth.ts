import axios from "axios";
import { API_URL } from "../config";
import { getCookie } from "typescript-cookie";

const token = getCookie('access_token');

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Authorization': 'Bearer ' + token
  }
});

export default instance;