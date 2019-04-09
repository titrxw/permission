import Vue from 'vue';
import axios from '@/api/axios'
import VueRouter from 'vue-router';
import Routers from './router';
import login from './login'
import iView from 'iview';
Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routers
});

router.beforeEach((to, from, next) => {
    axios._cancelQueue.forEach(cancel => {
        cancel()
    })
    axios._cancelQueue = [];

    let title = '生活服务'
    if (to.meta.title && to.meta.title !== '') {
        title = to.meta.title
    }
    document.title = title
    iView.LoadingBar.start();

    if (login(to, from, next)) {
        next()
    }
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;