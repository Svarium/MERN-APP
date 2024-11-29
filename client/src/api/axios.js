import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3001/api/v1",
    withCredentials: true, // to include cookies in requests
})
 
export default instance; 