import auth from './auth'
import system from './system'
import module from './module'

let api = {
    ...auth,
    ...system,
    ...module
}

export default {
    install: function(Vue) {
        Vue.prototype.$api = api
    }
}