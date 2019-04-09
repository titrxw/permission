import Vue from 'vue';
import axios from 'axios';
import router from '../routers';
import iView from 'iview';
import store from '../store'

// axios 配置
axios.defaults.timeout = 90000;
axios.defaults.baseURL = Vue.apiHost;


axios._cancelQueue = []


let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (ever) => {
  for(let p in pending){
    if(pending[p].url === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
      // pending[p].cancel(); //执行取消操作  取消的是前面的请求
      let index= axios._cancelQueue.indexOf(pending[p].cancel)
      if (index >= 0) {
        axios._cancelQueue.splice(index,1)
      }
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}


// http request 拦截器
axios.interceptors.request.use(
  config => {
    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c)=>{
      axios._cancelQueue.push(c)
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ url: (process.env.NODE_ENV === 'production' ? config.url :  config.baseURL + '/' + config.url) + '&' + config.method, cancel: c });  
    });

    
    iView.LoadingBar.start();
    let token = Vue.storage.get('token')
    if (config.method === 'post') {
      if (!config.data) {
        config.data = {};
      }
      if (token) {
        config.data['token'] = token;
      }
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
    removePending(response.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    iView.LoadingBar.finish()
    if (typeof response.data == 'string') {
      store.commit('errMsg', '数据格式错误' + response.data);
      return false
    }
    
    switch (response.data.ret) {
      case 200:
        return response.data.data ? response.data.data : true;
      case 300:
        Vue.storage.rm('user');
        Vue.storage.rm('token');
        router.replace({ path: '/login' });
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
    if (axios.isCancel(error)) {
      return false
    }

    iView.LoadingBar.finish()
    store.commit('errMsg', '请求失败' + error.message);
    router.push({ path: '/500' });
    return false;
  }
);
export default axios