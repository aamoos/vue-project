import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axiosInstance from './axios.js';

// 앱 생성
const app = createApp(App);

// router를 먼저 설정
app.use(router);

// Axios 인스턴스를 전역으로 등록
app.config.globalProperties.$axios = axiosInstance;

// 앱 마운트
app.mount('#app');
