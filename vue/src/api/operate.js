import ajax from './axios'
export default {
    operateList() {
        return ajax.get('operate/list')
    },
    saveOperate(form) {
        return ajax.post('operate/save', { form })
    },
    getOperate(id) {
        return ajax.get('operate/get', { id })
    },
    deleteOperate(id) {
        return ajax.get('operate/delete', { id })
    }
}