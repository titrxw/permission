import ajax from './axios'
import auth from './auth'


let api = {
    ...auth
}

export default {
    install: function(Vue) {
        Vue.prototype.$api = api
    }
}