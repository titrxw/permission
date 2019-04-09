import Vue from 'vue'
export default function(to, from, next) {
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