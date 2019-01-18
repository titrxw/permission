import Vue from 'vue'

export const getOperate = async({
    commit,
    state
}, mid) => {
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
}