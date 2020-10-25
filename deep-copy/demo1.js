 const demo1 = (target) => {
  const targetClone = {}

  if (typeof target === 'object') { 
    for (const key in target) {
      targetClone[key] = target[key];
    } 
    return targetClone;
  } else {
    return target;
  }
  
}

module.exports = demo1