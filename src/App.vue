<template>
  <div>
    2222
  </div>
  <router-view/>
</template>
<script setup>
import wx from 'weixin-js-sdk'
import axios from 'axios'
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

onMounted( async () => {
  await router.isReady()
  console.log(route.query)
  if(!route.query.code) {
    checkUserAuth()
  }else {
    getWechatConfig()
  }
})
const checkUserAuth = () => {
  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx62ce81cf4b455a2e&redirect_uri=http%3A%2F%2F192.168.31.222%3A8080%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
}
const getWechatConfig = () => {
  axios.get('api/wechat/getOpenId',{
    params: {
      code: route.query.code
    }
  })
  // wx.config({
  //   debug: true, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
  //   appId: '', // 必填，公众号的唯一标识
  //   timestamp: '', // 必填，生成签名的时间戳
  //   nonceStr: '', // 必填，生成签名的随机串
  //   signature: '',// 必填，签名
  //   jsApiList: [] // 必填，需要使用的 JS 接口列表
  // });
}
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
