import ajax from './axios'
export default {
    moduleList() {
        return ajax.get('module/list')
    },
    saveModule(form) {
        return ajax.post('module/save', { form })
    },
    deleteModule(unid) {
        return ajax.get('module/delete', { unid })
    }
}