import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/views/LoginPage.vue';
import OauthRedirect from '../components/views/OauthPage.vue'
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
        component: MainPage,
        meta: { requiresAuth: true }
    },
    // 다른 라우터 추가
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    
    //accessToken이 있고 로그인페이지일경우 main 페이지로
    if (isAuthenticated && to.path == "/"){
        next('/main');
    }

    // If the route requires authentication and there's no token, redirect to home
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;