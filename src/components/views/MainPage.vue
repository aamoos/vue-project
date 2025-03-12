<template>
  <div>
    <h1>메인 페이지</h1>
    <div v-if="data">{{ data }}</div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
     fetchUserData() {
      // 로컬 스토리지에서 accessToken 가져오기
      const accessToken = localStorage.getItem('accessToken');

      // axios 요청 시 헤더에 Authorization 추가
      this.$axios
        .get('/api/users', {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        })
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    logout() {
       this.$axios
        .delete('/auth/logout')
        .then((response) => {
          console.log('Logged out successfully', response);
          localStorage.removeItem('accessToken');
          this.$router.push('/');
        })
        .catch((error) => {
          console.error('Error during logout:', error);
        });
    },
  },
};
</script>