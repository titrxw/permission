import ajax from './axios'
export default {
    departmentList(status = null) {
        return ajax.get('department/list', {status})
    },
    saveDepartment(form) {
        return ajax.post('department/save', { form })
    },
    getDepartment(id) {
        return ajax.post('department/get', { id })
    }
    // deleteDepartment(id) {
    //     return ajax.get('department/delete', { id })
    // }
}