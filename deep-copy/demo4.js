// 性能优化

const demo4 = (target, map = new WeakMap()) => {
  let targetClone = {}

  if (typeof target === 'object' && target !== null) {
    targetClone = Array.isArray(target) ? [] : {};

    if (map.get(target)) {
      return target;
    }
    map.set(target, targetClone);

    // for (const key in target) {
    //   targetClone[key] = demo3(target[key], map);
    // }

    // 用while 代替for in, 性能优化
    let i = -1;
    const keyArray = Array.isArray(target) ? target : Object.keys(target);
    while (++i < keyArray.length) {
      if (Array.isArray(target)) {
        targetClone[i] = demo4(keyArray[i], map);
      } else {
        targetClone[keyArray[i]] = demo4(target[keyArray[i]], map);
      }
    }
    return targetClone;
  } else {
    return target;
  }
}

module.exports = demo4