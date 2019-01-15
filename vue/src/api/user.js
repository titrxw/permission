import ajax from './axios'
export default {
    userList(params) {
        return ajax.get('user/list', params)
    },
    saveUser(form) {
        return ajax.post('user/save', { form })
    },
    getUser(id) {
        return ajax.get('user/get', { id })
    },
    userStatus (params) {
        return ajax.post('user/status', { params })
    }
}