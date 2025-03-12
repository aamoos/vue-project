import axios from 'axios';
import { useRouter } from 'vue-router';

// localStorage에서 accessToken을 가져옵니다.
const accessToken = localStorage.getItem('accessToken');
const router = useRouter();

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,  // Spring 서버 URL
    headers: {
        'Authorization': accessToken ? `Bearer ${accessToken}` : ''
    },
    withCredentials: true // 🚨 중요한 부분! -> HttpOnly 쿠키 자동 포함
});

// 요청 인터셉터를 추가하여 토큰 갱신, 만료 처리
axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response && error.response.status === 401) {  // 401 Unauthorized - 토큰 만료
            try {
                // 🚨 Refresh Token을 직접 보내지 않고 서버가 쿠키에서 읽도록 요청
                const response = await axios.post('/auth/refresh-token', {}, {
                    baseURL: process.env.VUE_APP_BACKEND_URL,
                    withCredentials: true // 🚨 중요한 부분! -> 쿠키를 함께 전송
                });
                console.log(response);
                const newAccessToken = response.data.accessToken; // 백엔드에서 새 Access Token 반환

                // 새 Access Token을 localStorage에 저장
                localStorage.setItem('accessToken', newAccessToken);

                // 원래 요청의 헤더를 업데이트하여 재시도
                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axiosInstance(error.config);
            } catch (refreshError) {
                console.error('Refresh token이 유효하지 않습니다.');
                localStorage.removeItem('accessToken');
                router.push('/');  // 로그인 페이지로 리디렉션
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;