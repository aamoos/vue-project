import axios from 'axios';
import { useRouter} from 'vue-router'

// localStorage에서 accessToken을 가져옵니다.
const accessToken = localStorage.getItem('accessToken');
const router = useRouter()

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',  // Spring 서버 URL
    headers: {
        // accessToken이 있을 경우 Authorization 헤더에 토큰 추가
        'Authorization': accessToken ? `Bearer ${accessToken}` : ''
    }
});

// 요청 인터셉터를 추가하여 토큰 갱신, 만료 처리
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) { // 401 Unauthorized - 토큰 만료
            // 토큰을 갱신하거나 로그아웃 처리
            localStorage.removeItem('accessToken');
            // 로그인 페이지로 리디렉션
            router.push('/')
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;