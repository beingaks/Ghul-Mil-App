import axios from "axios";

export const registerApi = (data) =>{
    return axios.post('http://10.0.2.2:5500/api/user/register', data)
}

export const loginApi = (data) =>{
    return axios.post('http://10.0.2.2:5500/api/user/login', data)
}