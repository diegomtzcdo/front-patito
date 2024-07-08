import axios from "axios";
import { API_URL } from "../config";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: false, // Cambiado a true para permitir credenciales
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

export default instance;