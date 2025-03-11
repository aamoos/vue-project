import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from './axios';

// 앱 생성
const app = createApp(App);

// Axios를 전역 속성으로 설정
app.config.globalProperties.$axios = axios;

// router와 함께 앱을 마운트
app.use(router).mount('#app');
