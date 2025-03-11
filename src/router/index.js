import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/views/LoginPage.vue';
import OauthRedirect from '../components/views/OauthRedirect.vue'
import MainPage from '../components/views/MainPage.vue'

const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/oauth2/redirect',
        name: 'OAuth2Redirect',
        component: OauthRedirect
    },
    {
        path: '/main',
        name: 'MainPage',
        component: MainPage
    },
    // 다른 라우터 추가
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;