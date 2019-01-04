import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router';
import iView from 'iview';
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routers
});

router.beforeEach((to, from, next) => {
  let title = '生活服务'
  if (to.meta.title && to.meta.title !== '') {
    title = to.meta.title
  }
  document.title = title
  iView.LoadingBar.start();

  // 检测token是否过期 2小时在线（前5分钟过期）
  let lastTime = sessionStorage.getItem('last_login_time')
  let curTime = Date.parse(new Date()) / 1000;
  if (lastTime && (curTime - lastTime) > ( Vue.onlineHour * 60 * 55 )) {
    sessionStorage.removeItem('token')
  }

  if (to.meta.requireAuth) {
    let user = sessionStorage.getItem('user');
    if (!user) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;