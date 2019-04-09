import Vue from 'vue';
import './conf'
import error from './libs/error'
import api from './api'
import router from './routers'
import store from './store'
import storage from './libs/storage'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/styles/common.css';
import App from './App.vue';


Vue.use(error);
Vue.use(api);
Vue.use(iView);
Vue.use(storage);


Vue.directive('submit', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el, binding, vnode) {
        function clickHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            // 点击时间间隔
            if (!el.contains(e.target)) {
                return false;
            }
            if (e.timeStamp - e.srcElement.timeStamp <= 600) {
                e.srcElement.timeStamp = e.timeStamp
                return false;
            }
            e.srcElement.timeStamp = e.timeStamp
            
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                let arg = []
                if (binding.arg) {
                    arg = binding.arg.split(',')
                }
                if (e.target.dataset.args) {
                    arg.push(e.target.dataset.args)
                }
                binding.value(e,...arg);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueSubmit__ = clickHandler;
        document.addEventListener('mousedown', clickHandler);
    },
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('mousedown', el.__vueSubmit__);
        delete el.__vueSubmit__;
    }
})

new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App)
});