import Vue from 'vue'
export default function(to, from, next) {
    // 检测token是否过期 2小时在线（前5分钟过期）
    let lastTime = Vue.storage.get('last_login_time')
    let curTime = Date.parse(new Date()) / 1000;
    if (lastTime && (curTime - lastTime) > (Vue.onlineHour * 60 * 55)) {
        Vue.storage.delete('token')
    }

    let token = Vue.storage.get('token');
    if (to.meta.requireLogin) {
        if (!token) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
            return false;
        }
    } else {
        if (to.path == '/login' && token) {
            next('/')
            return false;
        }
    }

    return true;
}