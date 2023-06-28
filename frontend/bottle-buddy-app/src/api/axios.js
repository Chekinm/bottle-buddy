import axios from 'axios';
const axios1 = axios.create({
    baseURL: 'https://bottle-buddy.onrender.com/',
    withCredentials: true,
});

export default axios1