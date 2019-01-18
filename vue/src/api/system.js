import ajax from './axios'
export default {
    menu() {
        return ajax.get('system/menu')
    },
    getModuleOperate(mid) {
        return ajax.get('system/getModuleOperate', { mid })
    }
}