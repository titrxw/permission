import Vue from 'vue'
import '../env'
import DevConf from './dev'
import ProducationConf from './producation'

Vue.onlineHour = 2

if (Vue.ENV_PRODUCATION) {
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
    Vue.apiHost = '/homeservice'
    Vue.prototype.uploadHost = Vue.uploadHost
    Vue.prototype.imgHost = Vue.imgHost
}