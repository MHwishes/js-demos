const demo3 = require('./demo3.js')
const demo4 = require('./demo4.js')

const target1 = {
  field1: 1,
  field2: 2,
  field3: [3, 7, 6],
};
target1.target1 = target1;

console.time('使用forIn时间');
const result3 = demo3(target1);
console.timeEnd('使用forIn时间');

console.time('使用while时间');
const result4 = demo4(target1);
console.timeEnd('使用while时间');

console.log(result3);
console.log(result4);