import ajax from './axios'
export default {
    menu() {
        return ajax.get('system/menu')
    }
}