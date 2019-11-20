<template>
  <div class="login">
    <el-button :loading="loading" @click="doLogin" type="primary">点击登陆啊</el-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    doLogin () {
      this.loading = true
      this.$store.dispatch('login').then(() => {
        this.loading = false
        this.$router.push({ path: '/index' })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>