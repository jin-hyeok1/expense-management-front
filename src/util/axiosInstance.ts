import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/', // proxy가 처리하므로 root 기준
    withCredentials: true, // 로그인 세션 등 쿠키 필요 시
});

export default axiosInstance;