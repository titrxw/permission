import Vue from 'vue'
export default {
    validate(to, from, next) {
        // 检测token是否过期 2小时在线（前5分钟过期）
        let lastTime = sessionStorage.getItem('last_login_time')
        let curTime = Date.parse(new Date()) / 1000;
        if (lastTime && (curTime - lastTime) > (Vue.onlineHour * 60 * 55)) {
            sessionStorage.removeItem('token')
        }

        if (to.meta.requireLogin) {
            let token = sessionStorage.getItem('token');
            if (!token) {
                next({
                    path: '/login',
                    query: {
                        redirect: to.fullPath
                    }
                })
                return false;
            }
        }

        return true;
    }
}