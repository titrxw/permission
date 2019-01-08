import Vue from 'vue';
import './env'
import './conf'
import error from './libs/error'
import api from './api'
import router from './routers'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/styles/common.css';
import App from './App.vue';


Vue.use(error);
Vue.use(api);
Vue.use(iView);


// 点击后等待请求完成才可以再点击  利用自定义指令实现        使用时需要在标签上添加v-submit
Vue.submit = function () {
  Vue.hasSubmit = true
}

Vue.unSubmit = function () {
  Vue.hasSubmit = false
}

Vue.directive('submit', {
  // 当被绑定的元素插入到 DOM 中时……
  bind(el, binding, vnode) {
    function clickHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (Vue.hasSubmit && el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
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