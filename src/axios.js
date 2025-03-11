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
    }
});

// 요청 인터셉터를 추가하여 토큰 갱신, 만료 처리
axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        console.log(error);
        if (error.response.status === 401) {  // 401 Unauthorized - 토큰 만료
            const refreshToken = getCookie('refreshToken');
            alert(refreshToken);
            if (refreshToken) {
                try {
                    const response = await axios.post('/refresh-token', { refreshToken });
                    alert(response.accessToken);
                    const newAccessToken = response.accessToken;

                    localStorage.setItem('accessToken', newAccessToken);

                    error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return axios(error.config);
                } catch (refreshError) {
                    console.error('Refresh token이 유효하지 않습니다.');
                    localStorage.removeItem('accessToken');
                    router.push('/');  // 로그인 페이지로 리디렉션
                    return Promise.reject(refreshError);
                }
            } else {
                console.error('Refresh token이 없습니다.');
                localStorage.removeItem('accessToken');
                router.push('/');  // 로그인 페이지로 리디렉션
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

export default axiosInstance;
