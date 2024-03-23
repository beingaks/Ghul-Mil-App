import axios from "axios";

export const registerApi = (data) =>{
    return axios.post('http://10.0.2.2:5500/api/user/register', data)
}

export const loginApi = (data) =>{
    return axios.post('http://10.0.2.2:5500/api/user/login', data)
}

export const getAllPostsApi = (config) => {
    return axios.get('http://10.0.2.2:5500/api/posts/all', config)
}

export const createPostApi = (data, headers) => {
    return axios.post('http://10.0.2.2:5500/api/posts/create', data, headers)
}

export const likeUnlikePostApi = (data, headers) => {
    return axios.post('http://10.0.2.2:5500/api/posts/like-unlike', data, headers)
}

export const addCommentApi = (data, headers) => {
    return axios.post('http://10.0.2.2:5500/api/posts/comment', data, headers)
}