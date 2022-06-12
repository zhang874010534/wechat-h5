import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config.baseURL = 'http://localhost:3000/'
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
createApp(App).use(store).use(router).mount('#app')
