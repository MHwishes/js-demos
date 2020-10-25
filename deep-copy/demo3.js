// 处理循环引用的问题

const demo3 = (target,map=new Map()) => {
  let targetClone = {}

  if (typeof target === 'object' && target !== null) {
    targetClone = Array.isArray(target) ? [] : {};

    if (map.get(target)) {
      return target;
    }
    map.set(target, targetClone);

    for (const key in target) {
      targetClone[key] = demo3(target[key], map);
    }
    return targetClone;
  } else {
    return target;
  }
}

module.exports = demo3