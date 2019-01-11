import auth from './auth'
import system from './system'
import module from './module'
import operate from './operate'

let api = {
    ...auth,
    ...system,
    ...module,
    ...operate
}

export default {
    install: function(Vue) {
        Vue.prototype.$api = api
    }
}