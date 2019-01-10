import ajax from './axios'
export default {
    login: (params) => {
        return ajax.post('common/login', params)
    },
    logout: (params) => {
        return ajax.post('user/logout', params)
    },
    password: (params) => {
        return ajax.post('user/password', params)
    }
}