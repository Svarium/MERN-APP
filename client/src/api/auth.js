import axios from "axios";

const API = "http://localhost:3001/api/v1";

export const registerRequest = async (user) => axios.post(`${API}/register`, user)