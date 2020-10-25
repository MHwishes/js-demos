//处理其他的数据类型
const isObject = (target) => {
  // 判断是否是引用类型
  return (
    (typeof target === 'object' || target === 'function') && target !== null
  );
};

// 可以遍历的数据类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

// 不可以遍历的数据类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    // 普通的函数，箭头函数没有 prototype
    // RegExpObject.exec(string)返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      // 匹配到函数体 body[0]
      if (param) {
        // 匹配到参数 paramArr
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    // eval() 函数会将传入的字符串当做 JavaScript 代码进行执行
    return eval(funcString);
  }
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return Object(Symbol.prototype.valueOf.call(targe));
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}

const demo5 = (target, map = new WeakMap()) => {
  let targetClone;
  if (!isObject(target)) {
    // 表示是基本类型
    return target;
  }
  // 开始处理引用类型
  const type = Object.prototype.toString.call(target);

  if (deepTag.includes(type)) {
    // 获取它们的初始化数据，例如之前demo的 []和 {}
    const Ctor = target.constructor;
    targetClone = new Ctor();
  } else {
    return cloneOtherType(target, type);
  }


  if (map.get(target)) {
    return target;
  }
  map.set(target, targetClone);

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      targetClone.add(demo5(value, map));
    });
    return targetClone;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      targetClone.set(key, demo5(value, map));
    });
    return targetClone;
  }

  //克隆对象和数组
  targetClone = Array.isArray(target) ? [] : {};
  for (const key in target) {
    targetClone[key] = demo5(target[key], map);
  }

  return targetClone;
};

module.exports = demo5;
