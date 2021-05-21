//操作树
const isObject = function (value: any) {
    let type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}
const excludeKeys = ['$$hashKey'];
export const traverseArray = function (obj: any, isObj?: boolean, attr?: string, res?: any) {
    //数据初始化
    res = res ? res : {};
    attr = attr ? attr : '';
    //执行数据转换
    if (obj && isObject(obj) && obj.toString().indexOf('[object File]') === -1) {
        let attrRes;
        if (Array.isArray(obj)) {//是数组转换成[?]的形式
            for (let [index, item] of (obj as []).entries()) {
                attrRes = attr;//备份属性名称
                attr += '[' + index + '].';
                res = traverseArray(item, isObj, attr, res);
                attr = attrRes;//还原属性名称
            }
        } else {
            for (let index of Object.keys(obj)) {
                let item = obj[index];
                attrRes = attr;
                if (isObject(item) && item.toString().indexOf('[object File]') === -1 && !Array.isArray(item) && isObj) {//如果item是一个对象且不是一个数组就增加点,否则增加[?]
                    attr += index + '.';
                } else {
                    attr += index;
                }
                res = traverseArray(item, isObj, attr, res);
                attr = attrRes;
            }
        }
    } else {
        if (!excludeKeys.includes(attr)) {
            res[attr] = obj;
        }
    }
    return res;
};
