console.log('error')
import ajax from '../api/axios'

const errorHandler = (error, vm) => {
    console.error(vm)
    console.error(error)
    if (process.env.NODE_ENV === 'production') {
        let log = {
            data: vm._data,
            route: vm.$route.fullPath,
            msg: {
                desc: error.message,
                stack: error.stack
            }
        }
        ajax.post('system/frontLog', {
            log
        })
    }
}

export default {
    install: function(Vue) {
        Vue.config.errorHandler = errorHandler;
        Vue.prototype.$throw = function(error) {
            return errorHandler(error, this);
        };
    }
}