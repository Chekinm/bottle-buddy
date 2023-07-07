import axios from 'axios';
const  BASE_URL =  process.env.REACT_APP_BASE_URL_ENV//'https://bottle-buddy.onrender.com/';//;'http://127.0.0.1:8000/'


export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
});