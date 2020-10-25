const demo3=require('./demo3.js')

const target1 = {
  field1: 1,
  field2: 2,
  field3: [3, 7, 6],
};
target1.target1 = target1;

const result = demo3(target1);
console.log(result);