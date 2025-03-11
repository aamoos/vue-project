import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',  // 백엔드 서버 URL
    timeout: 10000,
});

export default api;