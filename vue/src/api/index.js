import ajax from './axios'


export default {
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
