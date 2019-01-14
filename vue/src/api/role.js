import ajax from './axios'
export default {
    roleList(params) {
        return ajax.get('role/list', params)
    },
    saveRole(form) {
        return ajax.post('role/save', { form })
    },
    getRole(id) {
        return ajax.get('role/get', { id })
    },
    getPermiss(role_id) {
        return ajax.get('role/getPermiss', { role_id })
    }
    // deleteJob(id) {
    //     return ajax.get('job/delete', { id })
    // }
}