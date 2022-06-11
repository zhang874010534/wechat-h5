<template>
  <div>
    2222
  </div>
  <router-view/>
</template>
<script>

import {defineComponent} from "vue";

export  default  defineComponent({
  mounted() {
    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx62ce81cf4b455a2e&redirect_uri=http%3A%2F%2F192.168.31.222%3A8080%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
  }
})
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
