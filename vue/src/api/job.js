import ajax from './axios'
export default {
    jobList() {
        return ajax.get('job/list')
    },
    saveJob(form) {
        return ajax.post('job/save', { form })
    },
    getJob(id) {
        return ajax.get('job/get', { id })
    }
    // deleteJob(id) {
    //     return ajax.get('job/delete', { id })
    // }
}