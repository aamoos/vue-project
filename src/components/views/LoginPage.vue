<template>
  <div>
    <!-- 네이버 로그인 버튼 -->
    <button @click="loginWithNaver">네이버 로그인</button>

    <!-- 카카오 로그인 버튼 -->
    <button @click="loginWithKakao">카카오 로그인</button>

    <!-- 구글 로그인 버튼 -->
    <button @click="loginWithGoogle">구글 로그인</button>
  </div>
</template>

<script>
export default {
  methods: {
    // 네이버 로그인
    loginWithNaver() {
      window.location.href = `${process.env.VUE_APP_BACKEND_URL}/oauth2/authorization/naver?redirect_uri=${process.env.VUE_APP_FRONTEND_URL}/oauth2/redirect`;
    },

    // 카카오 로그인
    loginWithKakao() {
      window.location.href = `${process.env.VUE_APP_BACKEND_URL}/oauth2/authorization/kakao?redirect_uri=${process.env.VUE_APP_FRONTEND_URL}/oauth2/redirect`;
    },

    // 구글 로그인
    loginWithGoogle() {
      window.location.href = `${process.env.VUE_APP_BACKEND_URL}/oauth2/authorization/google?redirect_uri=${process.env.VUE_APP_FRONTEND_URL}/oauth2/redirect`;
  },
}
}
</script>