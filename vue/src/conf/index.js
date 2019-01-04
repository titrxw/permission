import Vue from 'vue'
import '../env'
import DevConf from './dev'
import ProducationConf from './producation'

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


import VueHtml5Editor from 'vue-html5-editor';
Vue.use(VueHtml5Editor, {
    hiddenModules: [
        "info"
    ],
    image: {
        sizeLimit: 800 * 1024,
        compress: true,
        width: 640,
        quality: 60,
        upload: {
            url: Vue.uploadHost,
            headers: {},
            params: {
                token: sessionStorage.getItem('token')
            },
            fieldName: "file"
        },
        uploadHandler(responseText) {
            var res = JSON.parse(responseText)
            if (res.ret != 200) {
                console.log(res.msg)
            } else {
                return Vue.imgHost + res.data.url
            }
        }
    }
});