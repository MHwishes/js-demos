const demo2 = require('./demo2.js')

const result1 = demo2([1, 2, 3]);
console.log(result1);

const target = {
  field1: 1,
  field2: undefined,
  field3: 'test',
  field4: {
    child: 'child',
    child2: {
      child2: 'child2'
    }
  },
  field5: [1, 2, 7],
  field6:null,
}
const result2 = demo2(target);
console.log(result2);

// const target1 = {
//   field1: 1,
//   field2: 2,
//   field3: [3, 7, 6],
// };
// target1.target1 = target1;

// const result3 = demo2(target1);
// console.log(result3);