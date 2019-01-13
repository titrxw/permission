import auth from './auth'
import system from './system'
import module from './module'
import operate from './operate'
import department from './department'
import job from './job'

let api = {
    ...auth,
    ...system,
    ...module,
    ...operate,
    ...department,
    ...job
}

export default {
    install: function(Vue) {
        Vue.prototype.$api = api
    }
}