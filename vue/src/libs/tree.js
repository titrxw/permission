// 需要测试
export const formatTree = (data, unid = 0, prefx = '') => {
    let _tmp = [];
    if (!data) {
        return []
    }
    for (let index in data) {
        if (data[index].pid == unid) {
            _tmp.push({
                unid: data[index].unid,
                title: prefx + data[index].title
            });
        }
        if (data[index].children) {
            _tmp = _tmp.concat(formatTree(data[index].children, data[index].unid, prefx + ' |- '));
        }
    }
    return _tmp;
}