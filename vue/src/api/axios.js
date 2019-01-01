import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import router from '../routers';
import iView from 'iview';
import store from '../store'

// axios 配置
axios.defaults.timeout = 50000;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = Vue.apiHost;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    iView.LoadingBar.start();
    let token = sessionStorage.getItem('token')
    if (config.method === 'post') {
      if (!config.data) {
        config.data = {};
      }
      if (token) {
        config.data['token'] = token;
      }
      config.data = qs.stringify(config.data);
    } else if (config.method === 'get') {
      if (token) {
        if (!config.params) {
          config.params = {}
        }
        config.params['token'] = token;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    iView.LoadingBar.finish()
    if (typeof response.data == 'string') {
      store.commit('errMsg', '数据格式错误' + response.data);
      return false
    }
    
    switch (response.data.ret) {
      case 200:
        return response.data.data ? response.data.data : true;
      case 300:
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        router.push({ path: '/login' });
        return false;
      case 403:
        router.push({ path: '/403' });
        return false;
      default:
        if (response.data.msg !== undefined) {
          if (response.data.msg) {
            iView.Message.error(response.data.msg);
          }
          return false;
        }
        return response.data
    }
  },
  error => {
    iView.LoadingBar.finish()
    store.commit('errMsg', '请求失败' + error.message);
    router.push({ path: '/500' });
    return false;
  }
);
export default axios