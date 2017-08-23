

/**
 * 简易版的深拷贝，目前不支持字符串
 * @param {Object} obj 
 */
export function deepcopy(obj){
    return JSON.parse(JSON.stringify(obj));
}