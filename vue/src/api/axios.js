import Vue from 'vue';
import axios from 'axios';
import router from '../routers';
import iView from 'iview';
import store from '../store'

// axios 配置
axios.defaults.timeout = 50000;
axios.defaults.baseURL = Vue.apiHost


axios.tpost = axios.post
axios.tget = axios.get

axios.post = async(url, data, header = {}) => {
    if (Vue.beforeRequest) {
        Vue.beforeRequest()
    }
    let result = await axios.tpost(url, data, header)
    if (Vue.afterRequest) {
        Vue.afterRequest(result)
    }
    return result
}

axios.get = async(url, params, header = {}) => {
    if (Vue.beforeRequest) {
        Vue.beforeRequest()
    }
    let result = await axios.tget(url, { params }, header)
    if (Vue.afterRequest) {
        Vue.afterRequest(result)
    }
    return result
}

// http request 拦截器
axios.interceptors.request.use(
    config => {
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
            console.log(config)
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
            case 301:
            case 302:
                Vue.storage.delete('user')
                Vue.storage.delete('token')
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