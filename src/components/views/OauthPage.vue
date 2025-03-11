<template>
  <div>소셜 로그인 중입니다...</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  // URL에서 토큰 추출
  const token = route.query.accessToken

  if (token) {
    localStorage.setItem('accessToken', token) // 토큰 저장
    router.push('/main') // 홈으로 리디렉트
  } else {
    console.error('OAuth2 로그인 실패')
    router.push('/') // 로그인 페이지로 리디렉트
  }
})
</script>