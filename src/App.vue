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
import Cookies from 'js-cookie'

const route = useRoute()
const router = useRouter()

onMounted( async () => {
  await router.isReady()
  // console.log(route.query)
  // console.log(Cookies.get('openId'),'oooooo')
  if(!Cookies.get('openId')) {
    if(!route.query.code) {
      checkUserAuth()
    }else {
      getOpenId()
      getWechatConfig()
    }
  }
  initShare()
})
const checkUserAuth = () => {
  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx62ce81cf4b455a2e&redirect_uri=http%3A%2F%2F192.168.31.222%3A8080%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
}

const getOpenId = () => {
  axios.get('api/wechat/getOpenId',{
    params: {
      code: route.query.code
    }
  }).then(() => {
    getUserInfo()
  })
}
const getUserInfo = () => {
  axios.get('api/wechat/getUserInfo',{
  })
}
const getWechatConfig = () => {
  axios.get('api/wechat/getConfig',{
    params: {
      url : encodeURIComponent(window.location.href.split('#')[0])
    }
  }).then((res) => {
    console.log(res.data,'res')
    const data = res.data
    wx.config({
      debug: true, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名
      jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData'
      ] // 必填，需要使用的 JS 接口列表
    });
  })

}

const initShare = () => {
  wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
    console.log('ready')
    wx.updateAppMessageShareData({
      title: '分享标题11', // 分享标题
      desc: '我是描述', // 分享描述
      link: 'http://192.168.31.222:8080', // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
      imgUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DcdiaPicsRfr2kgnibT77VWsgpu1KKnODQ3ibG8GXCMibia68K2xicR3S8S1JBul3uYUIhZYic3YVdbgLyqdIJFgjYMIXA/132', // 分享图标
      success: function () {
        // alert('成功分享')
        // 设置成功
        // console.log('成功')
      }
    })
    wx.updateTimelineShareData({
      title: '分享标题11', // 分享标题
      desc: '我是描述', // 分享描述
      link: 'http://192.168.31.222:8080', // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
      imgUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DcdiaPicsRfr2kgnibT77VWsgpu1KKnODQ3ibG8GXCMibia68K2xicR3S8S1JBul3uYUIhZYic3YVdbgLyqdIJFgjYMIXA/132', // 分享图标
      success: function () {
        // alert('成功分享')
        // 设置成功
        // console.log('成功')
      }
    })

  });
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
