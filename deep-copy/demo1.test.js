// import demo1 for './demo1';
const demo1 = require('./demo1');

const target = {
  field1: 1,
  field2: undefined,
  field3: 'test',
  field5: [1, 2]
}

const result = demo1(target);

console.log(result);

const result2 = demo1([1, 2, 3]);
console.log(result2);