import axios from 'axios';
const axios1 = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

export default axios1