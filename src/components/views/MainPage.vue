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
      this.$axios
        .get('/api/users')
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
          this.$router.push('/');
        })
        .catch((error) => {
          console.error('Error during logout:', error);
        });
    },
  },
};
</script>