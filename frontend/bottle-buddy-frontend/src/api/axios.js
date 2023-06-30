import axios from 'axios';
export default axios.create({
    // baseURL: 'http://127.0.0.1:8000/',
    baseURL: 'https://bottle-buddy.onrender.com/',
    withCredentials: true,
});