const mutations = {
    errMsg(state, msg) {
        state.errMsg = msg;
    },
    warnMsg(state, msg) {
        state.warnMsg = msg;
    },
    MID_OPERATES(state, data) {
        if (!data) {
            state.moduleOperates = {}
            return false
        }
        state.moduleOperates[data.mid] = data.result
        state.moduleOperate = data.result
    },
    MID_OPERATE(state, data) {
        state.moduleOperate = data
    }
}

export default mutations;