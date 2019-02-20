import Vue from 'vue'
import DevConf from './dev'
import ProducationConf from './producation'

Vue.onlineHour = 2
Vue.errorReport = {
    open: true,
    url: 'common/frontLog'
}


if (process.env.NODE_ENV === 'production') {
    Vue.prototype.G = ProducationConf
    Vue.imgHost = 'http://zh5j.cn/uploads/'
    Vue.uploadHost = 'http://zh5j.cn/upload/homeservice/admin_sysframe/upload'
    Vue.apiHost = 'http://zh5j.cn/api/homeservice/'
    Vue.prototype.uploadHost = Vue.uploadHost
    Vue.prototype.imgHost = Vue.imgHost
} else {
    Vue.prototype.G = DevConf
    Vue.imgHost = 'http://zh5j.cn/uploads/'
    Vue.uploadHost = 'http://zh5j.cn/upload/homeservice/admin_sysframe/upload'
    Vue.apiHost = '/permiss'
    Vue.prototype.uploadHost = Vue.uploadHost
    Vue.prototype.imgHost = Vue.imgHost
}