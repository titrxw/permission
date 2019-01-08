import ajax from './axios'


let api = {
  login: (params) => {
    return ajax.post('admin_syscommon/login', params)
  },
  logout: (params) => {
    return ajax.post('admin_sysframe/logout', params)
  },
  password: (params) => {
    return ajax.post('admin_sysframe/password', params)
  },
  setting: (params) => {
    return ajax.post('admin_sysframe/setting', params)
  }
}

export default {
  install: function (Vue) {
    Vue.prototype.$api = api
  }
}
