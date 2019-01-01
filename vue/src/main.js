import Vue from 'vue';
import './conf'
import App from './App.vue';
import router from './routers'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/styles/common.css';


 
// Vue.prototype.$echarts = echarts 

Vue.use(iView);

new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App)
});