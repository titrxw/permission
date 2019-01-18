import auth from './auth'
import system from './system'
import module from './module'
import operate from './operate'
import department from './department'
import job from './job'
import role from './role'
import user from './user'

let api = {
    ...auth,
    ...system,
    ...module,
    ...operate,
    ...department,
    ...job,
    ...role,
    ...user
}

export default {
    install: function(Vue) {
        Vue.api = api
        Vue.prototype.$api = api
    }
}