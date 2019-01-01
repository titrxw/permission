// 需要测试
export const formatTree = (data, id=0, prefx = '') => {
    let _tmp = [];
    if (!data) {
        return []
    }
    for (let index in data){
        if (data[index].parent_id == id) {
            _tmp.push({
                id: parseInt(data[index].id),
                title: prefx + data[index].title
            });
        }
        if (data[index].children) {
            _tmp = _tmp.concat(formatTree(data[index].children, data[index].id, prefx + ' |- '));
        }
    }
    return _tmp;
}