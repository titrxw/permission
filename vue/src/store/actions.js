import Vue from 'vue'


export default {
    async getOperate({
        commit,
        state
    }, mid) {
        if (state.moduleOperates[mid]) {
            commit("MID_OPERATE", state.moduleOperates[mid])
            return true
        }
        let result = await Vue.api.getModuleOperate(mid)
        if (result) {
            console.log(result)
            commit("MID_OPERATES", {
                mid,
                result
            })
        }
    },
    reset({
        commit
    }) {
        commit('MID_OPERATES', false);
        commit('MID_OPERATE', {});
        commit('errMsg', '');
        commit('warnMsg', '');
    }
}