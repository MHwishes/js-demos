// 1. 处理数组的情况 2.处理多层的对象 3.处理null
const demo2 = (target) => {
  let targetClone = {}

  if (typeof target === 'object' && target!==null) {
    
    targetClone = Array.isArray(target) ? [] : {}

    for (const key in target) {
      targetClone[key] = demo2(target[key]);
    }
    return targetClone;
  } else {
    return target;
  }
}

module.exports = demo2